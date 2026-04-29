# Documentación Técnica del Código Fuente

## 1. Visión General

Este documento proporciona una descripción detallada del código fuente del **Transcriptor Español a Braille**, incluyendo arquitectura, clases, interfaces y métodos implementados.

## 2. Estructura del Código

### 2.1 Organización de Directorios
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal de la aplicación
│   ├── page.tsx                 # Página principal del transcriptor
│   └── globals.css              # Estilos globales
├── components/                   # Componentes React
│   ├── braille/                 # Componentes específicos Braille
│   │   ├── BrailleSymbol.tsx    # Visualización de símbolos Braille
│   │   ├── BrailleDisplay.tsx   # Panel de resultados
│   │   └── TextInput.tsx        # Entrada de texto
│   ├── ui/                      # Componentes UI reutilizables
│   │   └── Button.tsx          # Componente botón
│   ├── Header.tsx              # Header de navegación
│   ├── Hero.tsx                # Sección hero
│   ├── Features.tsx            # Características
│   └── Footer.tsx              # Footer
├── lib/                         # Lógica de negocio
│   ├── braille-mapper.ts        # Mapeo caracteres a Braille
│   └── braille-transcriber.ts   # Motor de transcripción
├── types/                       # Definiciones TypeScript
│   └── braille.ts              # Tipos del sistema Braille
└── utils/                       # Utilidades
    └── cn.ts                    # Utilidad de clases CSS
```

## 3. Tipos e Interfaces

### 3.1 BrailleDots
```typescript
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
```

**Descripción**: Array de 6 booleanos que representa los puntos del cuadratín Braille.
**Uso**: Para representar visualmente cada símbolo Braille.
**Ejemplo**: `[true, false, false, false, false, false]` representa la letra 'A'.

### 3.2 BrailleSymbol
```typescript
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
```

**Descripción**: Interfaz que define un símbolo Braille completo.
**Propiedades**:
- `dots`: Configuración de puntos del cuadratín
- `character`: Carácter español correspondiente
- `description`: Descripción legible del símbolo

### 3.3 Token
```typescript
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
```

**Descripción**: Representa una unidad procesada del texto de entrada.
**Uso**: Para el análisis y procesamiento del texto español.

### 3.4 TokenType
```typescript
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
```

**Descripción**: Enumeración de tipos de caracteres reconocidos.
**Valores**:
- `LETTER`: Letras del alfabeto español
- `NUMBER`: Dígitos numéricos 0-9
- `ACCENTED_VOWEL`: Vocales acentuadas (á, é, í, ó, ú)
- `PUNCTUATION`: Signos de puntuación
- `SPACE`: Espacios en blanco
- `UNKNOWN`: Caracteres no reconocidos

### 3.5 BrailleOutput
```typescript
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
```

**Descripción**: Contiene el resultado completo de una transcripción.
**Uso**: Retornado por el motor de transcripción después de procesar el texto.

### 3.6 TranscriptionStatistics
```typescript
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
```

**Descripción**: Métricas sobre el proceso de transcripción.
**Uso**: Para análisis de rendimiento y debugging.

## 4. Clases Principales

### 4.1 SpanishBrailleMapper

```typescript
/**
 * Clase que implementa el mapeo de caracteres españoles a símbolos Braille
 * Basado en el estándar Braille español (código Braille de 6 puntos)
 */
export class SpanishBrailleMapper implements IBrailleMapper
```

**Responsabilidad**: Mapear caracteres españoles a su representación Braille.

#### Constructor
```typescript
constructor()
```
**Descripción**: Inicializa el mapeo de caracteres españoles a Braille.
**Efecto**: Crea el Map interno con todas las correspondencias.

#### Métodos Principales

##### getBrailleSymbol(character: string): BrailleSymbol | null
```typescript
/**
 * Obtiene el símbolo Braille para un carácter español
 * @param character Carácter a convertir
 * @returns Símbolo Braille correspondiente o null si no existe
 */
```
**Parámetros**:
- `character`: Carácter español a convertir
**Retorna**: Símbolo Braille o null si no existe mapeo
**Ejemplo**:
```typescript
const mapper = new SpanishBrailleMapper();
const symbol = mapper.getBrailleSymbol('a'); // → BrailleSymbol para 'A'
```

##### hasMapping(character: string): boolean
```typescript
/**
 * Verifica si un carácter tiene mapeo definido
 * @param character Carácter a verificar
 * @returns True si tiene mapeo, false en caso contrario
 */
```

##### isLetter(character: string): boolean
```typescript
/**
 * Verifica si un carácter es una letra
 * @param character Carácter a verificar
 * @returns True si es una letra
 */
