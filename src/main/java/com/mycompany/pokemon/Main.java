package com.mycompany.pokemon;

import java.awt.Image;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;

// CLASE PADRE
class Pokemon {
    String nombre;
    String tipo;
    String tipoSecundario;
    String color;
    String habitat;
    boolean esEvolucion;
    int numeroDex;

    public Pokemon(
            String nombre,
            String tipo,
            String tipoSecundario,
            String color,
            String habitat,
            boolean esEvolucion,
            int numeroDex
    ) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.tipoSecundario = tipoSecundario;
        this.color = color;
        this.habitat = habitat;
        this.esEvolucion = esEvolucion;
        this.numeroDex = numeroDex;
    }

    public String getSpriteUrl() {
        if (numeroDex <= 0) {
            return null;
        }
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + numeroDex + ".png";
    }

    public String getNombreArchivoLocal() {
        return "/pokemon/" + nombre.toLowerCase().replace(" ", "_") + ".png";
    }
}

// HERENCIA PARA PREGUNTAS INTELIGENTES
abstract class PreguntaInteligente {
    String id;
    String texto;
    int vecesUsada;
    int totalDescartados;

    public PreguntaInteligente(String id, String texto) {
        this.id = id;
        this.texto = texto;
    }

    public abstract boolean coincide(Pokemon p);

    public void registrarResultado(int antes, int despues) {
        vecesUsada++;
        totalDescartados += Math.max(0, antes - despues);
    }

    public double aprendizajeHistorico() {
        if (vecesUsada == 0) {
            return 0.0;
        }
        return (double) totalDescartados / vecesUsada;
    }

    public void cargarHistorial(int usadas, int descartados) {
        this.vecesUsada = Math.max(0, usadas);
        this.totalDescartados = Math.max(0, descartados);
    }
}

abstract class PreguntaPorAtributo extends PreguntaInteligente {
    String valor;

    public PreguntaPorAtributo(String id, String texto, String valor) {
        super(id, texto);
        this.valor = valor;
    }
}

class PreguntaTipo extends PreguntaPorAtributo {
    public PreguntaTipo(String id, String texto, String valor) {
        super(id, texto, valor);
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.tipo.equalsIgnoreCase(valor);
    }
}

class PreguntaTipoSecundario extends PreguntaPorAtributo {
    public PreguntaTipoSecundario(String id, String texto, String valor) {
        super(id, texto, valor);
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.tipoSecundario.equalsIgnoreCase(valor);
    }
}

class PreguntaColor extends PreguntaPorAtributo {
    public PreguntaColor(String id, String texto, String valor) {
        super(id, texto, valor);
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.color.equalsIgnoreCase(valor);
    }
}

class PreguntaHabitat extends PreguntaPorAtributo {
    public PreguntaHabitat(String id, String texto, String valor) {
        super(id, texto, valor);
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.habitat.equalsIgnoreCase(valor);
    }
}

class PreguntaNombreVocal extends PreguntaInteligente {
    public PreguntaNombreVocal(String id, String texto) {
        super(id, texto);
    }

    @Override
    public boolean coincide(Pokemon p) {
        char inicial = Character.toLowerCase(p.nombre.charAt(0));
        return inicial == 'a' || inicial == 'e' || inicial == 'i' || inicial == 'o' || inicial == 'u';
    }
}

class PreguntaNombreLargo extends PreguntaInteligente {
    int minimo;

    public PreguntaNombreLargo(String id, String texto, int minimo) {
        super(id, texto);
        this.minimo = minimo;
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.nombre.length() >= minimo;
    }
}

class PreguntaTieneTipoSecundario extends PreguntaInteligente {
    public PreguntaTieneTipoSecundario(String id, String texto) {
        super(id, texto);
    }

    @Override
    public boolean coincide(Pokemon p) {
        return !p.tipoSecundario.equalsIgnoreCase("Ninguno");
    }
}

class PreguntaEvolucion extends PreguntaInteligente {
    boolean valorEsperado;

