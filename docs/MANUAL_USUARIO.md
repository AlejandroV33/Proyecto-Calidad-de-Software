# Manual de Usuario - Transcriptor Español a Braille

## 1. Introducción

El **Transcriptor Español a Braille** es una aplicación web que permite convertir texto en español a su representación en el sistema Braille de 6 puntos. Esta herramienta está diseñada para facilitar la comunicación y accesibilidad para personas con discapacidad visual, así como para educadores y estudiantes que deseen aprender sobre el sistema Braille.

### 1.1 Características Principales
- ✅ **Transcripción en tiempo real** de texto español a Braille
- ✅ **Soporte completo** del alfabeto español
- ✅ **Números** del 0 al 9
- ✅ **Vocales acentuadas** (á, é, í, ó, ú)
- ✅ **Signos de puntuación** españoles (¿, ¡, ., ,, ;, :, ?, !)
- ✅ **Caracteres especiales** (ñ, ü)
- ✅ **Visualización múltiple** (puntos, binario, texto)
- ✅ **Exportación** de resultados en múltiples formatos
- ✅ **Diseño responsive** para todos los dispositivos

### 1.2 Audiencia
- Personas con discapacidad visual
- Educadores y maestros
- Estudiantes de Braille
- Familiares y cuidadores
- Desarrolladores de contenido accesible

## 2. Requisitos del Sistema

### 2.1 Navegadores Soportados
- **Chrome**: Versión 90 o superior
- **Firefox**: Versión 88 o superior
- **Safari**: Versión 14 o superior
- **Edge**: Versión 90 o superior

### 2.2 Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Tablets**: iPad, Android tablets
- **Móviles**: iPhone, Android phones
- **Screen Readers**: JAWS, NVDA, VoiceOver

## 3. Primeros Pasos

### 3.1 Acceder a la Aplicación
1. Abrir el navegador web
2. Navegar a la URL de la aplicación
3. La página principal se cargará automáticamente

### 3.2 Interfaz Principal
La interfaz se divide en dos secciones principales:
- **Panel Izquierdo**: Entrada de texto
- **Panel Derecho**: Resultados de transcripción

## 4. Guía de Uso Detallada

### 4.1 Panel de Entrada de Texto

#### 4.1.1 Ingresar Texto
1. **Método 1**: Escribir directamente en el área de texto
2. **Método 2**: Copiar y pegar texto desde otra fuente
3. **Método 3**: Cargar un archivo de texto (.txt)

#### 4.1.2 Caracteres Soportados
**Letras del alfabeto:**
```
a b c d e f g h i j k l m n ñ o p q r s t u v w x y z
A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z
```

**Vocales acentuadas:**
```
á é í ó ú
Á É Í Ó Ú
```

**Números:**
```
0 1 2 3 4 5 6 7 8 9
```

**Signos de puntuación:**
```
. , ; : ? ! ¿ ¡ " ' ( ) -
```

**Caracteres especiales:**
```
ñ ü Ñ Ü
```

#### 4.1.3 Límites y Restricciones
- **Longitud máxima**: 5,000 caracteres
- **Formatos de archivo**: Solo archivos .txt
- **Caracteres no soportados**: @, #, $, %, &, *, +, =, <, >, [, ], {, }, |, \

#### 4.1.4 Validación en Tiempo Real
La aplicación valida el texto mientras escribes:
- ✅ **Texto válido**: Borde verde
- ⚠️ **Advertencia**: Caracteres no soportados (borde amarillo)
- ❌ **Error**: Texto vacío (borde gris)

### 4.2 Botón de Transcripción
Una vez que hayas ingresado texto válido:

1. **Hacer clic** en el botón "Transcribir"
2. **Esperar** el procesamiento (generalmente menos de 1 segundo)
3. **Ver** los resultados en el panel derecho

### 4.3 Panel de Resultados

#### 4.3.1 Modos de Visualización
**Modo Puntos (predeterminado):**
- Muestra el cuadratín Braille con puntos visuales
- ● = punto activo
- ○ = punto inactivo

**Modo Binario:**
- Muestra representación binaria (ej: 100000)
- 1 = punto activo
- 0 = punto inactivo

**Modo Texto:**
- Muestra caracteres Unicode Braille
- Formato continuo para lectura

#### 4.3.2 Vista Grid
- Organiza los símbolos en una cuadrícula
- Ideal para visualización general
- Muestra cada símbolo con su carácter original

#### 4.3.3 Vista Lista
- Muestra símbolos en línea horizontal
- Ideal para comparación lado a lado
- Ahorra espacio vertical

