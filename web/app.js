const STORAGE_KEYS = {
  learnedPokemon: "pokemon.learned.v1",
  questionStats: "pokemon.questionStats.v1",
  adminSettings: "pokemon.admin.settings.v1",
  adminStats: "pokemon.admin.stats.v1",
  backgroundChoice: "pokemon.ui.background.v1",
  panelStyle: "pokemon.ui.panelStyle.v1",
};
const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";
const SPRITE_ORIGEN_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const MISSINGNO_CHANCE_DENOMINATOR = 20;
const MISSINGNO_IMAGE_PATH = "pokemon/missingno.png";
const EGG_CHANCE_DENOMINATOR = 50;
const EGG_COUNTDOWN_SECONDS = 10 * 60;
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const CAT_SOUND_FILES = [
  "pokemon/cat-1.mp3",
  "pokemon/cat-2.mp3",
];
const BACKGROUND_PRESETS = {
  bg1: "pokemon/background-1.png",
  bg2: "pokemon/background-2.jpg",
  bg3: "pokemon/background-3.jpg",
  bg4: "pokemon/background-4.png",
  bg5: "pokemon/background-5.png",
  bg6: "pokemon/background-6.png",
  bg7: "pokemon/background-7.png",
  bg8: "pokemon/background-8.png",
};
const DEFAULT_ADMIN_SETTINGS = {
  missingnoEnabled: true,
  eggEnabled: true,
};
const DEFAULT_ADMIN_STATS = {
  gamesFinished: 0,
  missingnoTriggered: 0,
  eggTriggered: 0,
};
const DEFAULT_PANEL_STYLE = {
  color: "#fffdf8",
  opacity: 95,
  textColor: "#1d1d1d",
  buttonColor: "#d32f2f",
};

const DEX_GENERATION_RANGES = [
  { min: 1, max: 151, generation: 1 },
  { min: 152, max: 251, generation: 2 },
  { min: 252, max: 386, generation: 3 },
  { min: 387, max: 493, generation: 4 },
  { min: 494, max: 649, generation: 5 },
  { min: 650, max: 721, generation: 6 },
  { min: 722, max: 809, generation: 7 },
  { min: 810, max: 905, generation: 8 },
  { min: 906, max: 1025, generation: 9 },
];

const BASE_POKEMON = [
  { nombre: "Pikachu", tipo: "Electrico", tipoSecundario: "Ninguno", color: "Amarillo", habitat: "Bosque", esEvolucion: true, numeroDex: 25 },
  { nombre: "Raichu", tipo: "Electrico", tipoSecundario: "Ninguno", color: "Naranja", habitat: "Bosque", esEvolucion: true, numeroDex: 26 },
  { nombre: "Charmander", tipo: "Fuego", tipoSecundario: "Ninguno", color: "Naranja", habitat: "Montana", esEvolucion: false, numeroDex: 4 },
  { nombre: "Charmeleon", tipo: "Fuego", tipoSecundario: "Ninguno", color: "Rojo", habitat: "Montana", esEvolucion: true, numeroDex: 5 },
  { nombre: "Vulpix", tipo: "Fuego", tipoSecundario: "Ninguno", color: "Naranja", habitat: "Montana", esEvolucion: false, numeroDex: 37 },
  { nombre: "Squirtle", tipo: "Agua", tipoSecundario: "Ninguno", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 7 },
  { nombre: "Psyduck", tipo: "Agua", tipoSecundario: "Ninguno", color: "Amarillo", habitat: "Agua", esEvolucion: false, numeroDex: 54 },
  { nombre: "Poliwag", tipo: "Agua", tipoSecundario: "Ninguno", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 60 },
  { nombre: "Bulbasaur", tipo: "Planta", tipoSecundario: "Veneno", color: "Verde", habitat: "Bosque", esEvolucion: false, numeroDex: 1 },
  { nombre: "Oddish", tipo: "Planta", tipoSecundario: "Veneno", color: "Azul", habitat: "Bosque", esEvolucion: false, numeroDex: 43 },
  { nombre: "Bellsprout", tipo: "Planta", tipoSecundario: "Veneno", color: "Verde", habitat: "Pradera", esEvolucion: false, numeroDex: 69 },
  { nombre: "Jigglypuff", tipo: "Normal", tipoSecundario: "Ninguno", color: "Rosa", habitat: "Pradera", esEvolucion: false, numeroDex: 39 },
  { nombre: "Meowth", tipo: "Normal", tipoSecundario: "Ninguno", color: "Amarillo", habitat: "Ciudad", esEvolucion: false, numeroDex: 52 },
  { nombre: "Snorlax", tipo: "Normal", tipoSecundario: "Ninguno", color: "Negro", habitat: "Montana", esEvolucion: false, numeroDex: 143 },
  { nombre: "Gastly", tipo: "Fantasma", tipoSecundario: "Veneno", color: "Morado", habitat: "Cueva", esEvolucion: false, numeroDex: 92 },
  { nombre: "Haunter", tipo: "Fantasma", tipoSecundario: "Veneno", color: "Morado", habitat: "Cueva", esEvolucion: true, numeroDex: 93 },
  { nombre: "Onix", tipo: "Roca", tipoSecundario: "Tierra", color: "Gris", habitat: "Cueva", esEvolucion: false, numeroDex: 95 },
  { nombre: "Geodude", tipo: "Roca", tipoSecundario: "Tierra", color: "Gris", habitat: "Cueva", esEvolucion: false, numeroDex: 74 },
  { nombre: "Magikarp", tipo: "Agua", tipoSecundario: "Ninguno", color: "Rojo", habitat: "Agua", esEvolucion: false, numeroDex: 129 },
  { nombre: "Eevee", tipo: "Normal", tipoSecundario: "Ninguno", color: "Cafe", habitat: "Ciudad", esEvolucion: false, numeroDex: 133 },
  { nombre: "Abra", tipo: "Psiquico", tipoSecundario: "Ninguno", color: "Amarillo", habitat: "Ciudad", esEvolucion: false, numeroDex: 63 },
  { nombre: "Machop", tipo: "Lucha", tipoSecundario: "Ninguno", color: "Gris", habitat: "Montana", esEvolucion: false, numeroDex: 66 },
  { nombre: "Cubone", tipo: "Tierra", tipoSecundario: "Ninguno", color: "Cafe", habitat: "Montana", esEvolucion: false, numeroDex: 104 },
  { nombre: "Dratini", tipo: "Dragon", tipoSecundario: "Ninguno", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 147 },
  { nombre: "Lapras", tipo: "Hielo", tipoSecundario: "Agua", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 131 },
  { nombre: "Zubat", tipo: "Volador", tipoSecundario: "Veneno", color: "Morado", habitat: "Cueva", esEvolucion: false, numeroDex: 41 },
  { nombre: "Chikorita", tipo: "Planta", tipoSecundario: "Ninguno", color: "Verde", habitat: "Pradera", esEvolucion: false, numeroDex: 152 },
  { nombre: "Bayleef", tipo: "Planta", tipoSecundario: "Ninguno", color: "Verde", habitat: "Bosque", esEvolucion: true, numeroDex: 153 },
  { nombre: "Cyndaquil", tipo: "Fuego", tipoSecundario: "Ninguno", color: "Azul", habitat: "Montana", esEvolucion: false, numeroDex: 155 },
  { nombre: "Totodile", tipo: "Agua", tipoSecundario: "Ninguno", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 158 },
  { nombre: "Sentret", tipo: "Normal", tipoSecundario: "Ninguno", color: "Cafe", habitat: "Pradera", esEvolucion: false, numeroDex: 161 },
  { nombre: "Hoothoot", tipo: "Normal", tipoSecundario: "Volador", color: "Cafe", habitat: "Bosque", esEvolucion: false, numeroDex: 163 },
  { nombre: "Mareep", tipo: "Electrico", tipoSecundario: "Ninguno", color: "Blanco", habitat: "Pradera", esEvolucion: false, numeroDex: 179 },
  { nombre: "Wooper", tipo: "Agua", tipoSecundario: "Tierra", color: "Azul", habitat: "Agua", esEvolucion: false, numeroDex: 194 },
  { nombre: "Espeon", tipo: "Psiquico", tipoSecundario: "Ninguno", color: "Morado", habitat: "Ciudad", esEvolucion: true, numeroDex: 196 },
  { nombre: "Umbreon", tipo: "Siniestro", tipoSecundario: "Ninguno", color: "Negro", habitat: "Ciudad", esEvolucion: true, numeroDex: 197 },
  { nombre: "Murkrow", tipo: "Siniestro", tipoSecundario: "Volador", color: "Negro", habitat: "Ciudad", esEvolucion: false, numeroDex: 198 },
  { nombre: "Misdreavus", tipo: "Fantasma", tipoSecundario: "Ninguno", color: "Morado", habitat: "Cueva", esEvolucion: false, numeroDex: 200 },
  { nombre: "Pineco", tipo: "Bicho", tipoSecundario: "Ninguno", color: "Verde", habitat: "Bosque", esEvolucion: false, numeroDex: 204 },
  { nombre: "Gligar", tipo: "Tierra", tipoSecundario: "Volador", color: "Morado", habitat: "Montana", esEvolucion: false, numeroDex: 207 },
  { nombre: "Sneasel", tipo: "Siniestro", tipoSecundario: "Hielo", color: "Negro", habitat: "Montana", esEvolucion: false, numeroDex: 215 },
  { nombre: "Swinub", tipo: "Hielo", tipoSecundario: "Tierra", color: "Cafe", habitat: "Montana", esEvolucion: false, numeroDex: 220 },
  { nombre: "Skarmory", tipo: "Acero", tipoSecundario: "Volador", color: "Gris", habitat: "Montana", esEvolucion: false, numeroDex: 227 },
  { nombre: "Houndour", tipo: "Fuego", tipoSecundario: "Siniestro", color: "Negro", habitat: "Cueva", esEvolucion: false, numeroDex: 228 },
  { nombre: "Phanpy", tipo: "Tierra", tipoSecundario: "Ninguno", color: "Azul", habitat: "Pradera", esEvolucion: false, numeroDex: 231 },
  { nombre: "Larvitar", tipo: "Roca", tipoSecundario: "Tierra", color: "Verde", habitat: "Montana", esEvolucion: false, numeroDex: 246 },
];

