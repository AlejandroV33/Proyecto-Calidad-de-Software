/**
 * @fileoverview Tipos y interfaces para el sistema de transcripción Braille
 * @author Kevin Palacios
 * @version 1.0.0
 */

/**
 * Representación de un símbolo Braille (cuadratín)
 * El cuadratín tiene 6 puntos organizados en dos columnas de tres puntos cada una
 * 
 * Estructura del cuadratín:
 * ┌─────┐
 * │ 1 ● │
 * │ 2 ● │
 * │ 3 ● │
 * │ 4 ● │
 * │ 5 ● │
 * │ 6 ● │
 * └─────┘
 */
export type BrailleDots = [boolean, boolean, boolean, boolean, boolean, boolean];

/**
 * Símbolo Braille completo con su representación visual
 */
export interface BrailleSymbol {
  /** Array de 6 booleanos representando los puntos [1,2,3,4,5,6] */
  dots: BrailleDots;
  
  /** Carácter español que representa */
  character: string;
  
  /** Descripción del símbolo */
  description: string;
}

/**
 * Token procesado del texto español
 */
export interface Token {
  /** Carácter o símbolo original */
  character: string;
  
  /** Tipo de token (letra, número, signo, etc.) */
  type: TokenType;
  
  /** Símbolo Braille correspondiente */
  brailleSymbol?: BrailleSymbol;
  
  /** Posición en el texto original */
  position: number;
}

/**
 * Tipos de tokens reconocidos por el sistema
 */
export enum TokenType {
  LETTER = 'letter',
  NUMBER = 'number',
  ACCENTED_VOWEL = 'accented_vowel',
  PUNCTUATION = 'punctuation',
  SPACE = 'space',
  UNKNOWN = 'unknown'
}

/**
 * Resultado de la transcripción completa
 */
export interface BrailleOutput {
  /** Texto original de entrada */
  originalText: string;
  
  /** Símbolos Braille generados */
  symbols: BrailleSymbol[];
  
  /** Tokens procesados */
  tokens: Token[];
  
  /** Representación visual del texto Braille */
  brailleText: string;
  
  /** Estadísticas de la transcripción */
  statistics: TranscriptionStatistics;
}

/**
 * Estadísticas del proceso de transcripción
 */
export interface TranscriptionStatistics {
  /** Total de caracteres procesados */
  totalCharacters: number;
  
  /** Total de símbolos Braille generados */
  totalSymbols: number;
  
  /** Cantidad de caracteres no reconocidos */
  unrecognizedCharacters: number;
  
  /** Tiempo de procesamiento en milisegundos */
  processingTime: number;
}

/**
 * Configuración del motor de transcripción
 */
export interface TranscriptionConfig {
  /** Modo de contracción (usar abreviaciones Braille) */
  useContractions: boolean;
  
  /** Modo de visualización */
  displayMode: 'dots' | 'binary' | 'unicode';
  
  /** Opciones de formato */
  formatting: {
    /** Mantener mayúsculas/minúsculas */
    preserveCase: boolean;
    
    /** Manejar espacios */
    preserveSpaces: boolean;
    
    /** Límite de caracteres por línea */
    maxLineLength?: number;
  };
}

/**
 * Interfaz para el mapeador de caracteres a Braille
 */
export interface IBrailleMapper {
  /**
   * Obtiene el símbolo Braille para un carácter español
   * @param character Carácter a convertir
   * @returns Símbolo Braille correspondiente o null si no existe
   */
  getBrailleSymbol(character: string): BrailleSymbol | null;
  
  /**
   * Verifica si un carácter tiene mapeo definido
   * @param character Carácter a verificar
   * @returns True si tiene mapeo, false en caso contrario
   */
  hasMapping(character: string): boolean;
  
  /**
   * Obtiene todos los caracteres mapeados
   * @returns Array de caracteres con mapeo
   */
  getAllMappedCharacters(): string[];
}

/**
 * Interfaz para el motor de transcripción
 */
export interface IBrailleTranscriber {
  /**
   * Convierte texto español a Braille
   * @param text Texto en español a transcribir
   * @param config Configuración opcional de transcripción
   * @returns Resultado de la transcripción
   */
  transcribe(text: string, config?: Partial<TranscriptionConfig>): BrailleOutput;
  
  /**
   * Valida caracteres de entrada
   * @param text Texto a validar
   * @returns True si todos los caracteres son válidos
   */
  validateInput(text: string): boolean;
  
  /**
   * Obtiene estadísticas de la última transcripción
   * @returns Estadísticas del proceso
   */
  getLastStatistics(): TranscriptionStatistics | null;
}