```

##### isNumber(character: string): boolean
```typescript
/**
 * Verifica si un carácter es un número
 * @param character Carácter a verificar
 * @returns True si es un número
 */
```

##### isAccentedVowel(character: string): boolean
```typescript
/**
 * Verifica si un carácter es una vocal acentuada
 * @param character Carácter a verificar
 * @returns True si es una vocal acentuada
 */
```

#### Métodos Privados

##### initializeMapping(): void
```typescript
/**
 * Inicializa el mapeo de caracteres españoles a Braille
 * Incluye: alfabeto, números, vocales acentuadas y signos de puntuación
 */
```
**Descripción**: Puebla el Map interno con todas las correspondencias.
**Contenido**:
- Alfabeto español (mayúsculas y minúsculas)
- Vocales acentuadas
- Números 0-9
- Signos de puntuación básicos
- Caracteres especiales del español

##### addMapping(character: string, dots: BrailleDots, description: string): void
```typescript
/**
 * Agrega un mapeo de carácter a símbolo Braille
 * @param character Carácter español
 * @param dots Array de 6 booleanos representando los puntos
 * @param description Descripción del símbolo
 */
```

### 4.2 SpanishToBrailleTranscriber

```typescript
/**
 * Implementación del motor de transcripción español a Braille
 * Procesa texto español y lo convierte a su representación Braille
 */
export class SpanishToBrailleTranscriber implements IBrailleTranscriber
```

**Responsabilidad**: Procesar texto español y convertirlo a Braille.

#### Constructor
```typescript
constructor()
```
**Descripción**: Inicializa el transcriptor con un mapeador Braille.
**Efecto**: Crea instancia de SpanishBrailleMapper.

#### Métodos Principales

##### transcribe(text: string, config?: Partial<TranscriptionConfig>): BrailleOutput
```typescript
/**
 * Convierte texto español a Braille
 * @param text Texto en español a transcribir
 * @param config Configuración opcional de transcripción
 * @returns Resultado de la transcripción
 */
```
**Parámetros**:
- `text`: Texto español a transcribir
- `config`: Configuración opcional (contracciones, formato, etc.)
**Retorna**: BrailleOutput con el resultado completo
**Proceso**:
1. Validar entrada
2. Tokenizar texto
3. Procesar tokens
4. Generar símbolos
5. Calcular estadísticas
**Ejemplo**:
```typescript
const transcriber = new SpanishToBrailleTranscriber();
const result = transcriber.transcribe('Hola mundo');
console.log(result.brailleText); // → representación Braille
```

##### validateInput(text: string): boolean
```typescript
/**
 * Valida caracteres de entrada
 * @param text Texto a validar
 * @returns True si todos los caracteres son válidos
 */
```

##### getLastStatistics(): TranscriptionStatistics | null
```typescript
/**
 * Obtiene estadísticas de la última transcripción
 * @returns Estadísticas del proceso
 */
```

#### Métodos Privados

##### tokenizeText(text: string): Token[]
```typescript
/**
 * Tokeniza el texto de entrada en unidades procesables
 * @param text Texto a tokenizar
 * @returns Array de tokens
 */
```
**Descripción**: Divide el texto en tokens individuales con su tipo.

##### getTokenType(character: string): TokenType
```typescript
/**
 * Determina el tipo de token para un carácter
 * @param character Carácter a clasificar
 * @returns Tipo de token
 */
```

##### processTokens(tokens: Token[], config: TranscriptionConfig): Token[]
```typescript
/**
 * Procesa los tokens y asigna símbolos Braille
 * @param tokens Tokens a procesar
 * @param config Configuración de transcripción
 * @returns Tokens procesados con símbolos Braille
 */
```
**Descripción**: Asigna símbolos Braille a cada token y maneja casos especiales.

##### generateBrailleText(symbols: any[], displayMode: 'dots' | 'binary' | 'unicode'): string
```typescript
/**
 * Genera la representación visual del texto Braille
 * @param symbols Símbolos Braille a convertir
 * @param displayMode Modo de visualización
 * @returns String para visualización
 */
```

## 5. Componentes React

### 5.1 BrailleSymbol

```typescript
/**
 * Componente para visualizar símbolos Braille (cuadratín)
 */
export const BrailleSymbol: React.FC<BrailleSymbolProps>
```

**Responsabilidad**: Renderizar visualmente un símbolo Braille individual.

#### Props
```typescript
interface BrailleSymbolProps {
  /** Array de 6 booleanos representando los puntos [1,2,3,4,5,6] */
  dots: BrailleDots;
  
  /** Tamaño del símbolo */
  size?: 'sm' | 'md' | 'lg';
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Modo de visualización */
  displayMode?: 'dots' | 'binary' | 'unicode';
  
