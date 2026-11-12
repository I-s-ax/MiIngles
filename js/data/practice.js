// Oraciones para armar. es: lo que hay que decir, en: respuesta, x: palabras de más.
export const SENTENCES = [
  { lv: 'A1', es: 'Soy estudiante.', en: 'I am a student', x: ['is', 'the'] },
  { lv: 'A1', es: 'Ella tiene un gato.', en: 'She has a cat', x: ['have', 'an'] },
  { lv: 'A1', es: 'Vivimos en México.', en: 'We live in Mexico', x: ['lives', 'on'] },
  { lv: 'A1', es: 'Me gusta el café.', en: 'I like coffee', x: ['the', 'likes'] },
  { lv: 'A1', es: 'Él no trabaja aquí.', en: 'He does not work here', x: ['do', 'works'] },
  { lv: 'A1', es: '¿Hablas inglés?', en: 'Do you speak English', x: ['Does', 'are'] },
  { lv: 'A1', es: 'Mi hermana es doctora.', en: 'My sister is a doctor', x: ['an', 'are'] },
  { lv: 'A1', es: 'Hay dos sillas en la cocina.', en: 'There are two chairs in the kitchen', x: ['is', 'on'] },
  { lv: 'A1', es: 'Estoy leyendo un libro.', en: 'I am reading a book', x: ['read', 'is'] },
  { lv: 'A1', es: '¿Dónde está el baño?', en: 'Where is the bathroom', x: ['are', 'do'] },
  { lv: 'A1', es: 'Ellos son mis amigos.', en: 'They are my friends', x: ['is', 'me'] },
  { lv: 'A1', es: 'Tengo hambre.', en: 'I am hungry', x: ['have', 'the'] },
  { lv: 'A1', es: 'Ella nunca toma leche.', en: 'She never drinks milk', x: ['drink', 'not'] },
  { lv: 'A1', es: '¿Cuál es tu nombre?', en: 'What is your name', x: ['are', 'you'] },
  { lv: 'A2', es: 'Ayer fui al mercado.', en: 'Yesterday I went to the market', x: ['go', 'at'] },
  { lv: 'A2', es: 'No vi la película.', en: 'I did not see the movie', x: ['saw', 'do'] },
  { lv: 'A2', es: '¿Compraste pan?', en: 'Did you buy bread', x: ['bought', 'Do'] },
  { lv: 'A2', es: 'Voy a estudiar esta noche.', en: 'I am going to study tonight', x: ['will', 'studying'] },
  { lv: 'A2', es: 'Mañana lloverá.', en: 'It will rain tomorrow', x: ['rains', 'is'] },
  { lv: 'A2', es: 'Mi casa es más grande que la tuya.', en: 'My house is bigger than yours', x: ['more', 'that'] },
  { lv: 'A2', es: '¿Puedes ayudarme, por favor?', en: 'Can you help me please', x: ['to', 'I'] },
  { lv: 'A2', es: 'Deberías dormir más.', en: 'You should sleep more', x: ['to', 'sleeps'] },
  { lv: 'A2', es: 'La clase empieza a las nueve.', en: 'The class starts at nine', x: ['in', 'start'] },
  { lv: 'A2', es: 'Estábamos muy cansados.', en: 'We were very tired', x: ['was', 'much'] },
  { lv: 'A2', es: 'Ella está esperando el camión.', en: 'She is waiting for the bus', x: ['to', 'waits'] },
  { lv: 'A2', es: 'Este es el mejor día de mi vida.', en: 'This is the best day of my life', x: ['better', 'in'] },
  { lv: 'A2', es: 'Hubo una tormenta el invierno pasado.', en: 'There was a storm last winter', x: ['were', 'the'] },
  { lv: 'B1', es: 'Nunca he viajado en barco.', en: 'I have never traveled by ship', x: ['did', 'in'] },
  { lv: 'B1', es: 'Ella ha trabajado aquí durante diez años.', en: 'She has worked here for ten years', x: ['since', 'have'] },
  { lv: 'B1', es: 'Si llueve, me quedaré en casa.', en: 'If it rains I will stay at home', x: ['would', 'rain'] },
  { lv: 'B1', es: '¿Has probado alguna vez esta sopa?', en: 'Have you ever tasted this soup', x: ['Did', 'never'] },
  { lv: 'B1', es: 'Estaba leyendo cuando me llamaste.', en: 'I was reading when you called me', x: ['read', 'were'] },
  { lv: 'B1', es: 'Tengo que terminar antes de las seis.', en: 'I have to finish before six', x: ['must', 'finishing'] },
  { lv: 'B1', es: 'No sé dónde vive.', en: 'I do not know where he lives', x: ['does', 'live'] },
  { lv: 'B1', es: 'Me gustaría aprender otro idioma.', en: 'I would like to learn another language', x: ['will', 'learning'] }
];

// Retos de escritura libre: escribe una oración que use estas palabras.
export const PROMPTS = [
  ['always', 'morning'], ['because', 'tired'], ['yesterday', 'bought'], ['never', 'before'],
  ['going to', 'weekend'], ['should', 'more'], ['there are', 'kitchen'], ['better', 'than'],
  ['have', 'for'], ['if', 'will'], ['can', 'but'], ['while', 'was']
];