const BASE_RASGO_BY_NAME = {
  pikachu: "Mejillas electricas",
  raichu: "Cola larga en forma de rayo",
  charmander: "Llama en la cola",
  charmeleon: "Garras afiladas",
  vulpix: "Seis colas",
  squirtle: "Caparazon redondo",
  psyduck: "Dolor de cabeza constante",
  poliwag: "Espiral en el vientre",
  bulbasaur: "Bulbo en la espalda",
  oddish: "Hojas en la cabeza",
  bellsprout: "Boca en forma de campana",
  jigglypuff: "Canta para dormir",
  meowth: "Moneda en la frente",
  snorlax: "Siempre dormido",
  gastly: "Cuerpo de gas",
  haunter: "Manos flotantes",
  onix: "Cuerpo de roca en segmentos",
  geodude: "Brazos musculosos",
  magikarp: "Salta sin control",
  eevee: "Muchas evoluciones posibles",
  abra: "Se duerme y se teletransporta",
  machop: "Cuerpo entrenado",
  cubone: "Usa un hueso como arma",
  dratini: "Cuerpo serpiente azul",
  lapras: "Caparazon con puntas",
  zubat: "No tiene ojos",
};

const els = {
  btnOpenAppearance: document.getElementById("btnOpenAppearance"),
  appearanceModal: document.getElementById("appearanceModal"),
  btnCloseAppearance: document.getElementById("btnCloseAppearance"),
  bgSelect: document.getElementById("bgSelect"),
  panelColor: document.getElementById("panelColor"),
  textColor: document.getElementById("textColor"),
  buttonColor: document.getElementById("buttonColor"),
  panelOpacity: document.getElementById("panelOpacity"),
  panelOpacityValue: document.getElementById("panelOpacityValue"),
  btnResetPanelStyle: document.getElementById("btnResetPanelStyle"),
  btnAdminLogin: document.getElementById("btnAdminLogin"),
  adminPanel: document.getElementById("adminPanel"),
  chkMissingnoEnabled: document.getElementById("chkMissingnoEnabled"),
  chkEggEnabled: document.getElementById("chkEggEnabled"),
  statGamesFinished: document.getElementById("statGamesFinished"),
  statMissingnoTriggered: document.getElementById("statMissingnoTriggered"),
  statEggTriggered: document.getElementById("statEggTriggered"),
  questionStatsView: document.getElementById("questionStatsView"),
  adminLoginModal: document.getElementById("adminLoginModal"),
  adminLoginForm: document.getElementById("adminLoginForm"),
  adminUser: document.getElementById("adminUser"),
  adminPass: document.getElementById("adminPass"),
  adminLoginError: document.getElementById("adminLoginError"),
  btnAdminCancel: document.getElementById("btnAdminCancel"),
  questionCard: document.getElementById("questionCard"),
  questionText: document.getElementById("questionText"),
  statusText: document.getElementById("statusText"),
  btnSi: document.getElementById("btnSi"),
  btnNo: document.getElementById("btnNo"),
  btnReiniciar: document.getElementById("btnReiniciar"),
  resultCard: document.getElementById("resultCard"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  pokemonImage: document.getElementById("pokemonImage"),
  btnCorrecto: document.getElementById("btnCorrecto"),
  btnIncorrecto: document.getElementById("btnIncorrecto"),
  btnJugarOtra: document.getElementById("btnJugarOtra"),
  eggEvent: document.getElementById("eggEvent"),
  eggImage: document.getElementById("eggImage"),
  eggTimer: document.getElementById("eggTimer"),
  eggMessage: document.getElementById("eggMessage"),
  missingnoAudio: document.getElementById("missingnoAudio"),
  eggThemeAudio: document.getElementById("eggThemeAudio"),
  learnCard: document.getElementById("learnCard"),
  learnForm: document.getElementById("learnForm"),
  btnGuardarAprendizaje: document.getElementById("btnGuardarAprendizaje"),
  btnCancelarAprendizaje: document.getElementById("btnCancelarAprendizaje"),
  nuevoNombre: document.getElementById("nuevoNombre"),
  nuevoTipo: document.getElementById("nuevoTipo"),
  nuevoGeneracion: document.getElementById("nuevoGeneracion"),
  nuevoTipoSec: document.getElementById("nuevoTipoSec"),
  nuevoColor: document.getElementById("nuevoColor"),
  nuevoHabitat: document.getElementById("nuevoHabitat"),
  nuevoRasgo: document.getElementById("nuevoRasgo"),
  nuevoEsEvolucion: document.getElementById("nuevoEsEvolucion"),
  nuevoDex: document.getElementById("nuevoDex"),
};

const state = {
  allPokemon: [],
  candidatos: [],
  preguntas: [],
  usadas: new Set(),
  preguntaActual: null,
  ultimoCandidato: null,
  stats: {},
  missingnoChecked: false,
  missingnoActive: false,
  eggChecked: false,
  eggActive: false,
  eggHatched: false,
  eggEndsAt: 0,
  eggTimerIntervalId: null,
  activeCatAudio: null,
  isAdmin: false,
  adminSettings: { ...DEFAULT_ADMIN_SETTINGS },
  adminStats: { ...DEFAULT_ADMIN_STATS },
  gameFinishedCounted: false,
  forceMissingnoNextFinish: false,
  forceEggNextFinish: false,
  panelStyle: { ...DEFAULT_PANEL_STYLE },
};

function normalizeText(str, fallback = "") {
  const txt = (str || "").trim();
  if (!txt) return fallback;
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function inferGenerationFromDex(dex) {
  const n = Number(dex);
  if (!Number.isFinite(n) || n <= 0) return 0;

  const found = DEX_GENERATION_RANGES.find((r) => n >= r.min && n <= r.max);
  return found ? found.generation : 0;
}

function normalizeGeneration(rawGeneration, dex) {
  const n = Number(rawGeneration);
  if (Number.isFinite(n) && n >= 1 && n <= 9) {
    return Math.round(n);
  }

  const inferred = inferGenerationFromDex(dex);
  if (inferred > 0) {
    return inferred;
  }

  return 1;
}

function slug(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function getSpriteUrl(dex) {
  if (!Number.isFinite(dex) || dex <= 0) return "";
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`;
}

function toApiName(nombre) {
  return (nombre || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.'"]/g, "")
    .replace(/\s+/g, "-");
}

function normalizeCompare(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function fromApiDisplayName(apiName) {
  return (apiName || "")
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join("-");
}

async function fetchPokemonOficial(identifier) {
  const response = await fetch(`${POKEAPI_BASE}/${encodeURIComponent(identifier)}`);
  if (!response.ok) return null;
  return response.json();
}

async function validarSpriteOrigen(dex) {
  const spriteUrl = `${SPRITE_ORIGEN_BASE}/${dex}.png`;
  try {
    const head = await fetch(spriteUrl, { method: "HEAD" });
    if (head.ok) return true;
  } catch {
    // Se intenta con GET si HEAD falla en algun navegador/proxy.
  }

  try {
    const get = await fetch(spriteUrl, { method: "GET" });
    return get.ok;
  } catch {
    return false;
  }
}

async function validarPokemonReal(nuevo) {
  const tieneDex = Number.isFinite(nuevo.numeroDex) && nuevo.numeroDex > 0;
  const identifier = tieneDex ? String(nuevo.numeroDex) : toApiName(nuevo.nombre);

  let data;
  try {
    data = await fetchPokemonOficial(identifier);
  } catch {
    return { ok: false, mensaje: "No pude validar en PokeAPI. Revisa tu conexion a internet." };
  }

  if (!data) {
    return { ok: false, mensaje: "Ese Pokemon no existe en PokeAPI." };
  }

  const nombreApi = fromApiDisplayName(data.name);
  if (tieneDex) {
    const nombreIngresado = normalizeCompare(nuevo.nombre);
    const nombreOficial = normalizeCompare(nombreApi);
    if (nombreIngresado && nombreIngresado !== nombreOficial) {
      return {
        ok: false,
        mensaje: `El numero Dex ${nuevo.numeroDex} corresponde a ${nombreApi}, no a ${nuevo.nombre}.`,
      };
    }
  }

  const spriteValido = await validarSpriteOrigen(data.id);
  if (!spriteValido) {
    return { ok: false, mensaje: "No pude verificar el sprite oficial en la fuente de origen." };
  }

  return {
    ok: true,
    dexOficial: data.id,
    nombreOficial: nombreApi,
    generacionOficial: inferGenerationFromDex(data.id),
  };
}

function setLearningBusy(isBusy) {
  els.btnGuardarAprendizaje.disabled = isBusy;
  els.btnCancelarAprendizaje.disabled = isBusy;
  els.learnForm.querySelectorAll("input").forEach((input) => {
    input.disabled = isBusy;
  });
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeHexColor(value, fallback = DEFAULT_PANEL_STYLE.color) {
  const v = String(value || "").trim();
  const valid = /^#[0-9a-fA-F]{6}$/.test(v);
  return valid ? v.toLowerCase() : fallback;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex, "#000000");
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

function toHexChannel(value) {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
}

function rgbToHex(rgb) {
  return `#${toHexChannel(rgb.r)}${toHexChannel(rgb.g)}${toHexChannel(rgb.b)}`;
}

function shiftHexColor(hex, delta) {
  const rgb = hexToRgb(hex);
  return rgbToHex({
    r: rgb.r + delta,
    g: rgb.g + delta,
    b: rgb.b + delta,
  });
}

function getReadableTextColor(hex) {
  const rgb = hexToRgb(hex);
  const luminance = (0.299 * rgb.r) + (0.587 * rgb.g) + (0.114 * rgb.b);
  return luminance >= 150 ? "#111111" : "#ffffff";
}

function normalizePanelStyle(raw) {
  const color = normalizeHexColor(raw?.color, DEFAULT_PANEL_STYLE.color);
  const textColor = normalizeHexColor(raw?.textColor, DEFAULT_PANEL_STYLE.textColor);
  const buttonColor = normalizeHexColor(raw?.buttonColor, DEFAULT_PANEL_STYLE.buttonColor);
  const opacityNum = Number(raw?.opacity);
  const opacity = Number.isFinite(opacityNum) ? clamp(Math.round(opacityNum), 0, 100) : DEFAULT_PANEL_STYLE.opacity;
  return { color, opacity, textColor, buttonColor };
}

function applyPanelStyle(rawStyle) {
  const style = normalizePanelStyle(rawStyle);
  state.panelStyle = style;

  const rgb = hexToRgb(style.color);
  const alpha = style.opacity / 100;
  const borderAlpha = Math.min(1, alpha + 0.2);
  const shadowAlpha = Math.min(0.32, 0.08 + (alpha * 0.24));
  const textRgb = hexToRgb(style.textColor);
  const btnPrimary = style.buttonColor;
  const btnPrimaryHover = shiftHexColor(style.buttonColor, -24);
  const btnSecondary = shiftHexColor(style.buttonColor, -44);
  const btnSecondaryHover = shiftHexColor(style.buttonColor, -64);
  const btnGhost = shiftHexColor(style.buttonColor, 88);
  const btnGhostHover = shiftHexColor(style.buttonColor, 68);

  document.documentElement.style.setProperty("--panel-bg", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`);
  document.documentElement.style.setProperty("--panel-border-color", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${borderAlpha.toFixed(2)})`);
  document.documentElement.style.setProperty("--panel-shadow", `0 10px 25px rgba(0, 0, 0, ${shadowAlpha.toFixed(2)})`);
  document.documentElement.style.setProperty("--text", style.textColor);
  document.documentElement.style.setProperty("--muted", `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.72)`);
  document.documentElement.style.setProperty("--btn-primary-bg", btnPrimary);
  document.documentElement.style.setProperty("--btn-primary-hover", btnPrimaryHover);
  document.documentElement.style.setProperty("--btn-primary-text", getReadableTextColor(btnPrimary));
  document.documentElement.style.setProperty("--btn-secondary-bg", btnSecondary);
  document.documentElement.style.setProperty("--btn-secondary-hover", btnSecondaryHover);
  document.documentElement.style.setProperty("--btn-secondary-text", getReadableTextColor(btnSecondary));
  document.documentElement.style.setProperty("--btn-ghost-bg", btnGhost);
  document.documentElement.style.setProperty("--btn-ghost-hover", btnGhostHover);
  document.documentElement.style.setProperty("--btn-ghost-text", getReadableTextColor(btnGhost));

  if (els.panelColor) {
    els.panelColor.value = style.color;
  }
  if (els.textColor) {
    els.textColor.value = style.textColor;
  }
  if (els.buttonColor) {
    els.buttonColor.value = style.buttonColor;
  }
  if (els.panelOpacity) {
    els.panelOpacity.value = String(style.opacity);
  }
  if (els.panelOpacityValue) {
    els.panelOpacityValue.textContent = `${style.opacity}%`;
  }

  return style;
}

function loadPanelStyle() {
  const saved = readJson(STORAGE_KEYS.panelStyle, DEFAULT_PANEL_STYLE);
  applyPanelStyle(saved);
}

function persistCurrentPanelStyle() {
  writeJson(STORAGE_KEYS.panelStyle, state.panelStyle);
}

function getAppearanceStyleFromInputs() {
  return {
    color: els.panelColor?.value || DEFAULT_PANEL_STYLE.color,
    textColor: els.textColor?.value || DEFAULT_PANEL_STYLE.textColor,
    buttonColor: els.buttonColor?.value || DEFAULT_PANEL_STYLE.buttonColor,
    opacity: Number(els.panelOpacity?.value || DEFAULT_PANEL_STYLE.opacity),
  };
}

function applyBackgroundChoice(choice) {
  document.body.classList.remove("has-custom-bg");
  document.body.style.removeProperty("--custom-bg-url");

  const presetUrl = BACKGROUND_PRESETS[choice];
  if (presetUrl) {
    document.body.style.setProperty("--custom-bg-url", `url("${presetUrl}")`);
    document.body.classList.add("has-custom-bg");
    return choice;
  }

  return "default";
}

function loadBackgroundChoice() {
  const saved = localStorage.getItem(STORAGE_KEYS.backgroundChoice) || "default";
  const applied = applyBackgroundChoice(saved);

  if (els.bgSelect) {
    els.bgSelect.value = applied;
  }
}

function openAppearanceModal() {
  if (!els.appearanceModal) return;
  els.appearanceModal.classList.remove("hidden");
}

function closeAppearanceModal() {
  if (!els.appearanceModal) return;
  els.appearanceModal.classList.add("hidden");
}

function loadAdminState() {
  const loadedSettings = readJson(STORAGE_KEYS.adminSettings, DEFAULT_ADMIN_SETTINGS);
  const loadedStats = readJson(STORAGE_KEYS.adminStats, DEFAULT_ADMIN_STATS);
  state.adminSettings = { ...DEFAULT_ADMIN_SETTINGS, ...loadedSettings };
  state.adminStats = { ...DEFAULT_ADMIN_STATS, ...loadedStats };
}

function saveAdminSettings() {
  writeJson(STORAGE_KEYS.adminSettings, state.adminSettings);
}

function saveAdminStats() {
  writeJson(STORAGE_KEYS.adminStats, state.adminStats);
}

function renderQuestionStatsText() {
  const entries = Object.entries(state.stats);
  if (!entries.length) {
    return "Sin datos.";
  }

  const sorted = entries.sort((a, b) => {
    const usadasA = Number(a[1]?.usadas || 0);
    const usadasB = Number(b[1]?.usadas || 0);
    return usadasB - usadasA;
  });

  return sorted
    .slice(0, 30)
    .map(([id, st]) => {
      const usadas = Number(st?.usadas || 0);
      const descartados = Number(st?.descartados || 0);
      const promedio = usadas > 0 ? (descartados / usadas).toFixed(2) : "0.00";
      return `${id}: usadas=${usadas}, descartados=${descartados}, prom=${promedio}`;
    })
    .join("\n");
}

function renderAdminPanel() {
  if (!els.adminPanel || !els.btnAdminLogin) return;

  if (state.isAdmin) {
    els.adminPanel.classList.remove("hidden");
    els.btnAdminLogin.textContent = "Cerrar sesion admin";
    els.chkMissingnoEnabled.checked = !!state.adminSettings.missingnoEnabled;
    els.chkEggEnabled.checked = !!state.adminSettings.eggEnabled;
    els.statGamesFinished.textContent = String(state.adminStats.gamesFinished);
    els.statMissingnoTriggered.textContent = String(state.adminStats.missingnoTriggered);
    els.statEggTriggered.textContent = String(state.adminStats.eggTriggered);
    els.questionStatsView.textContent = renderQuestionStatsText();
    return;
  }

  els.adminPanel.classList.add("hidden");
  els.btnAdminLogin.textContent = "Iniciar sesion";
}

function openAdminLoginModal() {
  if (!els.adminLoginModal) return;
  els.adminLoginError.classList.add("hidden");
  els.adminUser.value = "";
  els.adminPass.value = "";
  els.adminLoginModal.classList.remove("hidden");
  els.adminUser.focus();
}

function closeAdminLoginModal() {
  if (!els.adminLoginModal) return;
  els.adminLoginModal.classList.add("hidden");
}

function handleAdminLoginSubmit(ev) {
  ev.preventDefault();
  const user = (els.adminUser.value || "").trim();
  const pass = els.adminPass.value || "";

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
    state.isAdmin = true;
    closeAdminLoginModal();
    renderAdminPanel();
    return;
  }

  els.adminLoginError.classList.remove("hidden");
}

function logoutAdmin() {
  state.isAdmin = false;
  renderAdminPanel();
}

function markGameFinished() {
  if (state.gameFinishedCounted) return;
  state.gameFinishedCounted = true;
  state.adminStats.gamesFinished += 1;
  saveAdminStats();
  renderAdminPanel();
}

function getDefaultRasgo(nombre) {
  if (!nombre) return "Sin rasgo";
  const key = nombre.toLowerCase();
  return BASE_RASGO_BY_NAME[key] || `Rasgo de ${nombre}`;
}

function sanitizePokemon(raw) {
  const nombre = normalizeText(raw.nombre, "");
  const numeroDex = Math.max(0, Number(raw.numeroDex) || 0);
  return {
    nombre,
    tipo: normalizeText(raw.tipo, "Normal"),
    generacion: normalizeGeneration(raw.generacion, numeroDex),
    tipoSecundario: normalizeText(raw.tipoSecundario, "Ninguno"),
    color: normalizeText(raw.color, "Desconocido"),
    habitat: normalizeText(raw.habitat, "Desconocido"),
    rasgo: normalizeText(raw.rasgo, getDefaultRasgo(nombre)),
    esEvolucion: !!raw.esEvolucion,
    numeroDex,
  };
}

function featureSignature(p) {
  return [
    Number(p.generacion || 1),
    p.tipo.toLowerCase(),
    p.tipoSecundario.toLowerCase(),
    p.color.toLowerCase(),
    p.habitat.toLowerCase(),
    p.rasgo.toLowerCase(),
    p.esEvolucion ? "1" : "0",
  ].join("|");
}

function loadData() {
  const learned = readJson(STORAGE_KEYS.learnedPokemon, []);
  state.stats = readJson(STORAGE_KEYS.questionStats, {});

  const map = new Map();
  [...BASE_POKEMON, ...learned]
    .map(sanitizePokemon)
    .forEach((p) => map.set(p.nombre.toLowerCase(), p));
  state.allPokemon = Array.from(map.values());
}

function buildQuestions() {
  const generaciones = new Set();
  const tipos = new Set();
  const tiposSec = new Set();
  const colores = new Set();
  const habitats = new Set();
  const rasgos = new Set();

  state.allPokemon.forEach((p) => {
    generaciones.add(Number(p.generacion || 1));
    tipos.add(p.tipo);
    tiposSec.add(p.tipoSecundario);
    colores.add(p.color);
    habitats.add(p.habitat);
    rasgos.add(p.rasgo);
  });

  const q = [];
  [...generaciones]
    .filter((g) => Number.isFinite(g) && g > 0)
    .sort((a, b) => a - b)
    .forEach((generacion) => {
      q.push({
        id: `generacion_${generacion}`,
        texto: `Es de la generacion ${generacion}?`,
        coincide: (p) => Number(p.generacion || 1) === generacion,
      });
    });

  [...tipos].sort().forEach((tipo) => {
    q.push({
      id: `tipo_${slug(tipo)}`,
      texto: `Es tipo ${tipo}?`,
      coincide: (p) => p.tipo.toLowerCase() === tipo.toLowerCase(),
    });
  });

  q.push({
    id: "tiene_tipo_secundario",
    texto: "Tiene tipo secundario?",
    coincide: (p) => p.tipoSecundario.toLowerCase() !== "ninguno",
  });

  [...tiposSec].sort().forEach((tipoSec) => {
    q.push({
      id: `tipo_sec_${slug(tipoSec)}`,
      texto: `Su tipo secundario es ${tipoSec}?`,
      coincide: (p) => p.tipoSecundario.toLowerCase() === tipoSec.toLowerCase(),
    });
  });

  q.push({
    id: "es_evolucion",
    texto: "Es evolucion?",
    coincide: (p) => !!p.esEvolucion,
  });

  [...colores].sort().forEach((color) => {
    q.push({
      id: `color_${slug(color)}`,
      texto: `Es color ${color}?`,
      coincide: (p) => p.color.toLowerCase() === color.toLowerCase(),
    });
  });

  [...habitats].sort().forEach((habitat) => {
    q.push({
      id: `habitat_${slug(habitat)}`,
      texto: `Vive en ${habitat.toLowerCase()}?`,
      coincide: (p) => p.habitat.toLowerCase() === habitat.toLowerCase(),
    });
  });

  [...rasgos].sort().forEach((rasgo) => {
    q.push({
      id: `rasgo_${slug(rasgo)}`,
      texto: `Su rasgo distintivo es "${rasgo}"?`,
      coincide: (p) => p.rasgo.toLowerCase() === rasgo.toLowerCase(),
    });
  });

  q.push({
    id: "nombre_vocal",
    texto: "Su nombre empieza con vocal?",
    coincide: (p) => /^[aeiou]/i.test(p.nombre),
  });

  q.push({
    id: "nombre_largo",
    texto: "Su nombre tiene 7 o mas letras?",
    coincide: (p) => p.nombre.length >= 7,
  });

  state.preguntas = q;
}

function getQuestionStat(questionId) {
  return state.stats[questionId] || { usadas: 0, descartados: 0 };
}

function saveQuestionStats() {
  writeJson(STORAGE_KEYS.questionStats, state.stats);
}

function recordQuestionResult(questionId, antes, despues) {
  const stat = getQuestionStat(questionId);
  stat.usadas += 1;
  stat.descartados += Math.max(0, antes - despues);
  state.stats[questionId] = stat;
  saveQuestionStats();
  renderAdminPanel();
}

function pickBestQuestion() {
  let best = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  state.preguntas.forEach((pregunta) => {
    if (state.usadas.has(pregunta.id)) return;

    let si = 0;
    let no = 0;
    state.candidatos.forEach((p) => (pregunta.coincide(p) ? si++ : no++));

    if (si === 0 || no === 0) return;

    const descarteSeguro = Math.min(si, no);
    const equilibrio = 1 - Math.abs(si - no) / (si + no);
    const stat = getQuestionStat(pregunta.id);
    const historico = stat.usadas > 0 ? stat.descartados / stat.usadas : 0;
    const puntaje = descarteSeguro + equilibrio + historico * 0.2;

    if (puntaje > bestScore) {
      bestScore = puntaje;
      best = pregunta;
    }
  });

  return best;
}

function applyAnswer(isYes) {
  if (!state.preguntaActual) return;

  const antes = state.candidatos.length;
  state.candidatos = state.candidatos.filter((p) =>
    isYes ? state.preguntaActual.coincide(p) : !state.preguntaActual.coincide(p)
  );
  const despues = state.candidatos.length;

  state.usadas.add(state.preguntaActual.id);
  recordQuestionResult(state.preguntaActual.id, antes, despues);

  renderGame();
}

function showOnly(section) {
  if (section !== els.resultCard) {
    setPageGlitch(false);
    stopMissingnoAudio();
    stopEggThemeAudio();
  }
  [els.questionCard, els.resultCard, els.learnCard].forEach((el) => el.classList.add("hidden"));
  section.classList.remove("hidden");
}

function setImageForPokemon(pokemon) {
  const url = getSpriteUrl(Number(pokemon.numeroDex));
  if (!url) {
    els.pokemonImage.classList.add("hidden");
    els.pokemonImage.removeAttribute("src");
    return;
  }

  els.pokemonImage.src = url;
  els.pokemonImage.classList.remove("hidden");
}

function formatSeconds(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const min = Math.floor(safe / 60);
  const sec = safe % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function playCatMeow() {
  if (!CAT_SOUND_FILES.length) return;
  const randomPath = CAT_SOUND_FILES[Math.floor(Math.random() * CAT_SOUND_FILES.length)];

  try {
    if (state.activeCatAudio) {
      state.activeCatAudio.pause();
      state.activeCatAudio.currentTime = 0;
    }
  } catch {
    // No-op
  }

  try {
    const audio = new Audio(randomPath);
    state.activeCatAudio = audio;
    const promise = audio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // Puede bloquearse por politica de autoplay.
      });
    }
  } catch {
    // No-op
  }
}

