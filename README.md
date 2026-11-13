# MiInglés

Aplicación móvil para aprender inglés desde el español. Se instala como APK en Android o se usa desde el navegador como app web (PWA). Funciona sin internet.

## Qué incluye

- **Gramática.** 13 lecciones (A1 a B1) explicadas en español, con ejemplos que se pueden escuchar y un quiz por lección.
- **Pronunciación.** 8 grupos de sonidos difíciles para hispanohablantes. Escuchas la frase normal o lenta, la dices y el teléfono marca qué palabras entendió.
- **Crear oraciones.** 35 oraciones para armar ordenando palabras, por nivel, y un modo de escritura libre con retos de palabras.
- **Traducir cuentos.** 5 cuentos originales para traducir oración por oración y comparar con una traducción de referencia. Al tocar cualquier palabra aparece su significado.
- **Diccionario.** 488 palabras sin conexión (búsqueda en inglés o español), tabla de verbos irregulares, lista de «Mis palabras» y búsqueda en línea opcional.

El avance se guarda solo en el teléfono (`localStorage`). No hay cuentas ni servidor.

## Instalar el APK en Android

1. Abre [Releases → MiInglés para Android](https://github.com/I-s-ax/MiIngles/releases/tag/apk) en el teléfono y descarga `MiIngles.apk`.
2. Ábrelo y permite «instalar apps desconocidas» para tu navegador o gestor de archivos.

GitHub compila el APK solo con cada cambio en `main` (pestaña **Actions**, flujo «Compilar APK»), y la versión nueva se instala encima de la anterior sin perder tu avance. Dentro del APK, la voz y el micrófono usan los servicios de Android (texto a voz y reconocimiento de voz de Google).

El proyecto Android está en `android/`: es un WebView que carga la app web desde el propio APK. Está firmado con la clave de depuración `android/debug.keystore`, que es pública; sirve para uso personal, no para publicar en Play Store.

Para compilarlo en una PC con Android SDK y Gradle 8.9: `gradle -p android assembleDebug`.

## Usarla sin instalar (navegador)

### Opción 1: GitHub Pages

1. En GitHub, abre **Settings → Pages** de este repositorio.
2. En **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
3. Espera un minuto y abre `https://i-s-ax.github.io/MiIngles/` en Chrome.
4. Menú de Chrome → **Agregar a pantalla principal** (o **Instalar app**).

### Opción 2: Termux

```sh
pkg install git python
git clone https://github.com/I-s-ax/MiIngles
cd MiIngles
python -m http.server 8080
```

Abre `http://localhost:8080` en Chrome. No abras `index.html` directamente como archivo: los módulos de JavaScript necesitan un servidor.

## Lo que necesita internet

| Función | Sin internet |
| --- | --- |
| Lecciones, quiz, oraciones, cuentos, diccionario | Funciona |
| Escuchar (voz del teléfono) | Funciona si el teléfono tiene instalada la voz en inglés |
| Decir la frase (reconocimiento de voz) | Necesita internet y Chrome; requiere permiso de micrófono |
| Búsqueda en línea del diccionario | Necesita internet |

La búsqueda en línea envía la palabra consultada a [Free Dictionary API](https://dictionaryapi.dev) (pronunciación y definiciones en inglés) y, si la palabra no está en el diccionario local, a [MyMemory](https://mymemory.translated.net) (traducción automática). Solo ocurre cuando tocas el botón.

## Estructura

```
index.html              pantalla base y barra de navegación
css/styles.css          diseño (tema oscuro, un color por sección)
js/app.js               navegación y las cinco secciones
js/data/grammar.js      lecciones y quiz
js/data/practice.js     oraciones, sonidos y cuentos
js/data/dictionary.js   diccionario y verbos irregulares
sw.js                   guarda la app para usarla sin conexión
manifest.webmanifest    datos para instalarla
android/                proyecto Android que empaqueta la app en un APK
.github/workflows/      compilación automática del APK
```

No usa librerías ni paso de compilación.

## Agregar contenido

Todo el contenido vive en `js/data/`:

- Palabra nueva: una línea `inglés|tipo|español` en `dictionary.js`.
- Oración nueva: un objeto `{ lv, es, en, x }` en `SENTENCES` (`x` son las palabras de más).
- Cuento nuevo: un objeto en `STORIES` con pares `[inglés, español]`.
- Lección nueva: un objeto en `GRAMMAR` con `points` y `quiz`.

Después de cambiar archivos, sube el número de `CACHE` en `sw.js` (por ejemplo `miingles-v2`) para que los teléfonos descarguen la versión nueva.