    public PreguntaEvolucion(String id, String texto, boolean valorEsperado) {
        super(id, texto);
        this.valorEsperado = valorEsperado;
    }

    @Override
    public boolean coincide(Pokemon p) {
        return p.esEvolucion == valorEsperado;
    }
}

// CLASE HIJA (HERENCIA)
class JuegoAdivinar extends Pokemon {
    private static final String ARCHIVO_APRENDIZAJE = "preguntas_stats.csv";
    private static final String ARCHIVO_POKEMONES_APRENDIDOS = "pokemones_aprendidos.csv";

    ArrayList<Pokemon> pokemones = new ArrayList<>();
    ArrayList<PreguntaInteligente> preguntas = new ArrayList<>();

    public JuegoAdivinar() {
        super("", "", "", "", "", false, 0);
        cargarPokemonesBase();
        cargarPokemonesAprendidos();
        recargarPreguntas();
    }

    private void cargarPokemonesBase() {
        pokemones.add(new Pokemon("Pikachu", "Electrico", "Ninguno", "Amarillo", "Bosque", true, 25));
        pokemones.add(new Pokemon("Raichu", "Electrico", "Ninguno", "Naranja", "Bosque", true, 26));
        pokemones.add(new Pokemon("Charmander", "Fuego", "Ninguno", "Naranja", "Montana", false, 4));
        pokemones.add(new Pokemon("Charmeleon", "Fuego", "Ninguno", "Rojo", "Montana", true, 5));
        pokemones.add(new Pokemon("Vulpix", "Fuego", "Ninguno", "Naranja", "Montana", false, 37));
        pokemones.add(new Pokemon("Squirtle", "Agua", "Ninguno", "Azul", "Agua", false, 7));
        pokemones.add(new Pokemon("Psyduck", "Agua", "Ninguno", "Amarillo", "Agua", false, 54));
        pokemones.add(new Pokemon("Poliwag", "Agua", "Ninguno", "Azul", "Agua", false, 60));
        pokemones.add(new Pokemon("Bulbasaur", "Planta", "Veneno", "Verde", "Bosque", false, 1));
        pokemones.add(new Pokemon("Oddish", "Planta", "Veneno", "Azul", "Bosque", false, 43));
        pokemones.add(new Pokemon("Bellsprout", "Planta", "Veneno", "Verde", "Pradera", false, 69));
        pokemones.add(new Pokemon("Jigglypuff", "Normal", "Ninguno", "Rosa", "Pradera", false, 39));
        pokemones.add(new Pokemon("Meowth", "Normal", "Ninguno", "Amarillo", "Ciudad", false, 52));
        pokemones.add(new Pokemon("Snorlax", "Normal", "Ninguno", "Negro", "Montana", false, 143));
        pokemones.add(new Pokemon("Gastly", "Fantasma", "Veneno", "Morado", "Cueva", false, 92));
        pokemones.add(new Pokemon("Haunter", "Fantasma", "Veneno", "Morado", "Cueva", true, 93));
        pokemones.add(new Pokemon("Onix", "Roca", "Tierra", "Gris", "Cueva", false, 95));
        pokemones.add(new Pokemon("Geodude", "Roca", "Tierra", "Gris", "Cueva", false, 74));
        pokemones.add(new Pokemon("Magikarp", "Agua", "Ninguno", "Rojo", "Agua", false, 129));
        pokemones.add(new Pokemon("Eevee", "Normal", "Ninguno", "Cafe", "Ciudad", false, 133));
        pokemones.add(new Pokemon("Abra", "Psiquico", "Ninguno", "Amarillo", "Ciudad", false, 63));
        pokemones.add(new Pokemon("Machop", "Lucha", "Ninguno", "Gris", "Montana", false, 66));
        pokemones.add(new Pokemon("Cubone", "Tierra", "Ninguno", "Cafe", "Montana", false, 104));
        pokemones.add(new Pokemon("Dratini", "Dragon", "Ninguno", "Azul", "Agua", false, 147));
        pokemones.add(new Pokemon("Lapras", "Hielo", "Agua", "Azul", "Agua", false, 131));
        pokemones.add(new Pokemon("Zubat", "Volador", "Veneno", "Morado", "Cueva", false, 41));
    }