function playEggThemeAudio() {
  if (!els.eggThemeAudio) return;
  try {
    els.eggThemeAudio.currentTime = 0;
    const promise = els.eggThemeAudio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // Puede bloquearse por politica de autoplay.
      });
    }
  } catch {
    // No-op
  }
}

function stopEggThemeAudio() {
  if (!els.eggThemeAudio) return;
  try {
    els.eggThemeAudio.pause();
    els.eggThemeAudio.currentTime = 0;
  } catch {
    // No-op
  }
}

function stopCatMeowAudio() {
  if (!state.activeCatAudio) return;
  try {
    state.activeCatAudio.pause();
    state.activeCatAudio.currentTime = 0;
  } catch {
    // No-op
  }
  state.activeCatAudio = null;
}

function deactivateEggEvent() {
  state.eggActive = false;
  state.eggHatched = false;
  state.eggEndsAt = 0;
  state.eggChecked = false;
  if (state.eggTimerIntervalId) {
    clearInterval(state.eggTimerIntervalId);
    state.eggTimerIntervalId = null;
  }
  if (els.eggTimer) {
    els.eggTimer.textContent = "10:00";
  }
  if (els.eggMessage) {
    els.eggMessage.textContent = "An egg has appeared.";
  }
  if (els.eggEvent) {
    els.eggEvent.classList.add("hidden");
  }
  stopEggThemeAudio();
  stopCatMeowAudio();
}

