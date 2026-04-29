# Diseño Arquitectónico de Alto Nivel - Transcriptor Español a Braille

## 1. Visión General del Sistema

### 1.1 Propósito
El sistema **Transcriptor Español a Braille** es una aplicación web que permite convertir texto en español a su representación en Braille, incluyendo:
- Alfabeto español completo
- Números del 0 al 9
- Vocales acentuadas (á, é, í, ó, ú)
- Signos de puntuación básicos
- Símbolos especiales del español

### 1.2 Arquitectura General
```
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Presentación                     │
├─────────────────────────────────────────────────────────────┤
│  Interfaz Web (React/Next.js)                               │
│  ├── Componente de entrada de texto                        │
│  ├── Visualizador de símbolos Braille                       │
│  ├── Controles de configuración                             │
│  └── Exportación de resultados                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Negocio                          │
├─────────────────────────────────────────────────────────────┤
│  Motor de Transcripción Braille                             │
│  ├── Analizador léxico del texto español                    │
│  ├── Mapeador de caracteres a Braille                      │
│  ├── Validador de reglas gramaticales                      │
│  └── Generador de símbolos (cuadratín)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Datos                           │
├─────────────────────────────────────────────────────────────┤
│  Sistema de Mapeo                                           │
│  ├── Tabla de caracteres español → Braille                  │
│  ├── Configuración de símbolos especiales                 │
│  ├── Reglas de composición                                 │
│  └── Cache de traducciones frecuentes                      │
└─────────────────────────────────────────────────────────────┘
```

## 2. Componentes Principales

### 2.1 Interfaz de Usuario (UI Layer)

#### 2.1.1 Componente: `TextInput`
- **Función**: Recibir texto en español del usuario
- **Características**:
  - Validación en tiempo real
  - Soporte para caracteres especiales
  - Autoguardado de progreso
  - Límite de caracteres configurable

#### 2.1.2 Componente: `BrailleDisplay`
- **Función**: Visualizar la representación Braille
- **Características**:
  - Renderizado del cuadratín (6 puntos)
  - Visualización línea por línea
  - Zoom y navegación
  - Modo de impresión

#### 2.1.3 Componente: `ControlPanel`
- **Función**: Configuración de opciones de transcripción
- **Características**:
  - Selección de modo (contracción vs no contracción)
  - Configuración de formato
  - Opciones de exportación

### 2.2 Motor de Transcripción (Business Layer)

#### 2.2.1 Clase: `SpanishToBrailleTranscriber`
```typescript
class SpanishToBrailleTranscriber {
  /**
   * Convierte texto español a Braille
   * @param text Texto en español
   * @returns Representación Braille
   */
  transcribe(text: string): BrailleOutput
  
  /**
   * Valida reglas gramaticales especiales
   * @param tokens Tokens analizados
   * @returns Tokens validados
   */
  validateGrammar(tokens: Token[]): Token[]
  
  /**
   * Genera símbolos Braille individuales
   * @param character Carácter español
   * @returns Símbolo Braille (6 puntos)
   */
  generateBrailleSymbol(character: string): BrailleSymbol
}
```

#### 2.2.2 Clase: `BrailleSymbol`
```typescript
class BrailleSymbol {
  // Representación del cuadratín (6 puntos)
  dots: [boolean, boolean, boolean, boolean, boolean, boolean]
  
  /**
   * Constructor
   * @param dots Array de 6 booleanos [1,2,3,4,5,6]
   */
  constructor(dots: [boolean, boolean, boolean, boolean, boolean, boolean])
  
  /**
   * Convierte a representación visual
   * @returns String para renderizado
   */
  toDisplayString(): string
  
  /**
   * Convierte a representación binaria
   * @returns String binario
   */
  toBinary(): string
}
```

### 2.3 Sistema de Mapeo (Data Layer)

#### 2.3.1 Interface: `IBrailleMapper`
```typescript
interface IBrailleMapper {
  /**
   * Obtiene símbolo Braille para un carácter
   * @param character Carácter español
   * @returns Símbolo Br correspondiente
   */
  getBrailleSymbol(character: string): BrailleSymbol | null
  
  /**
   * Verifica si un carácter tiene mapeo
   * @param character Carácter a verificar
   * @returns Boolean
   */
  hasMapping(character: string): boolean
}
```