#### 4.3.4 Estadísticas de Transcripción
El panel inferior muestra:
- **Caracteres totales**: Cantidad de caracteres procesados
- **Símbolos Braille**: Cantidad de símbolos generados
- **No reconocidos**: Caracteres sin mapeo (debe ser 0)
- **Tiempo procesamiento**: Tiempo en milisegundos

### 4.4 Exportación de Resultados

#### 4.4.1 Exportar como Texto
1. Hacer clic en el botón de exportación
2. Seleccionar "Exportar como Texto"
3. El archivo se descargará automáticamente
4. **Formato del archivo**:
```
Texto Original:
[hola mundo]

Transcripción Braille:
[●○○○○○ ○●○○○○ ●○○●○○ ●●○●●○]

Estadísticas:
Caracteres: 10
Símbolos: 10
Tiempo: 2.34ms
```

#### 4.4.2 Exportar como JSON
1. Hacer clic en el botón de exportación
2. Seleccionar "Exportar como JSON"
3. Ideal para integración con otros sistemas
4. **Estructura del JSON**:
```json
{
  "originalText": "hola mundo",
  "symbols": [...],
  "tokens": [...],
  "brailleText": "●○○○○○ ○●○○○○ ●○○●○○ ●●○●●○ ○○○○○○ ●●●●●● ●●○●○○ ●●●●●● ●●●○●○",
  "statistics": {
    "totalCharacters": 10,
    "totalSymbols": 10,
    "unrecognizedCharacters": 0,
    "processingTime": 2.34
  }
}
```

#### 4.4.3 Exportar como PDF (en desarrollo)
- Esta función estará disponible en futuras versiones
- Permitirá impresión profesional de resultados

## 5. Ejemplos Prácticos

### 5.1 Ejemplo 1: Texto Básico
**Entrada:** `hola mundo`
**Salida:** 10 símbolos Braille
**Características:**
- 8 letras
- 1 espacio
- 0 caracteres especiales