function updateEggCountdownView() {
  if (!state.eggActive) return;

  const secondsLeft = Math.ceil((state.eggEndsAt - Date.now()) / 1000);
  if (secondsLeft <= 0) {
    state.eggHatched = true;
    state.eggActive = false;
    if (state.eggTimerIntervalId) {
      clearInterval(state.eggTimerIntervalId);
      state.eggTimerIntervalId = null;
    }
    if (els.eggTimer) {
      els.eggTimer.textContent = "00:00";
    }
    if (els.eggMessage) {
      els.eggMessage.textContent = "left home due to happiness.";
    }
    stopEggThemeAudio();
    return;
  }

  if (els.eggTimer) {
    els.eggTimer.textContent = formatSeconds(secondsLeft);
  }
}

function startEggCountdown() {
  state.eggActive = true;
  state.eggHatched = false;
  state.eggEndsAt = Date.now() + (EGG_COUNTDOWN_SECONDS * 1000);

  if (els.eggEvent) {
    els.eggEvent.classList.remove("hidden");
  }
  if (els.eggImage) {
    els.eggImage.classList.remove("hidden");
  }
  if (els.eggMessage) {
    els.eggMessage.textContent = "A strange egg is incubating...";
  }

  if (state.eggTimerIntervalId) {
    clearInterval(state.eggTimerIntervalId);
  }
  updateEggCountdownView();
  state.eggTimerIntervalId = setInterval(updateEggCountdownView, 1000);

  playCatMeow();
  playEggThemeAudio();
}

