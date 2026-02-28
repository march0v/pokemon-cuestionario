# Version Web

Esta carpeta contiene una version web del juego.

- Incluye selector de fondo con varias opciones (predeterminado + fondos personalizados).
- La personalizacion de apariencia se abre desde `Configuracion` y permite cambiar paneles, transparencia, color de letras y color de botones (se guarda en `localStorage`).

## Ejecutar

Opcion 1: abrir directamente `web/index.html` en el navegador.

Opcion 2 (recomendado): usar un servidor local simple en esta carpeta:

```powershell
cd web
python -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Aprendizaje

- Los Pokemon que agregas se guardan en `localStorage`.
- Estadisticas de preguntas tambien se guardan en `localStorage`.
- Hay panel de administrador para activar/desactivar eventos y ver estadisticas.
- Credenciales admin por defecto: usuario `admin`, contrasena `admin123`.
- Al activar un evento desde admin, se fuerza en el proximo fin de partida para verificar rapido que funciona.
- Si limpias datos del navegador, se reinicia ese aprendizaje.
- Cada Pokemon usa un `rasgo distintivo` para evitar duplicados de caracteristicas.
- Al agregar un Pokemon nuevo, se valida online contra `PokeAPI` y el sprite oficial de origen.
- Si el `numeroDex` no coincide con el nombre real, no se guarda.
- El juego ya distingue Pokemon por `generacion` (incluye preguntas de generacion para descartar mas rapido).
- Se agregaron Pokemon de segunda generacion a la base inicial.
- Al aprender un Pokemon, la generacion se guarda y se ajusta automaticamente segun su `numeroDex` oficial.
- Evento especial: al terminar una partida hay `1/20` de probabilidad de que aparezca `MissingNo`.
- Para ese evento se usan `web/pokemon/missingno.png` y `web/pokemon/missingno-theme.mp3`.
- Evento huevo: al terminar una partida hay `1/50` de probabilidad de activar un huevo en la esquina inferior derecha.
- Usa `web/pokemon/egg.png` + `web/pokemon/egg-theme.mp3`, reproduce un maullido aleatorio de `web/pokemon/cat-1.mp3` o `web/pokemon/cat-2.mp3` y arranca un contador de `10:00`.
- Si haces click en la imagen del huevo, suena otro maullido aleatorio desde cualquier pantalla.
- Al llegar a `00:00` muestra el texto: `left home due to happiness.`