// Pronunciación: sonidos difíciles para quien habla español.
// hint es una aproximación con letras del español, solo como ayuda.
export const SOUNDS = [
  {
    id: 'th', title: 'El sonido th', tip: 'Pon la punta de la lengua entre los dientes y sopla. En think no vibra la garganta; en this sí vibra.',
    items: [['think', 'zink (z de España)'], ['three', 'zrii'], ['thank you', 'zenk iu'], ['this', 'dis, con la lengua entre los dientes'], ['mother', 'máder'], ['I think this is the third one.', '']]
  },
  {
    id: 'v-b', title: 'V contra B', tip: 'En inglés sí son distintas. Para la v, apoya los dientes de arriba en el labio de abajo y haz vibrar.',
    items: [['very', 'veri'], ['berry', 'beri'], ['vote', 'vout'], ['boat', 'bout'], ['seven', 'séven'], ['I love every vegetable.', '']]
  },
  {
    id: 'i-ee', title: 'I corta e I larga', tip: 'Ship y sheep no suenan igual. La corta es relajada, entre i y e; la larga se estira con una sonrisa.',
    items: [['ship', 'ship (i corta)'], ['sheep', 'shiip'], ['sit', 'sit'], ['seat', 'siit'], ['live', 'liv'], ['leave', 'liiv'], ['Sit on this seat, please.', '']]
  },
  {
    id: 'sh-ch', title: 'SH contra CH', tip: 'Sh es el sonido de pedir silencio: shhh. Ch es igual a la ch del español.',
    items: [['she', 'shi'], ['cheese', 'chiis'], ['shoes', 'shuus'], ['choose', 'chuus'], ['wash', 'uósh'], ['watch', 'uóch'], ['She chose cheap shoes.', '']]
  },
  {
    id: 'h', title: 'La H aspirada', tip: 'Es un soplo suave, como empañar un vidrio. No es la j fuerte del español.',
    items: [['house', 'jaus, con j muy suave'], ['happy', 'jápi'], ['hello', 'jelóu'], ['who', 'ju'], ['He has a happy home.', '']]
  },
  {
    id: 's-inicial', title: 'S al inicio de palabra', tip: 'No agregues una e antes de la s. Empieza directo con el siseo: sssschool.',
    items: [['school', 'skuul (no eskuul)'], ['Spanish', 'spánish'], ['street', 'striit'], ['student', 'stiúdent'], ['The student speaks Spanish at school.', '']]
  },
  {
    id: 'ed', title: 'Terminación -ed', tip: 'Tiene tres sonidos: t (worked), d (played) e id (wanted, solo después de t o d). Casi nunca es una sílaba extra.',
    items: [['worked', 'uérkt'], ['played', 'pleid'], ['wanted', 'uóntid'], ['watched', 'uócht'], ['decided', 'disáidid'], ['I worked, played and rested.', '']]
  },
  {
    id: 'frases', title: 'Frases de todos los días', tip: 'Escucha el ritmo completo e imítalo. En inglés las palabras se unen al hablar.',
    items: [['How are you?', 'jáu ar iu'], ['Nice to meet you.', 'náis tu miit iu'], ['What do you do?', 'uót du iu du'], ['Could you repeat that, please?', ''], ['I do not understand.', ''], ['See you tomorrow.', 'sii iu tumórou']]
  }
];