function maybeTriggerEggOnQuestionnaireEnd() {
  if (!state.adminSettings.eggEnabled) {
    return false;
  }
  if (state.forceEggNextFinish) {
    state.forceEggNextFinish = false;
    state.adminStats.eggTriggered += 1;
    saveAdminStats();
    renderAdminPanel();
    startEggCountdown();
    return true;
  }
  if (state.eggChecked) {
    return state.eggActive || state.eggHatched;
  }
  state.eggChecked = true;

  if (state.eggActive) {
    return true;
  }

  const triggered = Math.floor(Math.random() * EGG_CHANCE_DENOMINATOR) === 0;
  if (triggered) {
    state.adminStats.eggTriggered += 1;
    saveAdminStats();
    renderAdminPanel();
    startEggCountdown();
    return true;
  }

  return false;
}

function stopMissingnoAudio() {
  if (!els.missingnoAudio) return;
  try {
    els.missingnoAudio.pause();
    els.missingnoAudio.currentTime = 0;
  } catch {
    // No-op
  }
}

function setPageGlitch(active) {
  if (!document || !document.body) return;
  if (active) {
    document.body.classList.add("glitch-active");
    return;
  }
  document.body.classList.remove("glitch-active");
}

function playMissingnoAudio() {
  if (!els.missingnoAudio) return;
  try {
    els.missingnoAudio.currentTime = 0;
    const promise = els.missingnoAudio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // El navegador puede bloquear autoplay si no hay gesto de usuario.
      });
    }
  } catch {
    // No-op
  }
}

