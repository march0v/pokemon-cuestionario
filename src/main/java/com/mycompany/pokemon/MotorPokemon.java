/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.pokemon;

/**
 *
 * @author edluj
 */
import java.util.*;

public class MotorPokemon {

    private JuegoAdivinar juego;
    private ArrayList<Pokemon> candidatos;
    private Set<String> usadas;

    public MotorPokemon() {
        juego = new JuegoAdivinar();
        candidatos = new ArrayList<>(juego.pokemones);
        usadas = new HashSet<>();
    }

    public String siguientePregunta() {
        if (candidatos.size() <= 1) {
            return resultadoFinal();
        }

        PreguntaInteligente pregunta = juego.elegirMejorPregunta(candidatos, usadas);

        if (pregunta == null) {
            return resultadoFinal();
        }

        usadas.add(pregunta.id);
        return pregunta.texto;
    }

    public String responder(String respuesta) {

        if (candidatos.size() <= 1) {
            return resultadoFinal();
        }

        PreguntaInteligente pregunta = juego.elegirMejorPregunta(candidatos, usadas);

        if (pregunta == null) {
            return resultadoFinal();
        }

        int antes = candidatos.size();

        boolean resp = respuesta.equalsIgnoreCase("si");

        if (resp) {
            candidatos.removeIf(p -> !pregunta.coincide(p));
        } else {
            candidatos.removeIf(p -> pregunta.coincide(p));
        }

        int despues = candidatos.size();
        pregunta.registrarResultado(antes, despues);

        if (candidatos.size() <= 1) {
            juego.guardarAprendizaje();
            return resultadoFinal();
        }

        return siguientePregunta();
    }

    private String resultadoFinal() {
        if (candidatos.size() == 1) {
            return "Creo que es: " + candidatos.get(0).nombre;
        }
        if (candidatos.isEmpty()) {
            return "No encontré el pokemon.";
        }
        return "Podría ser: " + candidatos.toString();
    }
}