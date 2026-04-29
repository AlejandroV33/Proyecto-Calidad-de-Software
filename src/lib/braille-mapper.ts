/**
 * @fileoverview Implementación del mapeador de caracteres españoles a Braille
 * @author Kevin Palacios
 * @version 1.0.0
 */

import { BrailleSymbol, BrailleDots, IBrailleMapper } from '@/types/braille';

/**
 * Clase que implementa el mapeo de caracteres españoles a símbolos Braille
 * Basado en el estándar Braille español (código Braille de 6 puntos)
 */
export class SpanishBrailleMapper implements IBrailleMapper {
  private characterMap: Map<string, BrailleSymbol>;
  
  constructor() {
    this.characterMap = new Map();
    this.initializeMapping();
  }
  
  /**
   * Inicializa el mapeo de caracteres españoles a Braille
   * Incluye: alfabeto, números, vocales acentuadas y signos de puntuación
   */
  private initializeMapping(): void {
    // Alfabeto español (minúsculas)
    this.addMapping('a', [true, false, false, false, false, false], 'Letra A');
    this.addMapping('b', [true, true, false, false, false, false], 'Letra B');
    this.addMapping('c', [true, false, false, true, false, false], 'Letra C');
    this.addMapping('d', [true, false, false, true, true, false], 'Letra D');
    this.addMapping('e', [true, false, false, false, true, false], 'Letra E');
    this.addMapping('f', [true, true, false, true, false, false], 'Letra F');
    this.addMapping('g', [true, true, false, true, true, false], 'Letra G');
    this.addMapping('h', [true, true, false, false, true, false], 'Letra H');
    this.addMapping('i', [false, true, false, true, false, false], 'Letra I');
    this.addMapping('j', [false, true, false, true, true, false], 'Letra J');
    this.addMapping('k', [true, false, true, false, false, false], 'Letra K');
    this.addMapping('l', [true, true, true, false, false, false], 'Letra L');
    this.addMapping('m', [true, false, true, true, false, false], 'Letra M');
    this.addMapping('n', [true, false, true, true, true, false], 'Letra N');
    this.addMapping('ñ', [true, false, true, true, true, true], 'Letra Ñ');
    this.addMapping('o', [true, false, true, false, true, false], 'Letra O');
    this.addMapping('p', [true, true, true, true, false, false], 'Letra P');
    this.addMapping('q', [true, true, true, true, true, false], 'Letra Q');
    this.addMapping('r', [true, true, true, false, true, false], 'Letra R');
    this.addMapping('s', [false, true, true, true, false, false], 'Letra S');
    this.addMapping('t', [false, true, true, true, true, false], 'Letra T');
    this.addMapping('u', [true, false, true, false, false, true], 'Letra U');
    this.addMapping('v', [true, true, true, false, false, true], 'Letra V');
    this.addMapping('w', [false, true, false, true, true, true], 'Letra W');
    this.addMapping('x', [true, false, true, true, false, true], 'Letra X');
    this.addMapping('y', [true, false, true, true, true, true], 'Letra Y');
    this.addMapping('z', [true, false, true, false, true, true], 'Letra Z');
    
    // Alfabeto español (mayúsculas) - mismo código pero con indicador de mayúscula
    this.addMapping('A', [false, false, true, false, true, true], 'Indicador de Mayúscula + A');
    this.addMapping('B', [false, false, true, false, true, true], 'Indicador de Mayúscula + B');
    this.addMapping('C', [false, false, true, false, true, true], 'Indicador de Mayúscula + C');
    this.addMapping('D', [false, false, true, false, true, true], 'Indicador de Mayúscula + D');
    this.addMapping('E', [false, false, true, false, true, true], 'Indicador de Mayúscula + E');
    this.addMapping('F', [false, false, true, false, true, true], 'Indicador de Mayúscula + F');
    this.addMapping('G', [false, false, true, false, true, true], 'Indicador de Mayúscula + G');
    this.addMapping('H', [false, false, true, false, true, true], 'Indicador de Mayúscula + H');
    this.addMapping('I', [false, false, true, false, true, true], 'Indicador de Mayúscula + I');
    this.addMapping('J', [false, false, true, false, true, true], 'Indicador de Mayúscula + J');
    this.addMapping('K', [false, false, true, false, true, true], 'Indicador de Mayúscula + K');
    this.addMapping('L', [false, false, true, false, true, true], 'Indicador de Mayúscula + L');
    this.addMapping('M', [false, false, true, false, true, true], 'Indicador de Mayúscula + M');
    this.addMapping('N', [false, false, true, false, true, true], 'Indicador de Mayúscula + N');
    this.addMapping('Ñ', [false, false, true, false, true, true], 'Indicador de Mayúscula + Ñ');
    this.addMapping('O', [false, false, true, false, true, true], 'Indicador de Mayúscula + O');
    this.addMapping('P', [false, false, true, false, true, true], 'Indicador de Mayúscula + P');
    this.addMapping('Q', [false, false, true, false, true, true], 'Indicador de Mayúscula + Q');
    this.addMapping('R', [false, false, true, false, true, true], 'Indicador de Mayúscula + R');
    this.addMapping('S', [false, false, true, false, true, true], 'Indicador de Mayúscula + S');
    this.addMapping('T', [false, false, true, false, true, true], 'Indicador de Mayúscula + T');
    this.addMapping('U', [false, false, true, false, true, true], 'Indicador de Mayúscula + U');
    this.addMapping('V', [false, false, true, false, true, true], 'Indicador de Mayúscula + V');
    this.addMapping('W', [false, false, true, false, true, true], 'Indicador de Mayúscula + W');
    this.addMapping('X', [false, false, true, false, true, true], 'Indicador de Mayúscula + X');
    this.addMapping('Y', [false, false, true, false, true, true], 'Indicador de Mayúscula + Y');
    this.addMapping('Z', [false, false, true, false, true, true], 'Indicador de Mayúscula + Z');
    
    // Vocales acentuadas
    this.addMapping('á', [true, false, false, false, false, true], 'Letra á');
    this.addMapping('é', [true, true, false, false, false, true], 'Letra é');
    this.addMapping('í', [true, false, false, true, false, true], 'Letra í');
    this.addMapping('ó', [true, false, false, true, true, true], 'Letra ó');
    this.addMapping('ú', [true, false, false, false, true, true], 'Letra ú');
    
    this.addMapping('Á', [false, false, true, false, true, true], 'Indicador de Mayúscula + á');
    this.addMapping('É', [false, false, true, false, true, true], 'Indicador de Mayúscula + é');
    this.addMapping('Í', [false, false, true, false, true, true], 'Indicador de Mayúscula + í');
    this.addMapping('Ó', [false, false, true, false, true, true], 'Indicador de Mayúscula + ó');
    this.addMapping('Ú', [false, false, true, false, true, true], 'Indicador de Mayúscula + ú');
    
    // Números (requieren indicador numérico)
    this.addMapping('0', [false, true, true, true, true, true], 'Número 0');
    this.addMapping('1', [true, false, false, false, false, false], 'Número 1');
    this.addMapping('2', [true, true, false, false, false, false], 'Número 2');
    this.addMapping('3', [true, false, false, true, false, false], 'Número 3');
    this.addMapping('4', [true, false, false, true, true, false], 'Número 4');
    this.addMapping('5', [true, false, false, false, true, false], 'Número 5');
    this.addMapping('6', [true, true, false, true, false, false], 'Número 6');
    this.addMapping('7', [true, true, false, true, true, false], 'Número 7');
    this.addMapping('8', [true, true, false, false, true, false], 'Número 8');
    this.addMapping('9', [false, true, false, true, false, false], 'Número 9');
    
    // Signos de puntuación básicos
    this.addMapping(' ', [false, false, false, false, false, false], 'Espacio');
    this.addMapping('.', [false, true, true, false, false, true], 'Punto');
    this.addMapping(',', [false, true, false, false, false, true], 'Coma');
    this.addMapping(';', [false, true, false, false, true, true], 'Punto y coma');
    this.addMapping(':', [false, true, false, true, false, true], 'Dos puntos');
    this.addMapping('!', [false, true, true, true, false, true], 'Signo de exclamación');
    this.addMapping('¡', [false, true, true, true, true, false], 'Signo de exclamación invertido');
    this.addMapping('?', [false, true, true, true, false, false], 'Signo de interrogación');
    this.addMapping('¿', [false, true, true, true, true, true], 'Signo de interrogación invertido');
    this.addMapping('"', [false, false, true, false, false, true], 'Comillas');
    this.addMapping("'", [false, false, true, false, true, false], 'Apóstrofe');
    this.addMapping('-', [false, false, true, false, true, true], 'Guion');
    this.addMapping('(', [false, true, true, false, true, false], 'Paréntesis abierto');
    this.addMapping(')', [false, true, true, false, true, true], 'Paréntesis cerrado');
    
    // Signos especiales del español
    this.addMapping('ü', [true, false, true, false, true, true], 'Letra ü');
    this.addMapping('Ü', [false, false, true, false, true, true], 'Indicador de Mayúscula + ü');
  }
  