### 5.2 Ejemplo 2: Números
**Entrada:** `123`
**Salida:** 4 símbolos Braille (incluye indicador numérico)
**Características:**
- 3 números
- 1 indicador numérico (#)

### 5.3 Ejemplo 3: Vocales Acentuadas
**Entrada:** `áéíóú`
**Salida:** 5 símbolos Braille
**Características:**
- 5 vocales acentuadas
- Cada una con su símbolo único

### 5.4 Ejemplo 4: Texto Complejo
**Entrada:** `¡Hola, mundo! Este es un test: 123.`
**Salida:** 32 símbolos Braille
**Características:**
- 18 letras
- 2 espacios
- 4 signos de puntuación
- 3 números
- 1 indicador numérico

## 6. Casos de Uso Avanzados

### 6.1 Uso Educativo
**Para maestros:**
- Crear ejercicios de Braille
- Demostrar transcripción en tiempo real
- Exportar ejercicios para estudiantes

**Para estudiantes:**
- Practicar reconocimiento de Braille
- Verificar transcripciones manuales
- Comparar diferentes modos de visualización

### 6.2 Uso Profesional
**Para creadores de contenido:**
- Verificar accesibilidad de textos
- Generar versiones Braille de documentos
- Integrar con sistemas de publicación

**Para desarrolladores:**
- Exportar en formato JSON para integración
- Validar transcripciones automáticas
- Testing de accesibilidad

### 6.3 Uso Personal
**Para personas con discapacidad visual:**
- Convertir textos personales a Braille
- Compartir contenido con otros usuarios
- Crear notas personales accesibles

## 7. Accesibilidad

### 7.1 Navegación por Teclado
- **Tab**: Navegar entre elementos
- **Enter**: Activar botones
- **Esc**: Cerrar diálogos
- **Espacio**: Activar botones seleccionados

### 7.2 Screen Readers
La aplicación es compatible con:
- **JAWS** (Windows)
- **NVDA** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

### 7.3 Ajustes Visuales
- **Contraste alto**: Soporte nativo del navegador
- **Zoom**: Ctrl + (acercar), Ctrl - (alejar)
- **Tamaño de fuente**: Configurable en el navegador

## 8. Solución de Problemas

### 8.1 Problemas Comunes

#### Problema: "No puedo transcribir texto"
**Causas posibles:**
- Texto vacío
- Caracteres no soportados
- Límite de caracteres excedido

**Soluciones:**
- Verificar que el texto no esté vacío
- Eliminar caracteres no soportados (@, #, $, etc.)
- Reducir el texto a menos de 5,000 caracteres

#### Problema: "Los símbolos no se muestran correctamente"
**Causas posibles:**
- Navegador no compatible
- JavaScript deshabilitado
- Problema de conexión

**Soluciones:**
- Actualizar el navegador
- Habilitar JavaScript
- Verificar conexión a internet

#### Problema: "La exportación no funciona"
**Causas posibles:**
- Bloqueador de descargas
- Navegador incompatible
- Permisos insuficientes

**Soluciones:**
- Deshabilitar bloqueador de descargas temporalmente
- Usar otro navegador
- Verificar permisos de descarga

### 8.2 Mensajes de Error

#### "Caracteres no soportados"
**Significado:** El texto contiene caracteres que no pueden convertirse
**Acción:** Eliminar los caracteres indicados y volver a intentar

#### "Error en la transcripción"
**Significado:** Ocurrió un error interno durante el procesamiento
**Acción:** Recargar la página e intentar nuevamente

#### "Límite de caracteres excedido"
**Significado:** El texto es demasiado largo
**Acción:** Reducir el texto a menos de 5,000 caracteres

## 9. Atajos y Consejos

### 9.1 Atajos de Teclado
- **Ctrl + A**: Seleccionar todo el texto
- **Ctrl + C**: Copiar texto
- **Ctrl + V**: Pegar texto
- **Ctrl + Z**: Deshacer (en el campo de texto)
- **Enter**: Iniciar transcripción

### 9.2 Consejos de Uso
- **Texto corto**: Mejor para aprendizaje inicial
- **Texto largo**: Ideal para documentos completos
- **Modo binario**: Útil para programadores
- **Modo puntos**: Mejor para aprendizaje visual
- **Exportación JSON**: Para integración técnica

### 9.3 Buenas Prácticas
- **Revisar siempre** los resultados de transcripción
- **Usar ejemplos** para familiarizarse con el sistema
- **Guardar resultados** importantes
- **Compartir** con otros usuarios cuando sea útil

## 10. Soporte y Ayuda

### 10.1 Recursos de Ayuda
- **Documentación técnica**: Disponible en el repositorio
- **Casos de prueba**: Para verificar funcionalidad
- **Ejemplos**: En la sección de ejemplos prácticos

### 10.2 Comunidad
- **GitHub Issues**: Reportar problemas y sugerencias
- **Foros**: Discusión con otros usuarios
- **Tutoriales**: Videos y guías adicionales

### 10.3 Contacto
- **Email de soporte**: soporte@transcriptor-braille.com
- **Redes sociales**: @TranscriptorBraille
- **Foro**: forum.transcriptor-braille.com

## 11. Glosario

### 11.1 Términos Técnicos
- **Braille**: Sistema de lectura táctil para personas ciegas
- **Cuadratín**: Símbolo Braille de 6 puntos
- **Transcripción**: Proceso de convertir texto a Braille
- **Token**: Unidad de texto procesada

### 11.2 Abreviaciones
- **UI**: Interfaz de Usuario
- **UX**: Experiencia de Usuario
- **API**: Interfaz de Programación de Aplicaciones
- **JSON**: JavaScript Object Notation

## 12. Preguntas Frecuentes (FAQ)

### P: ¿Puedo usar la aplicación sin conexión a internet?
R: No, la aplicación requiere conexión a internet para funcionar correctamente.

### P: ¿Hay un límite en la cantidad de transcripciones?
R: No, puedes realizar transcripciones ilimitadas, pero cada texto está limitado a 5,000 caracteres.

### P: ¿Puedo transcribir otros idiomas?
R: Actualmente solo soporta español. Estamos trabajando en soporte para otros idiomas.

### P: ¿Es gratuita la aplicación?
R: Sí, la aplicación es completamente gratuita.

### P: ¿Mis datos son privados?
R: Sí, todas las transcripciones se realizan localmente en tu navegador y no se almacenan en servidores.

### P: ¿Puedo imprimir los resultados?
R: Sí, puedes exportar como texto y luego imprimir, o usar la función de impresión del navegador.

---

## Conclusión

El Transcriptor Español a Braille es una herramienta poderosa y accesible diseñada para facilitar la comunicación y el aprendizaje del sistema Braille. Con su interfaz intuitiva y características avanzadas, es suitable para usuarios de todos los niveles, desde principiantes hasta expertos.

Para obtener el máximo provecho de la aplicación:
1. **Practica** con diferentes tipos de texto
2. **Explora** todos los modos de visualización
3. **Usa** la función de exportación para guardar resultados importantes
4. **Comparte** tus experiencias con la comunidad

¡Gracias por usar el Transcriptor Español a Braille!