function shouldActivateMissingno() {
  if (!state.missingnoChecked) {
    state.missingnoChecked = true;
    state.missingnoActive = Math.floor(Math.random() * MISSINGNO_CHANCE_DENOMINATOR) === 0;
  }
  return state.missingnoActive;
}

function showMissingnoEvent() {
  showOnly(els.resultCard);
  els.resultTitle.textContent = "ERROR ???";
  els.resultText.textContent = "Aparecio MISSINGNO. (1/20)";
  els.pokemonImage.src = MISSINGNO_IMAGE_PATH;
  els.pokemonImage.classList.remove("hidden");
  els.btnCorrecto.classList.add("hidden");
  els.btnIncorrecto.classList.add("hidden");
  setPageGlitch(true);
  playMissingnoAudio();
}

function maybeTriggerMissingnoOnEnd() {
  if (!state.adminSettings.missingnoEnabled) return false;
  if (state.forceMissingnoNextFinish) {
    state.forceMissingnoNextFinish = false;
    state.missingnoChecked = true;
    state.missingnoActive = true;
  }
  if (!shouldActivateMissingno()) return false;
  state.adminStats.missingnoTriggered += 1;
  saveAdminStats();
  renderAdminPanel();
  showMissingnoEvent();
  return true;
}

function renderGame() {
  const total = state.candidatos.length;
  els.statusText.textContent = `${total} candidato(s) restante(s).`;

  if (total > 1) {
    showOnly(els.questionCard);
    els.btnCorrecto.classList.add("hidden");
    els.btnIncorrecto.classList.add("hidden");

    state.preguntaActual = pickBestQuestion();
    if (!state.preguntaActual) {
      showResultList("No pude cerrar en uno solo.", state.candidatos);
      return;
    }

    els.questionText.textContent = state.preguntaActual.texto;
    return;
  }

  if (total === 1) {
    markGameFinished();
    maybeTriggerEggOnQuestionnaireEnd();
    if (maybeTriggerMissingnoOnEnd()) {
      return;
    }
    state.ultimoCandidato = state.candidatos[0];
    showOnly(els.resultCard);
    els.resultTitle.textContent = "Confirmacion final";
    els.resultText.textContent = `Creo que es ${state.ultimoCandidato.nombre}. Es correcto?`;
    setImageForPokemon(state.ultimoCandidato);
    els.btnCorrecto.classList.remove("hidden");
    els.btnIncorrecto.classList.remove("hidden");
    return;
  }

  markGameFinished();
  maybeTriggerEggOnQuestionnaireEnd();
  if (maybeTriggerMissingnoOnEnd()) {
    return;
  }

  showOnly(els.resultCard);
  els.resultTitle.textContent = "Sin resultados";
  els.resultText.textContent = "No encontre un Pokemon con esas respuestas.";
  els.pokemonImage.classList.add("hidden");
  els.btnCorrecto.classList.add("hidden");
  els.btnIncorrecto.classList.add("hidden");
}