  /** Si es interactivo (clickable) */
  interactive?: boolean;
  
  /** Callback al hacer click */
  onClick?: () => void;
}
```

#### Renderizado
- **Modo dots**: Muestra el cuadratín con puntos visuales
- **Modo binary**: Muestra representación binaria (ej: "100000")
- **Modo unicode**: Muestra caracteres Unicode Braille

#### Accesibilidad
- ARIA labels para lectores de pantalla
- Soporte para navegación con teclado
- Indicadores visuales de estado

### 5.2 BrailleDisplay

```typescript
/**
 * Componente para mostrar texto Braille transcribido
 */
export const BrailleDisplay: React.FC<BrailleDisplayProps>
```

**Responsabilidad**: Mostrar el resultado completo de la transcripción.

#### Props
```typescript
interface BrailleDisplayProps {
  /** Resultado de la transcripción a mostrar */
  transcriptionResult: BrailleOutput;
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Callback para exportar resultados */
  onExport?: (format: 'text' | 'json' | 'pdf') => void;
}
```

#### Características
- Múltiples modos de visualización (grid, lista, texto)
- Estadísticas de transcripción
- Opciones de exportación
- Responsive design

### 5.3 TextInput

```typescript
/**
 * Componente para entrada de texto español a transcribir
 */
export const TextInput: React.FC<TextInputProps>
```

**Responsabilidad**: Recibir y validar texto de entrada.

#### Props
```typescript
interface TextInputProps {
  /** Texto actual del input */
  value: string;
  
  /** Callback cuando cambia el texto */
  onChange: (value: string) => void;
  
  /** Callback para transcribir */
  onTranscribe: () => void;
  
  /** Si está procesando la transcripción */
  isProcessing?: boolean;
  
  /** Errores de validación */
  errors?: string[];
  
  /** Caracteres no soportados */
  unsupportedCharacters?: string[];
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Placeholder del textarea */
  placeholder?: string;
  
  /** Límite de caracteres */
  maxLength?: number;
}
```

#### Características
- Validación en tiempo real
- Drag & drop de archivos
- Estadísticas de texto
- Indicadores de errores

## 6. Utilidades

### 6.1 cn()

```typescript
/**
 * Utilidad para combinar clases CSS de forma segura
 * @param inputs Clases CSS a combinar
 * @returns String de clases combinadas
 */
export function cn(...inputs: ClassValue[]): string
```

**Descripción**: Combina clases CSS usando clsx y tailwind-merge.
**Uso**: Para evitar conflictos de clases en componentes.

## 7. Configuración

### 7.1 TypeScript Configuración
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

### 7.2 TailwindCSS Configuración
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada
      },
      spacing: {
        // Espaciado personalizado
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
```

## 8. Flujo de Datos

### 8.1 Diagrama de Flujo
```
Usuario ingresa texto
        ↓
TextInput component
        ↓
handleTranscribe()
        ↓
SpanishToBrailleTranscriber.transcribe()
        ↓
validateInput()
        ↓
tokenizeText()
        ↓
processTokens()
        ↓
SpanishBrailleMapper.getBrailleSymbol()
        ↓
generateBrailleText()
        ↓
BrailleDisplay component
        ↓
Visualización de resultados
```

### 8.2 Transformación de Datos
1. **String** → **Token[]** (tokenización)
2. **Token[]** → **Token[] con BrailleSymbol** (mapeo)
3. **Token[]** → **BrailleSymbol[]** (extracción)
4. **BrailleSymbol[]** → **string** (visualización)

## 9. Manejo de Errores

### 9.1 Tipos de Errores
- **ValidationError**: Caracteres no soportados
- **TranscriptionError**: Error en el proceso de transcripción
- **MappingError**: Error en el mapeo de caracteres

### 9.2 Estrategia de Manejo
```typescript
try {
  const result = transcriber.transcribe(text);
  setTranscriptionResult(result);
} catch (error) {
  if (error instanceof ValidationError) {
    setErrors([error.message]);
    setUnsupportedCharacters(error.unsupportedChars);
  } else {
    setErrors(['Error en la transcripción']);
  }
}
```

## 10. Performance

### 10.1 Optimizaciones
- **Memoization**: Cache de símbolos Braille
- **Lazy Loading**: Carga bajo demanda de componentes
- **Virtual Scrolling**: Para textos largos
- **Debouncing**: Validación de entrada

### 10.2 Métricas
- Tiempo de transcripción
- Memoria utilizada
- Tamaño del bundle
- Tiempo de renderizado

---

Esta documentación técnica proporciona una visión completa del código fuente, facilitando el mantenimiento, extensión y comprensión del sistema Transcriptor Español a Braille.
