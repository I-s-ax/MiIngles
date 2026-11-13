import { GRAMMAR } from './data/grammar.js';
import { SENTENCES, PROMPTS, SOUNDS, STORIES } from './data/practice.js';
import { DICT, POS, IRREGULAR, FORMS } from './data/dictionary.js';

/* ---------- Utilidades ---------- */

const view = document.getElementById('view');
const sheet = document.getElementById('sheet');
const toastEl = document.getElementById('toast');
const backLink = document.getElementById('back');

/** Crea un elemento. Los textos siempre entran como nodos de texto, nunca como HTML. */
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat(Infinity)) {
    if (kid == null || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return el;
}

function icon(path) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  svg.append(p);
  return svg;
}
const ICON = {
  gramatica: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zm0 13a3 3 0 0 1 3-3h11M9 8h6',
  pronunciacion: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zm-6 8a6 6 0 0 0 12 0M12 17v4',
  oraciones: 'M4 6h7v5H4zm9 0h7v5h-7zM4 13h4v5H4zm6 0h10v5H10z',
  cuentos: 'M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5zm0 0v13',
  diccionario: 'M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm5 11.5L20 20',
  speaker: 'M4 9v6h4l5 4V5L8 9H4zm12.500-.500a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12',
  mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zm-6 8a6 6 0 0 0 12 0M12 17v4'
};

let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/** minúsculas, sin acentos ni signos: para comparar textos */
const plain = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9ñ' ]/g, ' ').replace(/\s+/g, ' ').trim();

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Progreso guardado en el teléfono ---------- */

const KEY = 'miingles.v1';
const state = { grammar: {}, sentences: [], stories: [], sounds: [], saved: [] };
try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { /* sin almacenamiento */ }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* modo privado: se pierde al cerrar */ }
}
function addOnce(list, value) {
  if (!list.includes(value)) { list.push(value); save(); }
}

/* ---------- Voz: escuchar y hablar ---------- */

// Dentro del APK, la voz y el micrófono los maneja Android por este puente.
const native = window.AndroidBridge;
const synth = window.speechSynthesis;
let voices = [];
function loadVoices() { voices = synth ? synth.getVoices() : []; }
if (synth) {
  loadVoices();
  if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
}

function stopSpeech() {
  if (native) native.stopSpeaking(); else if (synth) synth.cancel();
}

function speak(text, slow) {
  if (native) {
    if (!native.speak(text, !!slow)) toast('La voz en inglés del teléfono no está lista. Revisa «Salida de texto a voz» en los ajustes.');
    return;
  }
  if (!synth) { toast('Este navegador no puede leer en voz alta.'); return; }
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  const lang = v => (v.lang || '').replace('_', '-');
  const voice = voices.find(v => lang(v) === 'en-US') || voices.find(v => lang(v).startsWith('en'));
  if (voice) u.voice = voice;
  u.rate = slow ? 0.6 : 0.95;
  synth.speak(u);
}

function sayButton(text, label = 'Escuchar') {
  return h('button', { class: 'say', type: 'button', 'aria-label': `${label}: ${text}`, onclick: () => speak(text) }, icon(ICON.speaker));
}

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const canListen = Boolean(native || Recognition);

/** Escucha una frase en inglés y devuelve las alternativas que entendió el navegador. */
function listen() {
  if (native) {
    return new Promise((resolve, reject) => {
      window.__heard = resolve;
      window.__heardError = reject;
      native.listen();
    });
  }
  return new Promise((resolve, reject) => {
    const r = new Recognition();
    r.lang = 'en-US';
    r.maxAlternatives = 3;
    let done = false;
    r.onresult = e => { done = true; resolve([...e.results[0]].map(a => a.transcript)); };
    r.onerror = e => { done = true; reject(e.error); };
    r.onend = () => { if (!done) reject('no-speech'); };
    r.start();
  });
}

const LISTEN_ERRORS = {
  'not-allowed': 'Permite el micrófono en el navegador para practicar.',
  'service-not-allowed': 'Permite el micrófono en el navegador para practicar.',
  'no-speech': 'No se escuchó nada. Acerca el teléfono e intenta otra vez.',
  'network': 'El reconocimiento de voz necesita internet.',
  'audio-capture': 'No se encontró un micrófono.',
  'unavailable': 'Este teléfono no tiene reconocimiento de voz activo. Instala o activa la app de Google.'
};

/* ---------- Diccionario: búsqueda ---------- */