    private void recargarPreguntas() {
        preguntas.clear();
        cargarPreguntasDesdeDatos();
        aplicarAprendizajeGuardado();
    }

    private void cargarPreguntasDesdeDatos() {
        Set<String> tipos = new TreeSet<>();
        Set<String> tiposSecundarios = new TreeSet<>();
        Set<String> colores = new TreeSet<>();
        Set<String> habitats = new TreeSet<>();

        for (Pokemon p : pokemones) {
            tipos.add(p.tipo);
            tiposSecundarios.add(p.tipoSecundario);
            colores.add(p.color);
            habitats.add(p.habitat);
        }

        for (String tipo : tipos) {
            preguntas.add(new PreguntaTipo("tipo_" + idSeguro(tipo), "Es tipo " + tipo + "?", tipo));
        }
        preguntas.add(new PreguntaTieneTipoSecundario("tiene_tipo_secundario", "Tiene tipo secundario?"));
        for (String tipoSec : tiposSecundarios) {
            preguntas.add(new PreguntaTipoSecundario(
                    "tipo_sec_" + idSeguro(tipoSec),
                    "Su tipo secundario es " + tipoSec + "?",
                    tipoSec
            ));
        }
        preguntas.add(new PreguntaEvolucion("es_evolucion", "Es evolucion?", true));

        for (String color : colores) {
            preguntas.add(new PreguntaColor("color_" + idSeguro(color), "Es color " + color + "?", color));
        }
        for (String habitat : habitats) {
            preguntas.add(new PreguntaHabitat(
                    "habitat_" + idSeguro(habitat),
                    "Vive en " + habitat.toLowerCase() + "?",
                    habitat
            ));
        }

        preguntas.add(new PreguntaNombreVocal("nombre_vocal", "Su nombre empieza con vocal?"));
        preguntas.add(new PreguntaNombreLargo("nombre_largo", "Su nombre tiene 7 o mas letras?", 7));
    }

    private String idSeguro(String texto) {
        return texto.toLowerCase().replaceAll("[^a-z0-9]+", "_");
    }

    private Boolean preguntarSiNoVentana(String pregunta) {
        Object[] opciones = {"SI", "NO", "SALIR"};
        int seleccion = JOptionPane.showOptionDialog(
                null,
                pregunta,
                "Adivina el Pokemon",
                JOptionPane.DEFAULT_OPTION,
                JOptionPane.QUESTION_MESSAGE,
                null,
                opciones,
                opciones[0]
        );

        if (seleccion == 0) {
            return true;
        }
        if (seleccion == 1) {
            return false;
        }
        return null;
    }

    private Boolean preguntarSiNoObligatoria(String pregunta) {
        Object[] opciones = {"SI", "NO", "CANCELAR"};
        int seleccion = JOptionPane.showOptionDialog(
                null,
                pregunta,
                "Aprendizaje",
                JOptionPane.DEFAULT_OPTION,
                JOptionPane.QUESTION_MESSAGE,
                null,
                opciones,
                opciones[0]
        );

        if (seleccion == 0) {
            return true;
        }
        if (seleccion == 1) {
            return false;
        }
        return null;
    }

    private String pedirTexto(String mensaje, String valorInicial, boolean obligatorio) {
        while (true) {
            String valor = (String) JOptionPane.showInputDialog(
                    null,
                    mensaje,
                    "Aprendizaje",
                    JOptionPane.QUESTION_MESSAGE,
                    null,
                    null,
                    valorInicial
            );

            if (valor == null) {
                return null;
            }

            valor = valor.trim();
            if (!obligatorio || !valor.isEmpty()) {
                return valor;
            }
        }
    }

