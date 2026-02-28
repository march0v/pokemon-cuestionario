const STORAGE_KEYS = {
  learnedPokemon: "pokemon.learned.v1",
  questionStats: "pokemon.questionStats.v1",
  adminSettings: "pokemon.admin.settings.v1",
  adminStats: "pokemon.admin.stats.v1",
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
  "pokemon/cat-3.mp3",
];
const DEFAULT_ADMIN_SETTINGS = {
  missingnoEnabled: true,
  eggEnabled: true,
};
const DEFAULT_ADMIN_STATS = {
  gamesFinished: 0,
  missingnoTriggered: 0,
  eggTriggered: 0,
};

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
};

function normalizeText(str, fallback = "") {
  const txt = (str || "").trim();
  if (!txt) return fallback;
  return txt.charAt(0).toUpperCase() + txt.slice(1);
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

  return { ok: true, dexOficial: data.id, nombreOficial: nombreApi };
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
  return {
    nombre,
    tipo: normalizeText(raw.tipo, "Normal"),
    tipoSecundario: normalizeText(raw.tipoSecundario, "Ninguno"),
    color: normalizeText(raw.color, "Desconocido"),
    habitat: normalizeText(raw.habitat, "Desconocido"),
    rasgo: normalizeText(raw.rasgo, getDefaultRasgo(nombre)),
    esEvolucion: !!raw.esEvolucion,
    numeroDex: Math.max(0, Number(raw.numeroDex) || 0),
  };
}

function featureSignature(p) {
  return [
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
  const tipos = new Set();
  const tiposSec = new Set();
  const colores = new Set();
  const habitats = new Set();
  const rasgos = new Set();

  state.allPokemon.forEach((p) => {
    tipos.add(p.tipo);
    tiposSec.add(p.tipoSecundario);
    colores.add(p.color);
    habitats.add(p.habitat);
    rasgos.add(p.rasgo);
  });

  const q = [];
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
  alert(`Aprendi a ${nuevo.nombre} (Dex ${nuevo.numeroDex}). Ya se usa en el juego.`);
}

function wireEvents() {
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
  loadAdminState();
  loadData();
  buildQuestions();
  wireEvents();
  renderAdminPanel();
  setPageGlitch(false);
  restartGame();
}

init();
