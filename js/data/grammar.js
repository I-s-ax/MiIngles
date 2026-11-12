// Lecciones de gramática. Cada lección: reglas con ejemplos [inglés, español] y un quiz.
// En el quiz, "___" marca el hueco y "a" es el índice de la opción correcta.
export const GRAMMAR = [
  {
    id: 'to-be', level: 'A1', title: 'El verbo to be',
    intro: 'To be significa «ser» y «estar». Es el verbo más usado del inglés y cambia según la persona.',
    points: [
      { rule: 'I am, you are, he/she/it is, we/they are.', ex: [['I am Mexican.', 'Soy mexicano.'], ['She is at home.', 'Ella está en casa.'], ['They are my friends.', 'Ellos son mis amigos.']] },
      { rule: 'Para negar, agrega not después del verbo: is not (isn\'t), are not (aren\'t).', ex: [['He is not tired.', 'Él no está cansado.'], ['We aren\'t late.', 'No llegamos tarde.']] },
      { rule: 'Para preguntar, pon el verbo antes del sujeto.', ex: [['Are you hungry?', '¿Tienes hambre?'], ['Is it cold today?', '¿Hace frío hoy?']] },
      { rule: 'Ojo: la edad, el hambre y el frío se dicen con to be, no con have.', ex: [['I am twenty years old.', 'Tengo veinte años.']] }
    ],
    quiz: [
      { q: 'She ___ a nurse.', o: ['am', 'is', 'are'], a: 1, why: 'Con he, she, it se usa is.' },
      { q: 'We ___ from Puebla.', o: ['is', 'am', 'are'], a: 2, why: 'Con we, you, they se usa are.' },
      { q: '___ you ready?', o: ['Are', 'Is', 'Do'], a: 0, why: 'La pregunta con to be empieza con el verbo: Are you...?' },
      { q: 'I ___ eighteen years old.', o: ['have', 'am', 'has'], a: 1, why: 'La edad se dice con to be: I am eighteen.' }
    ]
  },
  {
    id: 'articulos', level: 'A1', title: 'Artículos: a, an, the',
    intro: 'A y an significan «un, una». The significa «el, la, los, las» y no cambia con el género ni con el número.',
    points: [
      { rule: 'Usa a antes de sonido consonante y an antes de sonido vocal.', ex: [['a book', 'un libro'], ['an apple', 'una manzana'], ['an hour', 'una hora (la h no suena)']] },
      { rule: 'Usa a/an cuando hablas de algo por primera vez; the cuando ya se sabe cuál es.', ex: [['I saw a dog. The dog was big.', 'Vi un perro. El perro era grande.']] },
      { rule: 'Las profesiones llevan a/an.', ex: [['My mother is a teacher.', 'Mi mamá es maestra.']] },
      { rule: 'Cuando hablas en general, no uses the.', ex: [['I like music.', 'Me gusta la música.'], ['Dogs are friendly.', 'Los perros son amigables.']] }
    ],
    quiz: [
      { q: 'I want ___ apple.', o: ['a', 'an', 'the'], a: 1, why: 'Apple empieza con sonido vocal: an apple.' },
      { q: 'He is ___ doctor.', o: ['a', 'an', '(nada)'], a: 0, why: 'Las profesiones llevan artículo: a doctor.' },
      { q: 'I love ___ coffee.', o: ['the', 'a', '(nada)'], a: 2, why: 'Hablas del café en general, sin artículo.' },
      { q: 'Close ___ door, please.', o: ['a', 'the', 'an'], a: 1, why: 'Los dos saben de qué puerta se habla: the door.' }
    ]
  },
  {
    id: 'presente-simple', level: 'A1', title: 'Presente simple',
    intro: 'Sirve para hábitos, rutinas y hechos que siempre son verdad.',
    points: [
      { rule: 'Con I, you, we, they el verbo queda igual.', ex: [['I work every day.', 'Trabajo todos los días.'], ['They live in Monterrey.', 'Viven en Monterrey.']] },
      { rule: 'Con he, she, it agrega -s o -es.', ex: [['She works at night.', 'Ella trabaja de noche.'], ['He watches movies.', 'Él ve películas.'], ['My sister studies English.', 'Mi hermana estudia inglés.']] },
      { rule: 'Suele ir con always, usually, often, sometimes, never, antes del verbo.', ex: [['I never drink coffee.', 'Nunca tomo café.']] }
    ],
    quiz: [
      { q: 'My brother ___ soccer on Sundays.', o: ['play', 'plays', 'playing'], a: 1, why: 'Con he/she/it el verbo lleva -s.' },
      { q: 'We ___ English every day.', o: ['study', 'studies', 'studys'], a: 0, why: 'Con we el verbo no cambia.' },
      { q: 'She ___ TV at night.', o: ['watch', 'watchs', 'watches'], a: 2, why: 'Los verbos que terminan en -ch llevan -es.' },
      { q: 'I ___ wake up late.', o: ['never', 'am never', 'not'], a: 0, why: 'El adverbio de frecuencia va antes del verbo.' }
    ]
  },
  {
    id: 'preguntas', level: 'A1', title: 'Preguntas y negaciones con do',
    intro: 'En presente simple, las preguntas y negaciones necesitan el auxiliar do o does. El verbo principal vuelve a su forma base.',
    points: [
      { rule: 'Negación: don\'t (I, you, we, they) y doesn\'t (he, she, it).', ex: [['I don\'t like fish.', 'No me gusta el pescado.'], ['He doesn\'t work here.', 'Él no trabaja aquí.']] },
      { rule: 'Pregunta: Do o Does + sujeto + verbo base.', ex: [['Do you speak English?', '¿Hablas inglés?'], ['Does she live here?', '¿Ella vive aquí?']] },
      { rule: 'Con palabras de pregunta, van al inicio: what, where, when, why, how, who.', ex: [['Where do you work?', '¿Dónde trabajas?'], ['What does it cost?', '¿Cuánto cuesta?']] },
      { rule: 'Con to be no se usa do.', ex: [['Where is the bus?', '¿Dónde está el camión?']] }
    ],
    quiz: [
      { q: '___ she like tacos?', o: ['Do', 'Does', 'Is'], a: 1, why: 'Con she se usa does.' },
      { q: 'He doesn\'t ___ coffee.', o: ['drinks', 'drink', 'drinking'], a: 1, why: 'Después de doesn\'t el verbo va en forma base.' },
      { q: 'Where ___ you live?', o: ['do', 'are', 'does'], a: 0, why: 'Con you se usa do.' },
      { q: 'They ___ understand the question.', o: ['doesn\'t', 'aren\'t', 'don\'t'], a: 2, why: 'Con they se usa don\'t.' }
    ]
  },
  {
    id: 'presente-continuo', level: 'A1', title: 'Presente continuo',
    intro: 'Describe lo que está pasando en este momento: to be + verbo con -ing.',
    points: [
      { rule: 'am / is / are + verbo-ing.', ex: [['I am reading.', 'Estoy leyendo.'], ['It is raining.', 'Está lloviendo.'], ['They are cooking dinner.', 'Están preparando la cena.']] },
      { rule: 'Si el verbo termina en -e, quítala: make → making. Si termina en consonante-vocal-consonante, duplica la última: run → running.', ex: [['She is writing a letter.', 'Ella está escribiendo una carta.'], ['He is sitting down.', 'Él se está sentando.']] },
      { rule: 'Compara: presente simple para rutinas, continuo para ahora.', ex: [['I work at a store, but today I am studying.', 'Trabajo en una tienda, pero hoy estoy estudiando.']] }
    ],
    quiz: [
      { q: 'Look! It ___ raining.', o: ['is', 'are', 'does'], a: 0, why: 'Con it se usa is + verbo-ing.' },
      { q: 'They are ___ in the park.', o: ['run', 'runing', 'running'], a: 2, why: 'Run duplica la n: running.' },
      { q: 'I ___ to music right now.', o: ['listen', 'am listening', 'listens'], a: 1, why: 'Right now indica una acción en este momento.' },
      { q: 'She ___ to work every day.', o: ['walks', 'is walking', 'walking'], a: 0, why: 'Every day indica rutina: presente simple.' }
    ]
  },
  {
    id: 'pronombres', level: 'A1', title: 'Pronombres y posesivos',
    intro: 'En inglés el sujeto casi nunca se omite. Cada pronombre tiene su forma de objeto y su posesivo.',
    points: [
      { rule: 'Sujeto → objeto: I → me, you → you, he → him, she → her, it → it, we → us, they → them.', ex: [['She knows me.', 'Ella me conoce.'], ['I see them every day.', 'Los veo todos los días.']] },
      { rule: 'Posesivos: my, your, his, her, its, our, their. No cambian aunque la cosa sea plural.', ex: [['my book, my books', 'mi libro, mis libros'], ['Their house is big.', 'Su casa (de ellos) es grande.']] },
      { rule: 'His es de él, her es de ella. Depende del dueño, no de la cosa.', ex: [['Ana and her brother', 'Ana y su hermano'], ['Luis and his sister', 'Luis y su hermana']] },
      { rule: 'Para decir de quién es algo, usa \'s.', ex: [['This is Maria\'s phone.', 'Este es el teléfono de María.']] }
    ],
    quiz: [
      { q: 'Carlos loves ___ dog.', o: ['her', 'his', 'your'], a: 1, why: 'El dueño es Carlos (él): his.' },
      { q: 'Can you help ___?', o: ['I', 'my', 'me'], a: 2, why: 'Después del verbo va el pronombre de objeto: me.' },
      { q: 'We are waiting for ___.', o: ['they', 'them', 'their'], a: 1, why: 'Después de una preposición va el pronombre de objeto.' },
      { q: 'This is my ___ car.', o: ['sister\'s', 'sister', 'sisters'], a: 0, why: 'La posesión se marca con \'s.' }
    ]
  },
  {
    id: 'plurales', level: 'A1', title: 'Plurales y there is / there are',
    intro: 'La mayoría de los plurales llevan -s. «Hay» se dice there is (singular) o there are (plural).',
    points: [
      { rule: 'Agrega -s; -es si termina en s, sh, ch, x; y cambia -y por -ies después de consonante.', ex: [['book → books', 'libros'], ['bus → buses', 'camiones'], ['city → cities', 'ciudades']] },
      { rule: 'Algunos plurales son irregulares.', ex: [['man → men, woman → women', 'hombres, mujeres'], ['child → children', 'niños'], ['person → people', 'personas']] },
      { rule: 'There is + singular, there are + plural.', ex: [['There is a cat in the garden.', 'Hay un gato en el jardín.'], ['There are two chairs.', 'Hay dos sillas.']] },
      { rule: 'Los adjetivos nunca llevan plural.', ex: [['two red cars', 'dos coches rojos']] }
    ],
    quiz: [
      { q: 'There ___ three books on the table.', o: ['is', 'are', 'be'], a: 1, why: 'Three books es plural: there are.' },
      { q: 'I have two ___.', o: ['childs', 'childrens', 'children'], a: 2, why: 'El plural de child es children.' },
      { q: 'She has two ___ dogs.', o: ['small', 'smalls', 'smalles'], a: 0, why: 'Los adjetivos no tienen plural.' },
      { q: 'One city, two ___.', o: ['citys', 'cities', 'cityes'], a: 1, why: 'Consonante + y cambia a -ies.' }
    ]
  },
  {
    id: 'preposiciones', level: 'A2', title: 'Preposiciones: in, on, at',
    intro: 'Las tres se traducen como «en», pero se usan distinto para tiempo y para lugar.',
    points: [
      { rule: 'Tiempo. at: horas. on: días y fechas. in: meses, años y partes del día.', ex: [['at six o\'clock', 'a las seis'], ['on Monday', 'el lunes'], ['in July, in 2026, in the morning', 'en julio, en 2026, en la mañana']] },
      { rule: 'Lugar. at: un punto. on: una superficie. in: dentro de un espacio.', ex: [['at the door', 'en la puerta'], ['on the table', 'sobre la mesa'], ['in the kitchen', 'en la cocina']] },
      { rule: 'Expresiones fijas: at home, at school, at work, at night, on the bus, in the car.', ex: [['I am at work.', 'Estoy en el trabajo.'], ['She reads on the bus.', 'Ella lee en el camión.']] }
    ],
    quiz: [
      { q: 'The class starts ___ nine.', o: ['in', 'on', 'at'], a: 2, why: 'Las horas llevan at.' },
      { q: 'My birthday is ___ March.', o: ['in', 'on', 'at'], a: 0, why: 'Los meses llevan in.' },
      { q: 'We play soccer ___ Saturdays.', o: ['in', 'on', 'at'], a: 1, why: 'Los días llevan on.' },
      { q: 'The keys are ___ the table.', o: ['at', 'in', 'on'], a: 2, why: 'Sobre una superficie: on.' }
    ]
  },
  {
    id: 'pasado-simple', level: 'A2', title: 'Pasado simple',
    intro: 'Para acciones que ya terminaron. Los verbos regulares llevan -ed; los irregulares hay que aprenderlos.',
    points: [
      { rule: 'Regulares: verbo + -ed, igual para todas las personas.', ex: [['I worked yesterday.', 'Trabajé ayer.'], ['She decided to help.', 'Ella decidió ayudar.']] },
      { rule: 'Irregulares: go → went, see → saw, eat → ate, buy → bought, have → had.', ex: [['We went to the market.', 'Fuimos al mercado.'], ['He bought a book.', 'Él compró un libro.']] },
      { rule: 'Negación y pregunta con did + verbo base.', ex: [['I did not see him.', 'No lo vi.'], ['Did you eat?', '¿Comiste?']] },
      { rule: 'To be en pasado: was (I, he, she, it) y were (you, we, they).', ex: [['The soup was terrible.', 'La sopa estaba terrible.'], ['We were tired.', 'Estábamos cansados.']] }
    ],
    quiz: [
      { q: 'Yesterday I ___ to the park.', o: ['go', 'went', 'goed'], a: 1, why: 'El pasado de go es went.' },
      { q: 'Did she ___ the movie?', o: ['saw', 'sees', 'see'], a: 2, why: 'Después de did el verbo va en forma base.' },
      { q: 'They ___ at home last night.', o: ['was', 'were', 'did'], a: 1, why: 'Con they se usa were.' },
      { q: 'He ___ not call me.', o: ['did', 'was', 'does'], a: 0, why: 'La negación en pasado usa did not.' }
    ]
  },
  {
    id: 'futuro', level: 'A2', title: 'Futuro: will y going to',
    intro: 'Will sirve para decisiones del momento, promesas y predicciones. Going to, para planes que ya tenías.',
    points: [
      { rule: 'will + verbo base. Se contrae: I\'ll, she\'ll. Negación: won\'t.', ex: [['I will help you.', 'Te ayudaré.'], ['It won\'t rain tomorrow.', 'No lloverá mañana.']] },
      { rule: 'am / is / are + going to + verbo base, para planes.', ex: [['I am going to study tonight.', 'Voy a estudiar esta noche.'], ['They are going to travel in July.', 'Van a viajar en julio.']] },
      { rule: 'Preguntas: Will you...? / Are you going to...?', ex: [['Will you come?', '¿Vendrás?'], ['Is she going to call?', '¿Ella va a llamar?']] }
    ],
    quiz: [
      { q: 'The phone is ringing. I ___ answer it.', o: ['am going to', 'will', 'going'], a: 1, why: 'Es una decisión del momento: will.' },
      { q: 'She ___ going to visit her grandmother.', o: ['will', 'are', 'is'], a: 2, why: 'She + is going to.' },
      { q: 'I will ___ you tomorrow.', o: ['call', 'to call', 'calling'], a: 0, why: 'Después de will va el verbo base, sin to.' },
      { q: 'They ___ come. They are sick.', o: ['will', 'won\'t', 'aren\'t'], a: 1, why: 'Won\'t es la negación de will.' }
    ]
  },
  {
    id: 'comparativos', level: 'A2', title: 'Comparativos y superlativos',
    intro: 'Para comparar se usa -er o more, seguido de than. Para «el más» se usa the -est o the most.',
    points: [
      { rule: 'Adjetivos cortos: -er than / the -est.', ex: [['My brother is taller than me.', 'Mi hermano es más alto que yo.'], ['This is the cheapest store.', 'Esta es la tienda más barata.']] },
      { rule: 'Adjetivos largos: more ... than / the most ...', ex: [['English is more interesting than I thought.', 'El inglés es más interesante de lo que pensaba.'], ['the most expensive car', 'el coche más caro']] },
      { rule: 'Irregulares: good → better → the best; bad → worse → the worst.', ex: [['The next soup was much better.', 'La siguiente sopa estuvo mucho mejor.']] },
      { rule: 'Si termina en -y, cambia a -ier: happy → happier, easy → easier.', ex: [['This lesson is easier.', 'Esta lección es más fácil.']] }
    ],
    quiz: [
      { q: 'A car is ___ than a bike.', o: ['fast', 'faster', 'more fast'], a: 1, why: 'Fast es corto: faster.' },
      { q: 'This is the ___ movie of the year.', o: ['best', 'better', 'goodest'], a: 0, why: 'El superlativo de good es the best.' },
      { q: 'Spanish is ___ difficult than English.', o: ['most', 'more', 'much'], a: 1, why: 'Difficult es largo: more difficult.' },
      { q: 'Today is ___ than yesterday.', o: ['more hot', 'hottest', 'hotter'], a: 2, why: 'Hot duplica la t: hotter.' }
    ]
  },
  {
    id: 'modales', level: 'A2', title: 'Verbos modales: can, must, should',
    intro: 'Los modales van antes de otro verbo en forma base, sin to, y no cambian con he, she, it.',
    points: [
      { rule: 'Can: habilidad o permiso. Negación: can\'t. Pasado: could.', ex: [['I can swim.', 'Sé nadar.'], ['He could not taste the soup.', 'Él no podía probar la sopa.']] },
      { rule: 'Must: obligación fuerte. Mustn\'t: prohibición.', ex: [['You must wear a seat belt.', 'Debes usar cinturón.'], ['You mustn\'t smoke here.', 'No debes fumar aquí.']] },
      { rule: 'Should: consejo.', ex: [['You should sleep more.', 'Deberías dormir más.']] },
      { rule: 'Preguntas: el modal va antes del sujeto.', ex: [['Can you help me?', '¿Puedes ayudarme?'], ['Should I call her?', '¿Debería llamarla?']] }
    ],
    quiz: [
      { q: 'She ___ speak three languages.', o: ['cans', 'can', 'can to'], a: 1, why: 'Los modales no llevan -s ni to.' },
      { q: 'You look tired. You ___ go to bed.', o: ['should', 'can\'t', 'mustn\'t'], a: 0, why: 'Es un consejo: should.' },
      { q: '___ I open the window?', o: ['Do', 'Can', 'Am'], a: 1, why: 'Para pedir permiso: Can I...?' },
      { q: 'You ___ touch that. It is hot!', o: ['must', 'should', 'mustn\'t'], a: 2, why: 'Mustn\'t expresa prohibición.' }
    ]
  },
  {
    id: 'presente-perfecto', level: 'B1', title: 'Presente perfecto',
    intro: 'Conecta el pasado con el presente: experiencias de vida, y cosas que empezaron antes y siguen ahora. Se forma con have / has + participio.',
    points: [
      { rule: 'have (I, you, we, they) / has (he, she, it) + participio.', ex: [['I have seen that movie.', 'He visto esa película.'], ['She has worked here for thirty years.', 'Ella ha trabajado aquí durante treinta años.']] },
      { rule: 'Ever y never para experiencias.', ex: [['Have you ever been to Canada?', '¿Has estado alguna vez en Canadá?'], ['I have never traveled by ship.', 'Nunca he viajado en barco.']] },
      { rule: 'For + duración, since + punto de inicio.', ex: [['for two years', 'durante dos años'], ['since 2020', 'desde 2020']] },
      { rule: 'Si dices cuándo pasó, usa pasado simple.', ex: [['I saw her yesterday.', 'La vi ayer.']] }
    ],
    quiz: [
      { q: 'She ___ never eaten sushi.', o: ['have', 'has', 'is'], a: 1, why: 'Con she se usa has.' },
      { q: 'I have ___ here since 2020.', o: ['live', 'living', 'lived'], a: 2, why: 'Después de have va el participio.' },
      { q: 'We have known him ___ ten years.', o: ['for', 'since', 'ago'], a: 0, why: 'Ten years es una duración: for.' },
      { q: 'I ___ that movie last week.', o: ['have seen', 'saw', 'seen'], a: 1, why: 'Last week dice cuándo: pasado simple.' }
    ]
  }
];
