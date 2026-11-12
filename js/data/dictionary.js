// Diccionario sin conexión. Formato por línea: inglés|tipo|español
// Tipos: n sustantivo, v verbo, adj adjetivo, adv adverbio, prep preposición,
// pron pronombre, conj conjunción, det determinante, num número, int expresión
const RAW = `
a|det|un, una
an|det|un, una (antes de sonido vocal)
the|det|el, la, los, las
this|det|este, esta, esto
that|det|ese, esa, eso; que
these|det|estos, estas
those|det|esos, esas, aquellos
some|det|algunos, algo de
any|det|algún, cualquier
every|det|cada, todos los
all|det|todo, todos
many|det|muchos
much|det|mucho
few|det|pocos
little|adj|pequeño; poco
more|adv|más
most|adv|la mayoría; el más
no|det|no; ningún
not|adv|no
other|adj|otro
another|det|otro, otra
both|det|ambos
each|det|cada
i|pron|yo
you|pron|tú, usted, ustedes
he|pron|él
she|pron|ella
it|pron|eso, ello (cosas y animales)
we|pron|nosotros
they|pron|ellos, ellas
me|pron|me, mí
him|pron|lo, le, él
her|pron|su (de ella); la, le
us|pron|nos, nosotros
them|pron|los, las, les, ellos
my|det|mi, mis
your|det|tu, su
his|det|su (de él)
its|det|su (de una cosa o animal)
our|det|nuestro
their|det|su (de ellos)
mine|pron|mío
yours|pron|tuyo
who|pron|quién; que
what|pron|qué
which|pron|cuál; que
where|adv|dónde
when|adv|cuándo; cuando
why|adv|por qué
how|adv|cómo
someone|pron|alguien
nobody|pron|nadie
everyone|pron|todos, todo el mundo
something|pron|algo
nothing|pron|nada
everything|pron|todo
everywhere|adv|por todas partes
and|conj|y
or|conj|o
but|conj|pero
because|conj|porque
so|conj|así que; tan
if|conj|si
than|conj|que (en comparaciones)
while|conj|mientras
until|prep|hasta
before|prep|antes de
after|prep|después de
then|adv|entonces, luego
in|prep|en, dentro de
on|prep|en, sobre
at|prep|en, a (lugar u hora exacta)
to|prep|a, hacia; para
from|prep|de, desde
of|prep|de
with|prep|con
without|prep|sin
for|prep|para; por; durante
about|prep|sobre, acerca de
by|prep|por; junto a
under|prep|debajo de
over|prep|sobre, encima de
behind|prep|detrás de
between|prep|entre
near|prep|cerca de
next|adj|siguiente, próximo
inside|prep|dentro de
outside|prep|fuera de
into|prep|hacia dentro de
up|adv|arriba
down|adv|abajo
out|adv|fuera
off|adv|apagado; fuera
through|prep|a través de
during|prep|durante
around|prep|alrededor de
be|v|ser, estar
have|v|tener; haber
do|v|hacer
go|v|ir
come|v|venir
get|v|conseguir, obtener; llegar
make|v|hacer, fabricar
take|v|tomar, llevar
give|v|dar
see|v|ver
look|v|mirar; parecer
watch|v|mirar, observar
hear|v|oír
listen|v|escuchar
say|v|decir
tell|v|contar, decir
speak|v|hablar
talk|v|hablar, platicar
ask|v|preguntar; pedir
answer|v|responder
know|v|saber; conocer
think|v|pensar
believe|v|creer
remember|v|recordar
forget|v|olvidar
understand|v|entender
learn|v|aprender
study|v|estudiar
teach|v|enseñar
read|v|leer
write|v|escribir
want|v|querer
need|v|necesitar
like|v|gustar; como
love|v|amar, encantar
hate|v|odiar
feel|v|sentir
hope|v|esperar (tener esperanza)
wait|v|esperar (aguardar)
dream|v|soñar
decide|v|decidir
try|v|intentar; probar
help|v|ayudar
work|v|trabajar; funcionar
play|v|jugar; tocar (un instrumento)
live|v|vivir
eat|v|comer
drink|v|beber
cook|v|cocinar
taste|v|probar, saborear
smell|v|oler
mix|v|mezclar
add|v|agregar, añadir
measure|v|medir
buy|v|comprar
sell|v|vender
pay|v|pagar
cost|v|costar
open|v|abrir
close|v|cerrar
turn|v|girar; turn on: encender
start|v|empezar
begin|v|comenzar
finish|v|terminar
end|v|terminar; final
stop|v|parar, detener
keep|v|mantener, guardar
put|v|poner
bring|v|traer
carry|v|cargar, llevar
send|v|enviar
find|v|encontrar
lose|v|perder
use|v|usar
show|v|mostrar
meet|v|conocer; reunirse
visit|v|visitar
call|v|llamar
offer|v|ofrecer
travel|v|viajar
walk|v|caminar
run|v|correr
drive|v|manejar, conducir
fly|v|volar
swim|v|nadar
climb|v|subir, escalar
sit|v|sentarse
stand|v|estar de pie
sleep|v|dormir
wake|v|despertar
fall|v|caer; fall asleep: quedarse dormido
knock|v|tocar (la puerta)
laugh|v|reír
smile|v|sonreír
cry|v|llorar
hurt|v|lastimar, doler
hit|v|golpear, chocar con
cut|v|cortar
burn|v|quemar, arder
fail|v|fallar; reprobar
pass|v|pasar; aprobar
become|v|convertirse en, llegar a ser
change|v|cambiar
grow|v|crecer
clean|v|limpiar
wash|v|lavar
wear|v|llevar puesto, usar (ropa)
rain|v|llover; lluvia
can|v|poder, saber (hacer algo)
could|v|podía; podría
will|v|(auxiliar del futuro)
would|v|(auxiliar del condicional: -ría)
should|v|debería
must|v|deber, tener que
may|v|poder (permiso o posibilidad)
might|v|podría (posibilidad)
time|n|tiempo; vez
day|n|día
night|n|noche
morning|n|mañana (parte del día)
afternoon|n|tarde
evening|n|tarde-noche
week|n|semana
month|n|mes
year|n|año
today|adv|hoy
tomorrow|adv|mañana
yesterday|adv|ayer
now|adv|ahora
soon|adv|pronto
later|adv|más tarde
late|adj|tarde
early|adv|temprano
always|adv|siempre
never|adv|nunca
sometimes|adv|a veces
often|adv|a menudo
usually|adv|normalmente
already|adv|ya
still|adv|todavía
yet|adv|aún, todavía (en negaciones y preguntas)
just|adv|solo; acabar de
only|adv|solo, solamente
also|adv|también
too|adv|también; demasiado
very|adv|muy
really|adv|realmente, de verdad
finally|adv|finalmente
here|adv|aquí
there|adv|allí, ahí
again|adv|otra vez
together|adv|juntos
ago|adv|hace (tiempo atrás)
last|adj|último; pasado
first|adj|primero
second|adj|segundo
long|adj|largo
short|adj|corto; bajo
big|adj|grande
small|adj|pequeño
tall|adj|alto
old|adj|viejo; antiguo
young|adj|joven
new|adj|nuevo
good|adj|bueno
bad|adj|malo
better|adj|mejor
best|adj|el mejor
worse|adj|peor
worst|adj|el peor
terrible|adj|terrible
happy|adj|feliz
sad|adj|triste
tired|adj|cansado
angry|adj|enojado
hungry|adj|hambriento
thirsty|adj|sediento
sick|adj|enfermo
afraid|adj|asustado, con miedo
hot|adj|caliente; caluroso
cold|adj|frío
warm|adj|cálido, tibio
fresh|adj|fresco
dark|adj|oscuro
quiet|adj|silencioso, tranquilo
loud|adj|ruidoso, fuerte
fast|adj|rápido
slow|adj|lento
easy|adj|fácil
difficult|adj|difícil
hard|adj|duro; difícil
important|adj|importante
interesting|adj|interesante
beautiful|adj|hermoso
ugly|adj|feo
cheap|adj|barato
expensive|adj|caro
free|adj|libre; gratis
used|adj|usado
full|adj|lleno
empty|adj|vacío
whole|adj|entero, todo
same|adj|mismo
different|adj|diferente
right|adj|correcto; derecho
wrong|adj|incorrecto, equivocado
true|adj|verdadero
ready|adj|listo
sure|adj|seguro
red|adj|rojo
blue|adj|azul
green|adj|verde
yellow|adj|amarillo
black|adj|negro
white|adj|blanco
brown|adj|café, marrón
one|num|uno
two|num|dos
three|num|tres
four|num|cuatro
five|num|cinco
six|num|seis
seven|num|siete
eight|num|ocho
nine|num|nueve
ten|num|diez
twenty|num|veinte
thirty|num|treinta
hundred|num|cien, ciento
thousand|num|mil
person|n|persona
people|n|gente, personas
man|n|hombre
woman|n|mujer
child|n|niño, niña
boy|n|niño
girl|n|niña
friend|n|amigo, amiga
family|n|familia
mother|n|madre
father|n|padre
parent|n|padre o madre
brother|n|hermano
sister|n|hermana
son|n|hijo
daughter|n|hija
cousin|n|primo, prima
grandmother|n|abuela
grandfather|n|abuelo
husband|n|esposo
wife|n|esposa
name|n|nombre
owner|n|dueño
customer|n|cliente
teacher|n|maestro, profesor
student|n|estudiante
doctor|n|doctor, médico
nurse|n|enfermera, enfermero
chef|n|chef, cocinero
baker|n|panadero
captain|n|capitán
keeper|n|guardián, encargado
mr|n|señor (Sr.)
home|n|hogar, casa
house|n|casa
room|n|cuarto, habitación
kitchen|n|cocina
bathroom|n|baño
bedroom|n|recámara, dormitorio
garden|n|jardín
door|n|puerta
window|n|ventana
bed|n|cama
table|n|mesa
chair|n|silla
oven|n|horno
spoon|n|cuchara
cup|n|taza
bag|n|bolsa, mochila
umbrella|n|paraguas
book|n|libro
notebook|n|cuaderno
story|n|cuento, historia
word|n|palabra
sentence|n|oración
letter|n|carta; letra
page|n|página
recipe|n|receta
date|n|fecha; cita
school|n|escuela
class|n|clase
job|n|trabajo, empleo
office|n|oficina
money|n|dinero
peso|n|peso (moneda)
city|n|ciudad
town|n|pueblo
street|n|calle
corner|n|esquina
place|n|lugar
market|n|mercado
store|n|tienda
bakery|n|panadería
restaurant|n|restaurante
hospital|n|hospital
park|n|parque
fountain|n|fuente
lighthouse|n|faro
tower|n|torre
step|n|escalón; paso
top|n|cima, parte de arriba
part|n|parte
car|n|coche, carro
bus|n|autobús, camión
train|n|tren
ship|n|barco
trip|n|viaje
food|n|comida
water|n|agua
bread|n|pan
roll|n|bolillo, panecillo
flour|n|harina
salt|n|sal
sugar|n|azúcar
coffee|n|café
tea|n|té
milk|n|leche
soup|n|sopa
vegetable|n|verdura
fruit|n|fruta
apple|n|manzana
egg|n|huevo
meat|n|carne
chicken|n|pollo
rice|n|arroz
taco|n|taco
breakfast|n|desayuno
lunch|n|almuerzo, comida
dinner|n|cena
cat|n|gato
dog|n|perro
bird|n|pájaro
fish|n|pez; pescado
sun|n|sol
moon|n|luna
star|n|estrella
sea|n|mar
rock|n|roca
storm|n|tormenta
winter|n|invierno
summer|n|verano
fire|n|fuego
light|n|luz
electricity|n|electricidad
music|n|música
song|n|canción
movie|n|película
game|n|juego
phone|n|teléfono
computer|n|computadora
robot|n|robot
sensor|n|sensor
cleaning|n|limpieza
thing|n|cosa
idea|n|idea
question|n|pregunta
problem|n|problema
feeling|n|sentimiento
life|n|vida
world|n|mundo
country|n|país
language|n|idioma
english|n|inglés
spanish|n|español
saturday|n|sábado
sunday|n|domingo
monday|n|lunes
friday|n|viernes
head|n|cabeza
hand|n|mano
eye|n|ojo
heart|n|corazón
yes|int|sí
hello|int|hola
goodbye|int|adiós
please|int|por favor
thanks|int|gracias
thank|v|agradecer; thank you: gracias
sorry|int|perdón, lo siento
care|n|cuidado; take care of: cuidar
well|adv|bien
asleep|adj|dormido
`;