function showResultList(title, lista) {
  markGameFinished();
  maybeTriggerEggOnQuestionnaireEnd();
  if (maybeTriggerMissingnoOnEnd()) {
    return;
  }
  showOnly(els.resultCard);
  els.resultTitle.textContent = title;
  els.resultText.textContent = lista.map((p) => `- ${p.nombre}`).join("\n");
  els.pokemonImage.classList.add("hidden");
  els.btnCorrecto.classList.add("hidden");
  els.btnIncorrecto.classList.add("hidden");
}

function restartGame() {
  setPageGlitch(false);
  stopMissingnoAudio();
  stopCatMeowAudio();
  state.candidatos = [...state.allPokemon];
  state.usadas = new Set();
  state.preguntaActual = null;
  state.ultimoCandidato = null;
  state.missingnoChecked = false;
  state.missingnoActive = false;
  state.eggChecked = false;
  state.gameFinishedCounted = false;
  state.forceMissingnoNextFinish = false;
  state.forceEggNextFinish = false;
  renderGame();
}

function startLearningForm() {
  if (!state.ultimoCandidato) return;
  showOnly(els.learnCard);
  els.nuevoNombre.value = "";
  els.nuevoTipo.value = "";
  els.nuevoGeneracion.value = "2";
  els.nuevoTipoSec.value = "Ninguno";
  els.nuevoColor.value = "";
  els.nuevoHabitat.value = "";
  els.nuevoRasgo.value = "";
  els.nuevoEsEvolucion.checked = false;
  els.nuevoDex.value = "0";
  els.nuevoNombre.focus();
}

