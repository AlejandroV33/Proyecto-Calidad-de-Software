# Manual de Instalación - Transcriptor Español a Braille

## 1. Requisitos del Sistema

### 1.1 Requisitos Mínimos
- **Sistema Operativo**: Windows 10+, macOS 10.15+, Ubuntu 18.04+ o superior
- **Procesador**: 1 GHz o superior
- **Memoria RAM**: 2 GB mínimo (4 GB recomendado)
- **Espacio en Disco**: 500 MB de espacio libre
- **Conexión a Internet**: Para instalación de dependencias

### 1.2 Software Requerido
- **Node.js**: Versión 18.17.0 o superior (recomendado 20.x)
- **npm**: Versión 9.0.0 o superior (incluido con Node.js)
- **Git**: Versión 2.30.0 o superior (para clonar el repositorio)

## 2. Instalación de Node.js

### 2.1 Método 1: Usando nvm (Recomendado)

#### Para Windows
1. Descargar e instalar **nvm-windows** desde [GitHub](https://github.com/coreybutler/nvm-windows)
2. Abrir PowerShell o CMD como Administrador
3. Instalar Node.js:
```powershell
nvm install 20
nvm use 20
nvm alias default 20
```

#### Para macOS/Linux
1. Instalar nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
2. Recargar el perfil:
```bash
source ~/.bashrc
```
3. Instalar Node.js:
```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### 2.2 Método 2: Descarga Directa

1. Visitar [Node.js Official Website](https://nodejs.org/)
2. Descargar la versión LTS recomendada (20.x)
3. Ejecutar el instalador y seguir las instrucciones
4. Verificar instalación:
```bash
node --version
npm --version
```

## 3. Obtener el Código Fuente

### 3.1 Método 1: Clonar desde GitHub
```bash
git clone https://github.com/usuario/transcriptor-espanol-braille.git
cd transcriptor-espanol-braille
```

### 3.2 Método 2: Descargar ZIP
1. Ir al repositorio en GitHub
2. Hacer clic en "Code" → "Download ZIP"
3. Descomprimir el archivo
4. Navegar al directorio descomprimido

## 4. Instalación de Dependencias

### 4.1 Instalación Básica
```bash
# Limpiar caché de npm (opcional pero recomendado)
npm cache clean --force

# Instalar dependencias
npm install
```

### 4.2 Verificación de Instalación
```bash
# Verificar que todas las dependencias se instalaron correctamente
npm list --depth=0
```

### 4.3 Solución de Problemas Comunes

#### Problema: Error de permisos (macOS/Linux)
```bash
# Solución 1: Usar nvm (recomendado)
nvm install 20
nvm use 20

# Solución 2: Cambiar permisos de npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### Problema: Error de red
```bash
# Configurar npm registry
npm config set registry https://registry.npmjs.org/

# Usar mirror alternativo si es necesario
npm config set registry https://npm.pkg.github.com/
```

#### Problema: Dependencias faltantes
```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

## 5. Configuración del Entorno

### 5.1 Variables de Entorno (Opcional)
Crear archivo `.env.local` en la raíz del proyecto:
```env
# Configuración de desarrollo
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configuración de análisis (opcional)
NEXT_PUBLIC_ANALYTICS_ID=tu_analytics_id

# Configuración de API (si aplica)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 5.2 Configuración de Git
```bash
# Configurar usuario de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Configurar fin de línea (importante para Windows)
git config --global core.autocrlf true
```

## 6. Ejecución de la Aplicación

### 6.1 Modo Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### 6.2 Modo Producción
```bash
# Construir la aplicación
npm run build

# Iniciar servidor de producción
npm run start
```

### 6.3 Verificación de Funcionamiento
1. Abrir navegador en `http://localhost:3000`
2. Verificar que la página cargue correctamente
3. Probar la transcripción con texto de ejemplo
4. Verificar que los símbolos Braille se muestren correctamente

## 7. Instalación en Diferentes Sistemas Operativos

### 7.1 Windows

#### Requisitos Adicionales
- **Windows Build Tools** para compilación de paquetes nativos
- **Visual Studio Build Tools** o **Visual Studio Community**

#### Instalación de Build Tools
```powershell
# Opción 1: Instalar con npm (recomendado)
npm install --global --production windows-build-tools

# Opción 2: Instalar Visual Studio
# Descargar Visual Studio Installer
# Instalar "Desktop development with C++"
```

#### Pasos de Instalación
1. Abrir PowerShell como Administrador
2. Ejecutar comandos de instalación estándar
3. Si hay errores de compilación, ejecutar:
```powershell
npm config set msvs_version 2019
```

### 7.2 macOS

#### Requisitos Adicionales
- **Xcode Command Line Tools**
- **Python 3** (para algunas dependencias)

#### Instalación de Xcode Tools
```bash
xcode-select --install
```

#### Pasos de Instalación
1. Abrir Terminal
2. Ejecutar comandos de instalación estándar
3. Si hay errores de permisos, ejecutar:
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### 7.3 Linux (Ubuntu/Debian)

#### Requisitos Adicionales
- **Build Essential**
- **Python 3**
- **libssl-dev**

#### Instalación de Dependencias del Sistema
```bash
sudo apt update
sudo apt install -y build-essential python3 libssl-dev
```

#### Pasos de Instalación
1. Abrir Terminal
2. Ejecutar comandos de instalación estándar
3. Si hay errores de permisos, ejecutar:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## 8. Configuración de Proxy (Si es Necesario)

### 8.1 Configuración de npm
```bash
# Configurar proxy HTTP
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configurar proxy HTTPS
npm config set https-proxy https://proxy.company.com:8080
```

### 8.2 Configuración de Git
```bash
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy https://proxy.company.com:8080
```

## 9. Verificación de Instalación

### 9.1 Tests Automáticos
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

### 9.2 Verificación Manual
1. **Funcionalidad Básica**:
   - Ingresar texto "hola mundo"
   - Verificar que se genere la transcripción
   - Verificar los símbolos Braille

2. **Caracteres Especiales**:
   - Probar con vocales acentuadas: "áéíóú"
   - Probar con números: "123"
   - Probar con signos: "¡Hola!"

3. **Exportación**:
   - Probar exportación a texto
   - Probar exportación a JSON

## 10. Troubleshooting Avanzado

### 10.1 Problemas Comunes y Soluciones

#### Error: "node_modules/.bin/npm: Permission denied"
```bash
# Solución 1: Corregir permisos
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Solución 2: Usar nvm
nvm install 20
nvm use 20
```

#### Error: "EMFILE: too many open files"
```bash
# Aumentar límite de archivos (macOS/Linux)
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# En Windows, reiniciar el sistema
```

#### Error: "Module not found: Can't resolve 'react'"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Limpiar caché de Next.js
rm -rf .next
npm run build
```

#### Error: "Port 3000 is already in use"
```bash
# Encontrar proceso usando el puerto
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows

# O usar otro puerto
npm run dev -- -p 3001
```

### 10.2 Logs y Diagnóstico

#### Habilitar Logs Detallados
```bash
# Verbose npm install
npm install --verbose

# Logs de Next.js
npm run dev -- --verbose

# Logs de Node.js
DEBUG=* npm run dev
```

#### Verificar Configuración
```bash
# Verificar versión de Node.js
node --version

# Verificar configuración de npm
npm config list

# Verificar variables de entorno
env | grep NODE
```

## 11. Actualización y Mantenimiento

### 11.1 Actualizar Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar paquetes menores
npm update

# Actualizar paquetes mayores
npm install package@latest
```

### 11.2 Limpieza del Sistema
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar dependencias no usadas
npm prune

# Reconstruir aplicación
npm run build
```

## 12. Configuración de Producción

### 12.1 Variables de Entorno de Producción
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

### 12.2 Build de Producción
```bash
# Build optimizado
npm run build

# Verificar build
npm start
```

### 12.3 Deployment
Verificar documentación de deployment específica para tu plataforma:
- [Vercel Deployment Guide](https://vercel.com/docs/concepts/projects/overview)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [Docker Deployment](https://docs.docker.com/)

## 13. Recursos Adicionales

### 13.1 Enlaces Útiles
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

### 13.2 Comunidades de Soporte
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- [GitHub Issues](https://github.com/vercel/next.js/issues)
- [Discord Next.js](https://discord.gg/nextjs)

### 13.3 Herramientas Recomendadas
- **VS Code**: Editor de código con extensión Node.js
- **Postman**: Para probar APIs (si aplica)
- **Chrome DevTools**: Para debugging
- **GitKraken**: Cliente Git gráfico

---

## Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] npm 9+ funcionando
- [ ] Git configurado
- [ ] Código fuente clonado/descargado
- [ ] Dependencias instaladas
- [ ] Aplicación inicia en modo desarrollo
- [ ] Tests pasan exitosamente
- [ ] Funcionalidad básica verificada
- [ ] Caracteres especiales funcionan
- [ ] Exportación funciona

¡Una vez completados todos los pasos, el Transcriptor Español a Braille estará listo para usar!