const byWord = new Map(DICT.map(d => [d.en, d]));
const irregular = new Map();
for (const v of IRREGULAR) {
  for (const f of [...v.past.split('/'), v.part]) if (!byWord.has(f)) irregular.set(f, v.base);
}

/** Lleva una palabra a su forma de diccionario: "stories" -> "story", "went" -> "go". */
function lemma(raw) {
  const w = raw.toLowerCase().replace(/[^a-z']/g, '').replace(/'s$/, '').replace(/'/g, '');
  if (!w) return null;
  if (byWord.has(w)) return w;
  if (FORMS[w]) return FORMS[w];
  if (irregular.has(w)) return irregular.get(w);
  const tries = [];
  const cut = n => w.slice(0, -n);
  if (w.endsWith('ies')) tries.push(cut(3) + 'y');
  if (w.endsWith('es')) tries.push(cut(2));
  if (w.endsWith('s')) tries.push(cut(1));
  if (w.endsWith('ied')) tries.push(cut(3) + 'y');
  if (w.endsWith('ed')) tries.push(cut(2), cut(1), cut(3));
  if (w.endsWith('ing')) tries.push(cut(3), cut(3) + 'e', cut(4));
  if (w.endsWith('er')) tries.push(cut(2), cut(1), cut(3));
  if (w.endsWith('est')) tries.push(cut(3), cut(2), cut(4));
  if (w.endsWith('ly')) tries.push(cut(2));
  return tries.find(t => byWord.has(t)) || null;
}

function toggleSaved(word) {
  const i = state.saved.indexOf(word);
  if (i >= 0) state.saved.splice(i, 1); else state.saved.push(word);
  save();
  return i < 0;
}

function saveButton(word) {
  const label = () => state.saved.includes(word) ? 'Quitar de mis palabras' : 'Guardar en mis palabras';
  const b = h('button', { class: 'btn ghost', type: 'button' }, label());
  b.addEventListener('click', () => {
    toast(toggleSaved(word) ? 'Guardada en mis palabras' : 'Quitada de mis palabras');
    b.textContent = label();
  });
  return b;
}

/** Hoja inferior con el significado de una palabra tocada en un cuento. */
function openWord(raw) {
  const clean = raw.replace(/[^A-Za-z']/g, '');
  if (!clean) return;
  const base = lemma(clean);
  const entry = base && byWord.get(base);
  const shown = entry ? entry.en : clean.toLowerCase();
  sheet.replaceChildren(h('div', null,
    h('p', { class: 'entry-word', lang: 'en' }, shown),
    entry
      ? [h('p', { class: 'note' }, POS[entry.pos], base !== clean.toLowerCase() ? `, forma de «${clean.toLowerCase()}»` : ''),
         h('p', { class: 'entry-es' }, entry.es)]
      : h('p', { class: 'lead' }, 'No está en el diccionario sin conexión. Puede ser un nombre propio; también puedes buscarla en línea.'),
    h('div', { class: 'actions' },
      h('button', { class: 'btn', type: 'button', onclick: () => speak(shown) }, icon(ICON.speaker), 'Escuchar'),
      entry && saveButton(entry.en),
      h('button', { class: 'btn ghost', type: 'button', onclick: () => { sheet.close(); location.hash = `#/diccionario/${encodeURIComponent(shown)}`; } }, 'Abrir en el diccionario'),
      h('button', { class: 'btn ghost', type: 'button', onclick: () => sheet.close() }, 'Cerrar'))
  ));
  if (!sheet.open) sheet.showModal();
}
sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });

/** Convierte una oración en palabras que se pueden tocar. */
function tappable(sentence) {
  return sentence.split(/(\s+)/).map(part => {
    if (!/[A-Za-z]/.test(part)) return part;
    const m = part.match(/^([^A-Za-z]*)([A-Za-z']+)(.*)$/);
    return [m[1], h('button', { class: 'w', type: 'button', onclick: () => openWord(m[2]) }, m[2]), m[3]];
  });
}

/* ---------- Pantallas ---------- */

function page(title, lead, ...content) {
  return h('div', { class: 'page' },
    h('h1', { class: 'title es' }, title),
    lead && h('p', { class: 'lead' }, lead),
    content);
}

function home() {
  const lessonsDone = GRAMMAR.filter(g => state.grammar[g.id] === g.quiz.length).length;
  const cards = [
    ['gramatica', 'Gramática', 'Reglas en español, ejemplos y quiz', lessonsDone, GRAMMAR.length],
    ['pronunciacion', 'Pronunciación', 'Escucha, repite y que el teléfono te entienda', state.sounds.length, SOUNDS.length],
    ['oraciones', 'Crear oraciones', 'Ordena palabras o escribe tus frases', state.sentences.length, SENTENCES.length],
    ['cuentos', 'Traducir cuentos', 'Traduce oración por oración', state.stories.length, STORIES.length]
  ];
  const done = cards.reduce((n, c) => n + c[3], 0);
  const total = cards.reduce((n, c) => n + c[4], 0);
  const bar = (n, of) => h('div', { class: 'progress' }, h('i', { style: `width:${Math.round(100 * n / of)}%` }));
  return page('¿Qué practicamos hoy?', null,
    h('div', { class: 'overall' },
      h('p', null, h('b', null, `${Math.round(100 * done / total)}%`), ' de avance'),
      bar(done, total),
      h('p', { class: 'note', style: 'margin-top:8px' }, `${done} de ${total} actividades. Se guarda en este teléfono.`)),
    h('div', { class: 'hub' },
      cards.map(([id, name, sub, n, of]) => h('a', { href: `#/${id}`, 'data-s': id },
        h('span', { class: 'ic' }, icon(ICON[id])),
        h('span', { class: 'name' }, name),
        h('span', { class: 'sub' }, sub),
        h('span', { class: 'count' }, `${n} de ${of}`),
        bar(n, of))),
      h('a', { href: '#/diccionario', 'data-s': 'diccionario', class: 'wide' },
        h('span', { class: 'ic' }, icon(ICON.diccionario)),
        h('span', { class: 'name' }, 'Diccionario'),
        h('span', { class: 'sub' }, `${DICT.length} palabras sin conexión y búsqueda en línea`),
        h('span', { class: 'count' }, state.saved.length === 1 ? '1 palabra guardada' : `${state.saved.length} palabras guardadas`))));
}

/* Gramática */

function grammarList() {
  return page('Gramática', 'Trece lecciones, de lo básico al presente perfecto. Cada una termina con un quiz corto.',
    h('ul', { class: 'index' }, GRAMMAR.map(g => {
      const score = state.grammar[g.id];
      const full = score === g.quiz.length;
      return h('li', null, h('a', { href: `#/gramatica/${g.id}` },
        h('span', { class: 'name' }, h('span', { class: 'level' }, g.level), g.title),
        h('span', { class: `mark${full ? ' done' : ''}` }, score == null ? 'Sin hacer' : `${full ? '✓ ' : ''}${score} de ${g.quiz.length}`),
        h('span', { class: 'sub' }, g.intro.split('.')[0] + '.')));
    })));
}

function grammarLesson(id) {
  const g = GRAMMAR.find(x => x.id === id);
  if (!g) return notFound();
  let answered = 0, right = 0;
  const result = h('p', { class: 'result', role: 'status' });

  const question = (q, n) => {
    const why = h('p', { class: 'why', role: 'status' });
    const buttons = q.o.map((text, i) => h('button', { class: 'opt', type: 'button', onclick: () => {
      buttons.forEach(b => { b.disabled = true; });
      buttons[q.a].classList.add('right');
      const ok = i === q.a;
      if (!ok) buttons[i].classList.add('wrong');
      why.textContent = q.why;
      why.classList.add(ok ? 'good' : 'bad');
      answered++; if (ok) right++;
      if (answered === g.quiz.length) {
        state.grammar[g.id] = Math.max(state.grammar[g.id] || 0, right);
        save();
        result.textContent = right === g.quiz.length
          ? `Lección completa: ${right} de ${g.quiz.length}.`
          : `Acertaste ${right} de ${g.quiz.length}. Repasa las reglas y vuelve a intentarlo.`;
      }
    } }, text));
    return h('div', { class: 'q' },
      h('p', { class: 'prompt', lang: 'en' }, `${n + 1}. ${q.q}`),
      h('div', { class: 'options' }, buttons), why);
  };

  const i = GRAMMAR.indexOf(g);
  const next = GRAMMAR[i + 1];
  return h('div', { class: 'page' },
    h('h1', { class: 'title es' }, g.title),
    h('p', { class: 'lead' }, h('span', { class: 'level' }, g.level), g.intro),
    g.points.map(p => h('div', { class: 'card' },
      h('p', { class: 'rule-text' }, p.rule),
      h('ul', { class: 'examples' }, p.ex.map(([en, es]) => h('li', null,
        h('span', { class: 'en', lang: 'en' }, en),
        sayButton(en.replace(/→/g, ',')),
        h('span', { class: 'tr' }, es)))))),
    h('section', { class: 'section' },
      h('h2', null, 'Quiz'),
      h('p', { class: 'note' }, 'Elige la opción que completa cada oración.'),
      g.quiz.map(question), result),
    h('div', { class: 'actions' },
      h('button', { class: 'btn ghost', type: 'button', onclick: render }, 'Repetir el quiz'),
      next && h('a', { class: 'btn', href: `#/gramatica/${next.id}` }, 'Siguiente lección')));
}

/* Pronunciación */

function soundList() {
  return page('Pronunciación', 'Ocho grupos de sonidos que suelen costar trabajo cuando tu idioma es el español.',
    h('ul', { class: 'index' }, SOUNDS.map(s => h('li', null, h('a', { href: `#/pronunciacion/${s.id}` },
      h('span', { class: 'name' }, s.title),
      h('span', { class: `mark${state.sounds.includes(s.id) ? ' done' : ''}` }, state.sounds.includes(s.id) ? '✓ Practicado' : `${s.items.length} frases`),
      h('span', { class: 'sub en', lang: 'en' }, s.items.slice(0, 3).map(i => i[0]).join(', ')))))));
}

function soundPage(id) {
  const s = SOUNDS.find(x => x.id === id);
  if (!s) return notFound();

  const item = ([text, hint]) => {
    const heard = h('div', { class: 'heard', role: 'status' });
    const mic = h('button', { class: 'btn small', type: 'button' }, icon(ICON.mic), 'Decirla');
    mic.addEventListener('click', async () => {
      if (!canListen) {
        heard.textContent = 'Este navegador no reconoce voz. Usa Chrome en Android para que el teléfono te escuche.';
        return;
      }
      mic.disabled = true;
      heard.textContent = 'Escuchando… di la frase en voz alta.';
      try {
        const options = await listen();
        const want = plain(text).split(' ');
        // se queda con la alternativa que más se parece a la frase
        const best = options.map(o => plain(o).split(' '))
          .sort((a, b) => want.filter(w => b.includes(w)).length - want.filter(w => a.includes(w)).length)[0];
        const hits = want.filter(w => best.includes(w)).length;
        addOnce(state.sounds, s.id);
        heard.replaceChildren(
          h('p', null, hits === want.length ? '✓ Se entendió toda la frase.' : `Se entendieron ${hits} de ${want.length} palabras.`),
          h('p', { class: 'en', lang: 'en' }, text.split(' ').map((w, i) => [i ? ' ' : '', h('span', { class: best.includes(plain(w)) ? 'hit' : 'miss' }, w)])),
          h('p', { class: 'note' }, 'El teléfono entendió: ', h('span', { class: 'en', lang: 'en' }, options[0])));
      } catch (err) {
        heard.textContent = LISTEN_ERRORS[err] || 'No se pudo usar el micrófono. Intenta otra vez.';
      }
      mic.disabled = false;
    });
    return h('div', { class: 'sound' },
      h('p', { class: 'en', lang: 'en' }, text),
      hint && h('p', { class: 'hint' }, `Suena parecido a: ${hint}`),
      h('div', { class: 'actions' },
        h('button', { class: 'btn small ghost', type: 'button', onclick: () => speak(text) }, icon(ICON.speaker), 'Escuchar'),
        h('button', { class: 'btn small ghost', type: 'button', onclick: () => speak(text, true) }, 'Lento'),
        mic),
      heard);
  };

  return page(s.title, s.tip,
    h('p', { class: 'note', style: 'margin-top:10px' }, 'Las pistas con letras del español son aproximadas. Confía más en lo que escuchas.'),
    h('div', { class: 'section' }, s.items.map(item)));
}

/* Crear oraciones */

let sentenceMode = 'armar';
let sentenceLevel = 'Todos';

function sentences() {
  const seg = h('div', { class: 'seg' },
    [['armar', 'Ordenar palabras'], ['libre', 'Escritura libre']].map(([id, label]) =>
      h('button', { type: 'button', 'aria-pressed': String(sentenceMode === id), onclick: () => { sentenceMode = id; render(); } }, label)));
  return page('Crear oraciones', null, seg, sentenceMode === 'armar' ? builder() : freeWriting());
}

function builder() {
  const levels = ['Todos', 'A1', 'A2', 'B1'];
  const pool = SENTENCES.map((s, i) => ({ ...s, i })).filter(s => sentenceLevel === 'Todos' || s.lv === sentenceLevel);
  const pending = pool.filter(s => !state.sentences.includes(s.i));
  const box = h('div');

  const show = ex => {
    const words = ex.en.split(' ');
    const picked = [];
    const line = h('div', { class: 'line', 'aria-label': 'Tu oración' });
    const verdict = h('p', { class: 'verdict', role: 'status' });
    const after = h('div', { class: 'actions' });
    const tiles = shuffle([...words, ...ex.x]).map(word => {
      const tile = h('button', { class: 'tile', type: 'button', lang: 'en' }, word);
      tile.addEventListener('click', () => {
        tile.classList.add('used');
        const chosen = h('button', { class: 'tile', type: 'button', lang: 'en', 'aria-label': `Quitar ${word}` }, word);
        const entry = { word, chosen };
        chosen.addEventListener('click', () => {
          picked.splice(picked.indexOf(entry), 1);
          chosen.remove();
          tile.classList.remove('used');
        });
        picked.push(entry);
        line.append(chosen);
      });
      return tile;
    });

    const check = () => {
      if (!picked.length) { verdict.className = 'verdict bad'; verdict.textContent = 'Toca las palabras para armar la oración.'; return; }
      const ok = picked.map(p => p.word).join(' ') === ex.en;
      verdict.className = `verdict ${ok ? 'good' : 'bad'}`;
      if (ok) {
        verdict.textContent = '✓ Correcto.';
        addOnce(state.sentences, ex.i);
        speak(ex.en);
        after.replaceChildren(
          h('button', { class: 'btn ghost', type: 'button', onclick: () => speak(ex.en) }, icon(ICON.speaker), 'Escuchar'),
          h('button', { class: 'btn', type: 'button', onclick: nextOne }, 'Siguiente oración'));
      } else {
        const firstBad = picked.findIndex((p, i) => p.word !== words[i]);
        verdict.textContent = firstBad < 0
          ? 'Vas bien, pero faltan palabras.'
          : `Revisa la palabra ${firstBad + 1}: «${picked[firstBad].word}».`;
      }
    };

    box.replaceChildren(
      h('div', { class: 'card' },
        h('p', { class: 'note' }, h('span', { class: 'level' }, ex.lv), 'Di esto en inglés'),
        h('p', { class: 'target' }, ex.es),
        line,
        h('div', { class: 'bank' }, tiles),
        verdict,
        h('div', { class: 'actions' },
          h('button', { class: 'btn', type: 'button', onclick: check }, 'Comprobar'),
          h('button', { class: 'btn ghost', type: 'button', onclick: () => {
            verdict.className = 'verdict'; verdict.textContent = `Respuesta: ${ex.en}`;
          } }, 'Ver respuesta')),
        after));
  };

  let last = -1;
  const nextOne = () => {
    const left = pool.filter(s => !state.sentences.includes(s.i));
    const from = (left.length ? left : pool).filter(s => s.i !== last);
    const ex = from[Math.floor(Math.random() * from.length)] || pool[0];
    last = ex.i;
    show(ex);
  };

  if (pool.length) nextOne();
  return [
    h('div', { class: 'seg', role: 'group', 'aria-label': 'Nivel' }, levels.map(lv =>
      h('button', { type: 'button', 'aria-pressed': String(sentenceLevel === lv), onclick: () => { sentenceLevel = lv; render(); } }, lv))),
    h('p', { class: 'note', style: 'margin-top:10px' },
      pending.length ? `Te faltan ${pending.length} de ${pool.length} oraciones en este nivel.` : 'Ya resolviste todas las de este nivel. Se repiten para repasar.'),
    box
  ];
}

function freeWriting() {
  let n = Math.floor(Math.random() * PROMPTS.length);
  const box = h('div');
  const show = () => {
    const words = PROMPTS[n];
    const input = h('textarea', { class: 'en', lang: 'en', spellcheck: 'true', autocapitalize: 'sentences', placeholder: 'Write your sentence here' });
    const checks = h('ul', { class: 'checks', role: 'status' });
    const review = () => {
      const text = input.value.trim();
      const p = ` ${plain(text)} `;
      const list = [
        ...words.map(w => [p.includes(` ${w} `), `Usa «${w}»`]),
        [/^[A-Z]/.test(text), 'Empieza con mayúscula'],
        [/[.?!]$/.test(text), 'Termina con punto o signo'],
        [text.split(/\s+/).filter(Boolean).length >= 5, 'Tiene al menos cinco palabras'],
        [!/[¿¡]/.test(text), 'No lleva ¿ ni ¡ (en inglés no existen)']
      ];
      checks.replaceChildren(...list.map(([ok, label]) => h('li', { class: ok ? 'yes' : '' }, label)));
    };
    box.replaceChildren(h('div', { class: 'card' },
      h('p', { class: 'note' }, 'Escribe una oración que use estas palabras'),
      h('p', { class: 'target en', lang: 'en' }, words.join('  +  ')),
      h('label', { class: 'field' }, h('span', null, 'Tu oración en inglés'), input),
      checks,
      h('div', { class: 'actions' },
        h('button', { class: 'btn', type: 'button', onclick: review }, 'Revisar'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => input.value.trim() ? speak(input.value) : toast('Escribe primero tu oración.') }, icon(ICON.speaker), 'Escuchar mi oración'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => { n = (n + 1) % PROMPTS.length; show(); } }, 'Otras palabras'))));
  };
  show();
  return [
    h('p', { class: 'lead' }, 'Aquí la app solo revisa lo básico: no puede corregir tu gramática. Escuchar tu oración ayuda a notar si algo suena raro.'),
    box
  ];
}

/* Cuentos */

function storyList() {
  return page('Traducir cuentos', 'Lee cada oración, escribe tu traducción y compárala. Toca cualquier palabra para ver qué significa.',
    h('ul', { class: 'index' }, STORIES.map(s => h('li', null, h('a', { href: `#/cuentos/${s.id}` },
      h('span', { class: 'name en', lang: 'en' }, h('span', { class: 'level' }, s.lv), s.title),
      h('span', { class: `mark${state.stories.includes(s.id) ? ' done' : ''}` }, state.stories.includes(s.id) ? '✓ Traducido' : `${s.s.length} oraciones`),
      h('span', { class: 'sub' }, s.es))))));
}

/** Parecido aproximado entre dos traducciones, por palabras en común (0 a 100). */
function similarity(a, b) {
  const x = plain(a).split(' ').filter(Boolean), y = plain(b).split(' ').filter(Boolean);
  if (!x.length || !y.length) return 0;
  const rest = [...y];
  let common = 0;
  for (const w of x) { const i = rest.indexOf(w); if (i >= 0) { common++; rest.splice(i, 1); } }
  return Math.round(200 * common / (x.length + y.length));
}

let storyMode = 'traducir';

function storyPage(id) {
  const st = STORIES.find(x => x.id === id);
  if (!st) return notFound();
  const seg = h('div', { class: 'seg' },
    [['traducir', 'Traducir'], ['leer', 'Leer completo']].map(([m, label]) =>
      h('button', { type: 'button', 'aria-pressed': String(storyMode === m), onclick: () => { storyMode = m; render(); } }, label)));
  const body = h('div');

  if (storyMode === 'leer') {
    body.append(
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', type: 'button', onclick: () => speak(st.s.map(x => x[0]).join(' ')) }, icon(ICON.speaker), 'Escuchar el cuento'),
        h('button', { class: 'btn ghost', type: 'button', onclick: stopSpeech }, 'Detener')),
      h('div', { class: 'reading' }, st.s.map(([en, es]) => {
        const tr = h('p', { class: 'tr', hidden: true }, es);
        return h('div', null,
          h('p', { lang: 'en' }, tappable(en)),
          h('button', { class: 'btn small ghost', type: 'button', style: 'margin-top:6px', onclick: e => {
            tr.hidden = !tr.hidden;
            e.currentTarget.textContent = tr.hidden ? 'Ver traducción' : 'Ocultar traducción';
          } }, 'Ver traducción'),
          tr);
      })));
  } else {
    let i = 0;
    const step = () => {
      if (i >= st.s.length) {
        addOnce(state.stories, st.id);
        body.replaceChildren(h('div', { class: 'card' },
          h('p', { class: 'target' }, '✓ Terminaste de traducir este cuento.'),
          h('div', { class: 'actions' },
            h('button', { class: 'btn ghost', type: 'button', onclick: () => { i = 0; step(); } }, 'Traducirlo otra vez'),
            h('a', { class: 'btn', href: '#/cuentos' }, 'Elegir otro cuento'))));
        return;
      }
      const [en, es] = st.s[i];
      const input = h('textarea', { lang: 'es', placeholder: 'Escribe aquí tu traducción' });
      const out = h('div', { role: 'status' });
      const compare = h('button', { class: 'btn', type: 'button' }, 'Comparar');
      compare.addEventListener('click', () => {
        const mine = input.value.trim();
        const pct = mine ? similarity(mine, es) : null;
        out.replaceChildren(h('div', { class: 'reference' },
          h('p', { class: 'note' }, 'Traducción de referencia'),
          h('p', null, es),
          pct != null && h('p', { class: 'note', style: 'margin-top:8px' },
            pct >= 99 ? '✓ Igual a la referencia.' : `Parecido aproximado: ${pct}%. Otra redacción también puede ser correcta.`)));
        compare.textContent = i + 1 < st.s.length ? 'Siguiente oración' : 'Terminar cuento';
        compare.onclick = () => { i++; step(); };
      }, { once: true });
      body.replaceChildren(
        h('p', { class: 'note', style: 'margin-top:16px' }, `Oración ${i + 1} de ${st.s.length}`),
        h('div', { class: 'progress' }, h('i', { style: `width:${Math.round(100 * i / st.s.length)}%` })),
        h('p', { class: 'story-sentence', lang: 'en' }, tappable(en)),
        h('div', { class: 'actions' },
          h('button', { class: 'btn small ghost', type: 'button', onclick: () => speak(en) }, icon(ICON.speaker), 'Escuchar'),
          h('button', { class: 'btn small ghost', type: 'button', onclick: () => speak(en, true) }, 'Lento')),
        h('label', { class: 'field' }, h('span', null, 'Tu traducción al español'), input),
        h('div', { class: 'actions' }, compare),
        out);
    };
    step();
  }

  return h('div', { class: 'page' },
    h('h1', { class: 'title', lang: 'en' }, st.title),
    h('p', { class: 'lead' }, h('span', { class: 'level' }, st.lv), st.es),
    seg, body);
}

/* Diccionario */

let dictTab = 'buscar';
let dictQuery = '';

function dictionary() {
  const results = h('div');
  const draw = () => {
    const q = plain(dictQuery);
    let list;
    if (dictTab === 'guardadas') list = state.saved.map(w => byWord.get(w)).filter(Boolean);
    else if (!q) list = [];
    else {
      const starts = DICT.filter(d => d.en.startsWith(q));
      const rest = DICT.filter(d => !d.en.startsWith(q) && (d.en.includes(q) || plain(d.es).split(/[ ,;]+/).some(w => w.startsWith(q))));
      const base = lemma(q);
      const viaForm = base && !starts.concat(rest).some(d => d.en === base) ? [byWord.get(base)] : [];
      list = [...viaForm, ...starts, ...rest].slice(0, 60);
    }
    const rows = list.map(d => h('li', null, h('a', { href: `#/diccionario/${encodeURIComponent(d.en)}` },
      h('span', { class: 'name en', lang: 'en' }, d.en),
      h('span', { class: 'mark' }, POS[d.pos]),
      h('span', { class: 'sub' }, d.es))));
    let empty = null;
    if (!list.length) {
      if (dictTab === 'guardadas') empty = h('p', { class: 'lead' }, 'Todavía no guardas palabras. Abre una palabra y toca «Guardar en mis palabras».');
      else if (!q) empty = h('p', { class: 'lead' }, `Escribe una palabra en inglés o en español. Hay ${DICT.length} sin conexión.`);
      else empty = [
        h('p', { class: 'lead' }, `«${dictQuery.trim()}» no está en el diccionario sin conexión.`),
        h('div', { class: 'actions' }, h('a', { class: 'btn', href: `#/diccionario/${encodeURIComponent(dictQuery.trim().toLowerCase())}` }, 'Buscarla en línea'))];
    }
    results.replaceChildren(empty ? h('div', null, empty) : h('ul', { class: 'index' }, rows));
  };

  let body;
  if (dictTab === 'verbos') {
    body = [
      h('p', { class: 'lead' }, 'Los verbos irregulares más comunes. Toca uno para ver su significado.'),
      h('table', { class: 'verbs' },
        h('thead', null, h('tr', null, h('th', null, 'Base'), h('th', null, 'Pasado'), h('th', null, 'Participio'))),
        h('tbody', null, IRREGULAR.map(v => h('tr', null,
          h('td', null, h('a', { href: `#/diccionario/${v.base}`, lang: 'en' }, v.base)),
          h('td', { lang: 'en' }, v.past), h('td', { lang: 'en' }, v.part)))))];
  } else {
    const input = h('input', { type: 'search', class: 'en', value: dictQuery, placeholder: 'Buscar en inglés o español', 'aria-label': 'Buscar palabra', autocomplete: 'off', autocapitalize: 'none' });
    input.addEventListener('input', () => { dictQuery = input.value; draw(); });
    draw();
    body = [dictTab === 'buscar' && h('div', { class: 'field' }, input), results];
  }

  return page('Diccionario', null,
    h('div', { class: 'seg' }, [['buscar', 'Buscar'], ['guardadas', 'Mis palabras'], ['verbos', 'Irregulares']].map(([id, label]) =>
      h('button', { type: 'button', 'aria-pressed': String(dictTab === id), onclick: () => { dictTab = id; render(); } }, label))),
    body);
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function dictEntry(word) {
  const typed = word.toLowerCase().trim();
  const base = lemma(typed);
  const entry = base ? byWord.get(base) : null;
  const shown = entry ? entry.en : typed;
  const verb = IRREGULAR.find(v => v.base === shown);
  const online = h('div', { class: 'online', role: 'status' });

  const lookUp = async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    online.textContent = 'Buscando…';
    const out = [];
    try {
      if (!entry) {
        const t = await getJson(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(shown)}&langpair=en|es`);
        const text = t && t.responseData && t.responseData.translatedText;
        if (text) out.push(h('p', { class: 'entry-es' }, text), h('p', { class: 'note' }, 'Traducción automática de MyMemory. Puede tener errores.'));
      }
      try {
        const d = await getJson(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(shown)}`);
        const first = d[0] || {};
        const phon = first.phonetic || (first.phonetics || []).map(p => p.text).find(Boolean);
        const defs = (first.meanings || []).flatMap(m => m.definitions.slice(0, 2).map(x => `(${m.partOfSpeech}) ${x.definition}`)).slice(0, 4);
        if (phon) out.push(h('p', { class: 'forms' }, 'Pronunciación (AFI): ', h('b', null, phon)));
        if (defs.length) out.push(h('p', { class: 'note', style: 'margin-top:12px' }, 'Definiciones en inglés, de Free Dictionary API'), h('ol', null, defs.map(x => h('li', { lang: 'en' }, x))));
      } catch { /* la palabra puede no existir en esa fuente */ }
      online.replaceChildren(...(out.length ? out : [h('p', { class: 'lead' }, 'No se encontró esa palabra en línea. Revisa cómo está escrita.')]));
    } catch {
      online.textContent = 'No se pudo buscar. La búsqueda en línea necesita internet.';
    }
    btn.disabled = false;
  };

  return h('div', { class: 'page' },
    h('p', { class: 'entry-word', lang: 'en' }, shown),
    entry
      ? [h('p', { class: 'note' }, POS[entry.pos], base !== typed ? `, forma base de «${typed}»` : ''),
         h('p', { class: 'entry-es' }, entry.es)]
      : h('p', { class: 'lead' }, 'Esta palabra no está en el diccionario sin conexión.'),
    verb && h('p', { class: 'forms' }, 'Pasado: ', h('b', { lang: 'en' }, verb.past), '. Participio: ', h('b', { lang: 'en' }, verb.part), '.'),
    h('div', { class: 'actions' },
      h('button', { class: 'btn', type: 'button', onclick: () => speak(shown) }, icon(ICON.speaker), 'Escuchar'),
      h('button', { class: 'btn ghost', type: 'button', onclick: () => speak(shown, true) }, 'Lento'),
      entry && saveButton(entry.en)),
    h('div', { class: 'actions' },
      h('button', { class: 'btn ghost', type: 'button', onclick: lookUp }, entry ? 'Ver pronunciación y definiciones en línea' : 'Buscarla en línea')),
    online);
}

function notFound() {
  return page('Esta página no existe', 'Vuelve al índice para elegir una sección.',
    h('div', { class: 'actions' }, h('a', { class: 'btn', href: '#/' }, 'Ir al índice')));
}

/* ---------- Navegación ---------- */

const ROUTES = {
  '': [home],
  gramatica: [grammarList, grammarLesson],
  pronunciacion: [soundList, soundPage],
  oraciones: [sentences],
  cuentos: [storyList, storyPage],
  diccionario: [dictionary, dictEntry]
};

function render() {
  stopSpeech();
  const [section = '', arg] = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  const route = ROUTES[section];
  const node = !route ? notFound() : arg && route[1] ? route[1](arg) : route[0]();
  view.replaceChildren(node);
  document.body.dataset.s = section || 'inicio';
  document.querySelectorAll('.tabs a').forEach(a => {
    if (a.dataset.tab === section) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  backLink.hidden = !section;
  backLink.href = arg ? `#/${section}` : '#/';
  backLink.textContent = arg ? 'Volver' : 'Índice';
  const heading = view.querySelector('h1, .entry-word');
  document.title = heading ? `${heading.textContent} | MiInglés` : 'MiInglés';
}

let lastHash = null;
window.addEventListener('hashchange', () => {
  render();
  if (location.hash !== lastHash) { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
  lastHash = location.hash;
});
render();

if (!native && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* la app funciona igual, solo sin modo sin conexión */ });
}