export const DICT = RAW.trim().split('\n').map(l => {
  const [en, pos, es] = l.split('|');
  return { en, pos, es };
});

export const POS = {
  n: 'sustantivo', v: 'verbo', adj: 'adjetivo', adv: 'adverbio', prep: 'preposición',
  pron: 'pronombre', conj: 'conjunción', det: 'determinante', num: 'número', int: 'expresión'
};

// Verbos irregulares: base|pasado|participio
export const IRREGULAR = `be|was/were|been
become|became|become
begin|began|begun
bring|brought|brought
buy|bought|bought
come|came|come
cost|cost|cost
cut|cut|cut
do|did|done
drink|drank|drunk
drive|drove|driven
eat|ate|eaten
fall|fell|fallen
feel|felt|felt
find|found|found
fly|flew|flown
forget|forgot|forgotten
get|got|gotten
give|gave|given
go|went|gone
grow|grew|grown
have|had|had
hear|heard|heard
hit|hit|hit
hurt|hurt|hurt
keep|kept|kept
know|knew|known
learn|learned|learned
lose|lost|lost
make|made|made
meet|met|met
pay|paid|paid
put|put|put
read|read|read
run|ran|run
say|said|said
see|saw|seen
sell|sold|sold
send|sent|sent
sit|sat|sat
sleep|slept|slept
speak|spoke|spoken
stand|stood|stood
swim|swam|swum
take|took|taken
teach|taught|taught
tell|told|told
think|thought|thought
understand|understood|understood
wake|woke|woken
wear|wore|worn
write|wrote|written`.split('\n').map(l => {
  const [base, past, part] = l.split('|');
  return { base, past, part };
});

// Otras formas que no siguen reglas: forma -> palabra base
export const FORMS = {
  am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be',
  has: 'have', does: 'do', men: 'man', women: 'woman', children: 'child',
  an: 'an', better: 'better', worse: 'worse', youngest: 'young', families: 'family'
};