    private int pedirNumeroDexOpcional(String nombrePokemon) {
        String texto = pedirTexto("Numero de Pokedex de " + nombrePokemon + " (opcional, 0 si no sabes):", "0", false);
        if (texto == null || texto.isEmpty()) {
            return 0;
        }
        try {
            int valor = Integer.parseInt(texto);
            return Math.max(valor, 0);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private String normalizarTexto(String texto, String porDefecto) {
        if (texto == null) {
            return porDefecto;
        }
        String limpio = texto.trim();
        if (limpio.isEmpty()) {
            return porDefecto;
        }
        return limpio.substring(0, 1).toUpperCase() + limpio.substring(1);
    }

    private boolean existePokemon(String nombre) {
        for (Pokemon p : pokemones) {
            if (p.nombre.equalsIgnoreCase(nombre)) {
                return true;
            }
        }
        return false;
    }

    private void guardarPokemonAprendido(Pokemon p) {
        String nombreSeguro = p.nombre.replace(";", " ");
        String tipoSeguro = p.tipo.replace(";", " ");
        String tipoSecSeguro = p.tipoSecundario.replace(";", " ");
        String colorSeguro = p.color.replace(";", " ");
        String habitatSeguro = p.habitat.replace(";", " ");

        String linea = nombreSeguro + ";"
                + tipoSeguro + ";"
                + tipoSecSeguro + ";"
                + colorSeguro + ";"
                + habitatSeguro + ";"
                + p.esEvolucion + ";"
                + p.numeroDex
                + System.lineSeparator();

        Path ruta = Paths.get(ARCHIVO_POKEMONES_APRENDIDOS);
        try {
            Files.write(
                    ruta,
                    linea.getBytes(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "No se pudo guardar el nuevo Pokemon.", "Aviso", JOptionPane.WARNING_MESSAGE);
        }
    }

    private void cargarPokemonesAprendidos() {
        Path ruta = Paths.get(ARCHIVO_POKEMONES_APRENDIDOS);
        if (!Files.exists(ruta)) {
            return;
        }

        try {
            List<String> lineas = Files.readAllLines(ruta);
            for (String linea : lineas) {
                if (linea.trim().isEmpty()) {
                    continue;
                }
                String[] partes = linea.split(";", -1);
                if (partes.length != 7) {
                    continue;
                }

                String nombre = normalizarTexto(partes[0], "");
                if (nombre.isEmpty() || existePokemon(nombre)) {
                    continue;
                }

                String tipo = normalizarTexto(partes[1], "Normal");
                String tipoSec = normalizarTexto(partes[2], "Ninguno");
                String color = normalizarTexto(partes[3], "Desconocido");
                String habitat = normalizarTexto(partes[4], "Desconocido");
                boolean evolucion = Boolean.parseBoolean(partes[5]);
                int dex;
                try {
                    dex = Integer.parseInt(partes[6]);
                } catch (NumberFormatException e) {
                    dex = 0;
                }

                pokemones.add(new Pokemon(nombre, tipo, tipoSec, color, habitat, evolucion, dex));
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "No se pudieron cargar los Pokemon aprendidos.", "Aviso", JOptionPane.WARNING_MESSAGE);
        }
    }

    private void aprenderPokemonNuevo(Pokemon intento) {
        String nombre = pedirTexto(
                "No era " + intento.nombre + ". Cual era el Pokemon correcto?",
                "",
                true
        );
        if (nombre == null) {
            return;
        }
        nombre = normalizarTexto(nombre, "");
        if (nombre.isEmpty()) {
            return;
        }
        if (existePokemon(nombre)) {
            JOptionPane.showMessageDialog(null, "Ese Pokemon ya estaba en la lista.", "Aprendizaje", JOptionPane.INFORMATION_MESSAGE);
            return;
        }

        String tipo = pedirTexto("Tipo principal de " + nombre + ":", "", true);
        if (tipo == null) {
            return;
        }
        String tipoSec = pedirTexto("Tipo secundario de " + nombre + " (o Ninguno):", "Ninguno", true);
        if (tipoSec == null) {
            return;
        }
        String color = pedirTexto("Color de " + nombre + ":", "", true);
        if (color == null) {
            return;
        }
        String habitat = pedirTexto("Habitat principal de " + nombre + ":", "", true);
        if (habitat == null) {
            return;
        }
        Boolean esEvolucionNuevo = preguntarSiNoObligatoria("El Pokemon " + nombre + " es evolucion?");
        if (esEvolucionNuevo == null) {
            return;
        }
        int numeroDexNuevo = pedirNumeroDexOpcional(nombre);

        Pokemon nuevo = new Pokemon(
                normalizarTexto(nombre, "Desconocido"),
                normalizarTexto(tipo, "Normal"),
                normalizarTexto(tipoSec, "Ninguno"),
                normalizarTexto(color, "Desconocido"),
                normalizarTexto(habitat, "Desconocido"),
                esEvolucionNuevo,
                numeroDexNuevo
        );

        pokemones.add(nuevo);
        guardarPokemonAprendido(nuevo);
        recargarPreguntas();

        JOptionPane.showMessageDialog(
                null,
                "Aprendi a " + nuevo.nombre + ". Lo usare en las siguientes partidas.",
                "Aprendizaje",
                JOptionPane.INFORMATION_MESSAGE
        );
    }

    private void filtrarSegunRespuesta(ArrayList<Pokemon> candidatos, PreguntaInteligente pregunta, boolean respuestaSi) {
        if (respuestaSi) {
            candidatos.removeIf(p -> !pregunta.coincide(p));
        } else {
            candidatos.removeIf(p -> pregunta.coincide(p));
        }
    }

    public PreguntaInteligente elegirMejorPregunta(ArrayList<Pokemon> candidatos, Set<String> usadas) {
        PreguntaInteligente mejor = null;
        double mejorPuntaje = Double.NEGATIVE_INFINITY;

        for (PreguntaInteligente pregunta : preguntas) {
            if (usadas.contains(pregunta.id)) {
                continue;
            }

            int si = 0;
            int no = 0;
            for (Pokemon p : candidatos) {
                if (pregunta.coincide(p)) {
                    si++;
                } else {
                    no++;
                }
            }

            if (si == 0 || no == 0) {
                continue;
            }

            int descarteSeguro = Math.min(si, no);
            double equilibrio = 1.0 - (Math.abs(si - no) / (double) (si + no));
            double puntaje = descarteSeguro + equilibrio + (pregunta.aprendizajeHistorico() * 0.2);

            if (puntaje > mejorPuntaje) {
                mejor = pregunta;
                mejorPuntaje = puntaje;
            }
        }

        return mejor;
    }

    private ImageIcon cargarIconoPokemon(Pokemon pokemon) {
        try {
            URL recursoLocal = getClass().getResource(pokemon.getNombreArchivoLocal());
            if (recursoLocal != null) {
                Image local = ImageIO.read(recursoLocal);
                if (local != null) {
                    return new ImageIcon(local.getScaledInstance(180, 180, Image.SCALE_SMOOTH));
                }
            }
        } catch (IOException ignored) {
        }

        try {
            String url = pokemon.getSpriteUrl();
            if (url == null) {
                return null;
            }
            URL spriteUrl = new URL(url);
            Image remoto = ImageIO.read(spriteUrl);
            if (remoto != null) {
                return new ImageIcon(remoto.getScaledInstance(180, 180, Image.SCALE_SMOOTH));
            }
        } catch (IOException ignored) {
        }

        return null;
    }

    private void confirmarYAprenderSiFallo(Pokemon candidato) {
        ImageIcon icono = cargarIconoPokemon(candidato);
        Object[] opciones = {"SI", "NO"};
        int seleccion = JOptionPane.showOptionDialog(
                null,
                "Creo que es " + candidato.nombre + ". Es correcto?",
                "Confirmacion final",
                JOptionPane.DEFAULT_OPTION,
                JOptionPane.QUESTION_MESSAGE,
                icono,
                opciones,
                opciones[0]
        );

        if (seleccion == 0) {
            JOptionPane.showMessageDialog(null, "Genial. Adivine: " + candidato.nombre, "Resultado", JOptionPane.INFORMATION_MESSAGE, icono);
            return;
        }

        if (seleccion == 1) {
            aprenderPokemonNuevo(candidato);
        }
    }

    private void mostrarResultado(ArrayList<Pokemon> candidatos) {
        if (candidatos.size() == 1) {
            confirmarYAprenderSiFallo(candidatos.get(0));
            return;
        }

        if (candidatos.size() > 1) {
            StringBuilder sb = new StringBuilder();
            sb.append("No pude cerrar en uno solo. Podria ser:\n");
            for (Pokemon p : candidatos) {
                sb.append("- ").append(p.nombre).append('\n');
            }
            JOptionPane.showMessageDialog(null, sb.toString(), "Resultado", JOptionPane.INFORMATION_MESSAGE);
            return;
        }

        JOptionPane.showMessageDialog(null, "No encontre un Pokemon con esas respuestas.", "Resultado", JOptionPane.WARNING_MESSAGE);
    }

    private void aplicarAprendizajeGuardado() {
        Path ruta = Paths.get(ARCHIVO_APRENDIZAJE);
        if (!Files.exists(ruta)) {
            return;
        }

        try {
            List<String> lineas = Files.readAllLines(ruta);
            Map<String, int[]> historial = new HashMap<>();

            for (String linea : lineas) {
                String[] partes = linea.split(",");
                if (partes.length != 3) {
                    continue;
                }
                int usadas = Integer.parseInt(partes[1]);
                int descartados = Integer.parseInt(partes[2]);
                historial.put(partes[0], new int[] {usadas, descartados});
            }

            for (PreguntaInteligente pregunta : preguntas) {
                int[] datos = historial.get(pregunta.id);
                if (datos != null) {
                    pregunta.cargarHistorial(datos[0], datos[1]);
                }
            }
        } catch (IOException | NumberFormatException e) {
            JOptionPane.showMessageDialog(null, "No se pudo cargar el aprendizaje previo.", "Aviso", JOptionPane.WARNING_MESSAGE);
        }
    }

    public void guardarAprendizaje() {
        Path ruta = Paths.get(ARCHIVO_APRENDIZAJE);
        List<String> lineas = new ArrayList<>();

        for (PreguntaInteligente pregunta : preguntas) {
            String linea = pregunta.id + "," + pregunta.vecesUsada + "," + pregunta.totalDescartados;
            lineas.add(linea);
        }

        try {
            Files.write(ruta, lineas);
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "No se pudo guardar el aprendizaje.", "Aviso", JOptionPane.WARNING_MESSAGE);
        }
    }

    // Metodo principal del juego
    public void iniciar() {
        ArrayList<Pokemon> candidatos = new ArrayList<>(pokemones);
        Set<String> usadas = new HashSet<>();

        JOptionPane.showMessageDialog(null, "ADIVINA EL POKEMON (1a GENERACION + aprendizaje)", "Inicio", JOptionPane.INFORMATION_MESSAGE);

        while (candidatos.size() > 1) {
            PreguntaInteligente pregunta = elegirMejorPregunta(candidatos, usadas);
            if (pregunta == null) {
                break;
            }

            int antes = candidatos.size();
            Boolean respuesta = preguntarSiNoVentana(pregunta.texto);
            if (respuesta == null) {
                JOptionPane.showMessageDialog(null, "Juego cancelado.", "Salida", JOptionPane.INFORMATION_MESSAGE);
                return;
            }

            filtrarSegunRespuesta(candidatos, pregunta, respuesta);
            int despues = candidatos.size();

            pregunta.registrarResultado(antes, despues);
            usadas.add(pregunta.id);
        }

        guardarAprendizaje();
        mostrarResultado(candidatos);
    }
}

// CLASE PRINCIPAL
public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JuegoAdivinar juego = new JuegoAdivinar();
            juego.iniciar();
        });
    }
}