// Cuentos originales. Cada oración: [inglés, español].
export const STORIES = [
  {
    id: 'umbrella', lv: 'A1', title: 'The Red Umbrella', es: 'El paraguas rojo',
    s: [
      ['Ana has a red umbrella.', 'Ana tiene un paraguas rojo.'],
      ['She takes it to school every day.', 'Lo lleva a la escuela todos los días.'],
      ['Today it is raining, but the umbrella is not in her bag.', 'Hoy está lloviendo, pero el paraguas no está en su mochila.'],
      ['She looks under the bed and behind the door.', 'Busca debajo de la cama y detrás de la puerta.'],
      ['Her little brother is in the garden.', 'Su hermano pequeño está en el jardín.'],
      ['He is sitting under the red umbrella with the cat.', 'Está sentado debajo del paraguas rojo con el gato.'],
      ['"The cat does not like the rain," he says.', '«Al gato no le gusta la lluvia», dice él.'],
      ['Ana laughs and sits down with them.', 'Ana se ríe y se sienta con ellos.'],
      ['Today she is late for school, but she is happy.', 'Hoy llega tarde a la escuela, pero está feliz.']
    ]
  },
  {
    id: 'baker', lv: 'A1', title: 'The Baker\'s Morning', es: 'La mañana del panadero',
    s: [
      ['Mr. Soto wakes up at four in the morning.', 'El señor Soto se despierta a las cuatro de la mañana.'],
      ['The street is dark and quiet.', 'La calle está oscura y silenciosa.'],
      ['He opens his small bakery and turns on the oven.', 'Abre su pequeña panadería y enciende el horno.'],
      ['He mixes flour, water, salt and a little sugar.', 'Mezcla harina, agua, sal y un poco de azúcar.'],
      ['Soon the whole street smells like fresh bread.', 'Pronto toda la calle huele a pan fresco.'],
      ['At six, the first customer knocks on the window.', 'A las seis, la primera clienta toca la ventana.'],
      ['She is a nurse, and she is going home after a long night.', 'Es enfermera y va a casa después de una noche larga.'],
      ['Mr. Soto gives her a warm roll and a cup of coffee.', 'El señor Soto le da un bolillo calientito y una taza de café.'],
      ['"This is the best part of my day," she says.', '«Esta es la mejor parte de mi día», dice ella.'],
      ['He smiles, because it is the best part of his day too.', 'Él sonríe, porque también es la mejor parte de su día.']
    ]
  },
  {
    id: 'market', lv: 'A2', title: 'The Night Market', es: 'El mercado nocturno',
    s: [
      ['Last Saturday, my cousin and I went to the night market.', 'El sábado pasado, mi primo y yo fuimos al mercado nocturno.'],
      ['There were lights everywhere, and music came from every corner.', 'Había luces por todas partes y salía música de cada esquina.'],
      ['We bought tacos and ate them next to a fountain.', 'Compramos tacos y nos los comimos junto a una fuente.'],
      ['Then I saw an old man who was selling used books.', 'Luego vi a un señor mayor que vendía libros usados.'],
      ['I found a book of English stories for only twenty pesos.', 'Encontré un libro de cuentos en inglés por solo veinte pesos.'],
      ['Inside the book, someone had written a name and a date.', 'Dentro del libro, alguien había escrito un nombre y una fecha.'],
      ['I asked the man about it, but he did not know the owner.', 'Le pregunté al señor, pero no conocía al dueño.'],
      ['That night I read the first story before I fell asleep.', 'Esa noche leí el primer cuento antes de quedarme dormido.'],
      ['Now I read one story every night, and I write new words in my notebook.', 'Ahora leo un cuento cada noche y escribo palabras nuevas en mi cuaderno.']
    ]
  },
  {
    id: 'robot', lv: 'A2', title: 'The Robot Who Wanted to Cook', es: 'El robot que quería cocinar',
    s: [
      ['Bolt was a cleaning robot, but he dreamed of being a chef.', 'Bolt era un robot de limpieza, pero soñaba con ser chef.'],
      ['Every evening he watched the family cook dinner.', 'Cada tarde veía a la familia preparar la cena.'],
      ['He remembered every recipe, but he had never tasted food.', 'Recordaba todas las recetas, pero nunca había probado la comida.'],
      ['One day the family came home late and very tired.', 'Un día la familia llegó a casa tarde y muy cansada.'],
      ['Bolt decided to help, so he made a vegetable soup.', 'Bolt decidió ayudar, así que hizo una sopa de verduras.'],
      ['He could not taste it, so he added salt three times.', 'No podía probarla, así que le puso sal tres veces.'],
      ['The soup was terrible, but nobody wanted to hurt his feelings.', 'La sopa estaba terrible, pero nadie quería herir sus sentimientos.'],
      ['The youngest daughter gave him a spoon with a small sensor.', 'La hija más pequeña le dio una cuchara con un pequeño sensor.'],
      ['"Now you can measure the salt," she said.', '«Ahora puedes medir la sal», dijo ella.'],
      ['The next soup was much better, and Bolt became the family cook on Sundays.', 'La siguiente sopa estuvo mucho mejor, y Bolt se convirtió en el cocinero de la familia los domingos.']
    ]
  },
  {
    id: 'lighthouse', lv: 'B1', title: 'The Lighthouse Keeper', es: 'La guardiana del faro',
    s: [
      ['Marta has worked at the lighthouse for thirty years.', 'Marta ha trabajado en el faro durante treinta años.'],
      ['She has seen thousands of ships pass, but she has never traveled on one.', 'Ha visto pasar miles de barcos, pero nunca ha viajado en uno.'],
      ['Every night she climbs one hundred and twenty steps to turn on the light.', 'Cada noche sube ciento veinte escalones para encender la luz.'],
      ['If the light fails, the ships could hit the rocks.', 'Si la luz falla, los barcos podrían chocar con las rocas.'],
      ['Last winter, a storm cut the electricity for two days.', 'El invierno pasado, una tormenta cortó la electricidad durante dos días.'],
      ['Marta kept a fire burning at the top of the tower until the storm ended.', 'Marta mantuvo un fuego encendido en lo alto de la torre hasta que terminó la tormenta.'],
      ['A week later, a captain visited her to say thank you.', 'Una semana después, un capitán la visitó para darle las gracias.'],
      ['He offered her a trip on his ship to any place she wanted.', 'Le ofreció un viaje en su barco a cualquier lugar que ella quisiera.'],
      ['She thought about it for a long time.', 'Ella lo pensó durante mucho tiempo.'],
      ['"I will go," she finally answered, "but only if someone takes care of the light."', '«Iré», respondió por fin, «pero solo si alguien cuida la luz».']
    ]
  }
];