#### 2.3.2 Clase: `SpanishBrailleMapper`
```typescript
class SpanishBrailleMapper implements IBrailleMapper {
  private characterMap: Map<string, BrailleSymbol>
  
  constructor() {
    this.initializeMapping()
  }
  
  private initializeMapping(): void {
    // Inicializar mapeo de caracteres españoles a Braille
    // Incluye: alfabeto, números, vocales acentuadas, signos
  }
}
```

## 3. Flujo de Datos

### 3.1 Proceso de Transcripción
```
Texto Español (Input)
        │
        ▼
┌─────────────────┐
│  Validación     │ ← Verificar caracteres válidos
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Tokenización   │ ← Dividir en unidades procesables
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Análisis       │ ← Aplicar reglas gramaticales
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Mapeo          │ ← Convertir cada carácter a Braille
└─────────────────┘
        │
        ▼
┌─────────────────┐
│  Composición    │ ← Generar símbolos finales
└─────────────────┘
        │
        ▼
Texto Braille (Output)
```

## 4. Especificaciones del Cuadratín (Símbolo Generador)

### 4.1 Estructura del Símbolo Braille
```
┌─────┐
│ 1 ● │
│ 2 ● │
│ 3 ● │
│ 4 ● │
│ 5 ● │
│ 6 ● │
└─────┘
```

### 4.2 Representación Técnica
- **Formato**: Array de 6 booleanos `[d1, d2, d3, d4, d5, d6]`
- **Ejemplo**: Letra 'A' → `[true, false, false, false, false, false]`
- **Visualización**: Componente React con 6 puntos posicionados

## 5. Tecnologías y Frameworks

### 5.1 Frontend
- **Framework**: Next.js 14 (React)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Estado**: React Context / Zustand
- **Testing**: Jest + React Testing Library

### 5.2 Arquitectura de Software
- **Patrón**: MVC (Model-View-Controller)
- **Diseño**: Component-Based
- **Principios**: SOLID, DRY, KISS

## 6. Consideraciones de Diseño

### 6.1 Performance
- **Lazy Loading**: Carga bajo demanda de componentes
- **Memoization**: Cache de traducciones frecuentes
- **Virtual Scrolling**: Para textos largos

### 6.2 Accesibilidad
- **WCAG 2.1 AA**: Cumplimiento de estándares
- **Screen Readers**: Compatibilidad con lectores de pantalla
- **Keyboard Navigation**: Navegación completa sin mouse

### 6.3 Internacionalización
- **i18n**: Soporte para múltiples idiomas
- **L10n**: Adaptación cultural
- **RTL**: Soporte para escritura derecha-izquierda (futuro)

## 7. Arquitectura de Testing

### 7.1 Unit Tests
- **Transcriber**: Lógica de conversión
- **Mapper**: Mapeo de caracteres
- **Components**: Renderizado de UI

### 7.2 Integration Tests
- **End-to-End**: Flujo completo de transcripción
- **API**: Si se implementa backend

### 7.3 Test Cases
- **Alfabeto completo**: A-Z, a-z
- **Números**: 0-9
- **Vocales acentuadas**: á, é, í, ó, ú
- **Signos**: ¡, ¿, ., ,, ;, :, ?, !
- **Casos límite**: Texto vacío, caracteres inválidos

## 8. Deployment y Escalabilidad

### 8.1 Deployment
- **Desarrollo**: Local con Next.js dev server
- **Staging**: Vercel preview deployments
- **Producción**: Vercel (recomendado) o Netlify

### 8.2 Escalabilidad
- **Horizontal**: CDN para assets estáticos
- **Vertical**: Optimización de bundle
- **Cache**: Browser y CDN caching

---

*Este documento establece la base arquitectónica para el desarrollo del Transcriptor Español a Braille, asegurando un diseño robusto, escalable y mantenible.*