  /**
   * Agrega un mapeo de carácter a símbolo Braille
   * @param character Carácter español
   * @param dots Array de 6 booleanos representando los puntos
   * @param description Descripción del símbolo
   */
  private addMapping(character: string, dots: BrailleDots, description: string): void {
    this.characterMap.set(character, {
      dots,
      character,
      description
    });
  }
  
  /**
   * {@inheritDoc}
   */
  public getBrailleSymbol(character: string): BrailleSymbol | null {
    return this.characterMap.get(character) || null;
  }
  
  /**
   * {@inheritDoc}
   */
  public hasMapping(character: string): boolean {
    return this.characterMap.has(character);
  }
  
  /**
   * {@inheritDoc}
   */
  public getAllMappedCharacters(): string[] {
    return Array.from(this.characterMap.keys());
  }
  
  /**
   * Obtiene el indicador numérico para números
   * @returns Símbolo Braille para indicador numérico
   */
  public getNumberIndicator(): BrailleSymbol {
    return {
      dots: [false, false, true, true, true, true],
      character: '#',
      description: 'Indicador numérico'
    };
  }
  
  /**
   * Obtiene el indicador de mayúscula
   * @returns Símbolo Braille para indicador de mayúscula
   */
  public getCapitalIndicator(): BrailleSymbol {
    return {
      dots: [false, false, false, false, true, true],
      character: '⇧',
      description: 'Indicador de mayúscula'
    };
  }
  
  /**
   * Verifica si un carácter es una letra
   * @param character Carácter a verificar
   * @returns True si es una letra
   */
  public isLetter(character: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]$/.test(character);
  }
  
  /**
   * Verifica si un carácter es un número
   * @param character Carácter a verificar
   * @returns True si es un número
   */
  public isNumber(character: string): boolean {
    return /^[0-9]$/.test(character);
  }
  
  /**
   * Verifica si un carácter es una vocal acentuada
   * @param character Carácter a verificar
   * @returns True si es una vocal acentuada
   */
  public isAccentedVowel(character: string): boolean {
    return /^[áéíóúÁÉÍÓÚ]$/.test(character);
  }
  
  /**
   * Verifica si un carácter es un signo de puntuación
   * @param character Carácter a verificar
   * @returns True si es un signo de puntuación
   */
  public isPunctuation(character: string): boolean {
    return /^[.,;:!?¿¡"'()\-\s]$/.test(character);
  }
}