async function saveLearnedPokemon(ev) {
  ev.preventDefault();
  const nombre = normalizeText(els.nuevoNombre.value);
  if (!nombre) return;

  const exists = state.allPokemon.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
  if (exists) {
    alert("Ese Pokemon ya existe en la lista.");
    return;
  }

  const nuevo = {
    nombre,
    tipo: normalizeText(els.nuevoTipo.value, "Normal"),
    generacion: normalizeGeneration(els.nuevoGeneracion.value, Number(els.nuevoDex.value) || 0),
    tipoSecundario: normalizeText(els.nuevoTipoSec.value, "Ninguno"),
    color: normalizeText(els.nuevoColor.value, "Desconocido"),
    habitat: normalizeText(els.nuevoHabitat.value, "Desconocido"),
    rasgo: normalizeText(els.nuevoRasgo.value, `Rasgo de ${nombre}`),
    esEvolucion: !!els.nuevoEsEvolucion.checked,
    numeroDex: Math.max(0, Number(els.nuevoDex.value) || 0),
  };

  setLearningBusy(true);
  const validacion = await validarPokemonReal(nuevo);
  setLearningBusy(false);
  if (!validacion.ok) {
    alert(validacion.mensaje);
    return;
  }

  nuevo.numeroDex = validacion.dexOficial;
  const generacionOficial = Number(validacion.generacionOficial || 0);
  let generacionAjustada = false;
  if (generacionOficial > 0) {
    generacionAjustada = Number(nuevo.generacion) !== generacionOficial;
    nuevo.generacion = generacionOficial;
  }
  if (normalizeCompare(validacion.nombreOficial) === normalizeCompare(nuevo.nombre)) {
    nuevo.nombre = validacion.nombreOficial;
  }

  const existsAfterValidation = state.allPokemon.some(
    (p) => p.nombre.toLowerCase() === nuevo.nombre.toLowerCase()
  );
  if (existsAfterValidation) {
    alert("Ese Pokemon ya existe en la lista.");
    return;
  }

  const duplicatedByFeatures = state.allPokemon.some(
    (p) => featureSignature(p) === featureSignature(nuevo)
  );
  if (duplicatedByFeatures) {
    alert("Ya existe un Pokemon con esas mismas caracteristicas. Cambia el rasgo distintivo.");
    return;
  }

  const learned = readJson(STORAGE_KEYS.learnedPokemon, []);
  learned.push(nuevo);
  writeJson(STORAGE_KEYS.learnedPokemon, learned);

  loadData();
  buildQuestions();
  restartGame();
  const ajusteGeneracionTexto = generacionAjustada
    ? ` Se ajusto a Gen ${nuevo.generacion} segun su Dex oficial.`
    : "";
  alert(`Aprendi a ${nuevo.nombre} (Dex ${nuevo.numeroDex}, Gen ${nuevo.generacion}). Ya se usa en el juego.${ajusteGeneracionTexto}`);
}

function wireEvents() {
  if (els.btnOpenAppearance) {
    els.btnOpenAppearance.addEventListener("click", openAppearanceModal);
  }
  if (els.btnCloseAppearance) {
    els.btnCloseAppearance.addEventListener("click", closeAppearanceModal);
  }
  if (els.appearanceModal) {
    els.appearanceModal.addEventListener("click", (ev) => {
      if (ev.target === els.appearanceModal) {
        closeAppearanceModal();
      }
    });
  }

  if (els.bgSelect) {
    els.bgSelect.addEventListener("change", () => {
      const applied = applyBackgroundChoice(els.bgSelect.value);
      localStorage.setItem(STORAGE_KEYS.backgroundChoice, applied);
      if (els.bgSelect.value !== applied) {
        els.bgSelect.value = applied;
      }
    });
  }

  if (els.panelColor) {
    els.panelColor.addEventListener("input", () => {
      applyPanelStyle(getAppearanceStyleFromInputs());
      persistCurrentPanelStyle();
    });
  }

  if (els.textColor) {
    els.textColor.addEventListener("input", () => {
      applyPanelStyle(getAppearanceStyleFromInputs());
      persistCurrentPanelStyle();
    });
  }

  if (els.buttonColor) {
    els.buttonColor.addEventListener("input", () => {
      applyPanelStyle(getAppearanceStyleFromInputs());
      persistCurrentPanelStyle();
    });
  }

  if (els.panelOpacity) {
    els.panelOpacity.addEventListener("input", () => {
      applyPanelStyle(getAppearanceStyleFromInputs());
      persistCurrentPanelStyle();
    });
  }

  if (els.btnResetPanelStyle) {
    els.btnResetPanelStyle.addEventListener("click", () => {
      applyPanelStyle(DEFAULT_PANEL_STYLE);
      persistCurrentPanelStyle();
    });
  }

  els.btnAdminLogin.addEventListener("click", () => {
    if (state.isAdmin) {
      logoutAdmin();
      return;
    }
    openAdminLoginModal();
  });
  els.adminLoginForm.addEventListener("submit", handleAdminLoginSubmit);
  els.btnAdminCancel.addEventListener("click", closeAdminLoginModal);
  els.adminLoginModal.addEventListener("click", (ev) => {
    if (ev.target === els.adminLoginModal) {
      closeAdminLoginModal();
    }
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      closeAdminLoginModal();
      closeAppearanceModal();
    }
  });
  els.chkMissingnoEnabled.addEventListener("change", () => {
    state.adminSettings.missingnoEnabled = !!els.chkMissingnoEnabled.checked;
    state.missingnoChecked = false;
    state.missingnoActive = false;
    if (state.adminSettings.missingnoEnabled) {
      state.forceMissingnoNextFinish = true;
    } else {
      state.forceMissingnoNextFinish = false;
      stopMissingnoAudio();
    }
    saveAdminSettings();
    renderAdminPanel();
    renderGame();
  });
  els.chkEggEnabled.addEventListener("change", () => {
    state.adminSettings.eggEnabled = !!els.chkEggEnabled.checked;
    state.eggChecked = false;
    if (state.adminSettings.eggEnabled) {
      state.forceEggNextFinish = true;
    } else {
      state.forceEggNextFinish = false;
      deactivateEggEvent();
    }
    saveAdminSettings();
    renderAdminPanel();
    renderGame();
  });

  els.btnSi.addEventListener("click", () => applyAnswer(true));
  els.btnNo.addEventListener("click", () => applyAnswer(false));
  els.btnReiniciar.addEventListener("click", restartGame);
  els.btnJugarOtra.addEventListener("click", restartGame);
  els.btnCorrecto.addEventListener("click", () => {
    alert(`Genial. Adivine: ${state.ultimoCandidato?.nombre || ""}`);
    restartGame();
  });
  els.btnIncorrecto.addEventListener("click", startLearningForm);
  els.learnForm.addEventListener("submit", saveLearnedPokemon);
  els.btnCancelarAprendizaje.addEventListener("click", () => renderGame());
  if (els.eggImage) {
    els.eggImage.addEventListener("click", playCatMeow);
  }
}

function init() {
  loadBackgroundChoice();
  loadPanelStyle();
  loadAdminState();
  loadData();
  buildQuestions();
  wireEvents();
  renderAdminPanel();
  setPageGlitch(false);
  restartGame();
}

init();
