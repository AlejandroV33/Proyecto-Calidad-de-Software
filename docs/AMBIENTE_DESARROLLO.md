# Documentación del Ambiente de Desarrollo

## 1. Herramientas Seleccionadas

### 1.1 Stack Tecnológico Principal
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript 5.4+
- **Estilos**: TailwindCSS 3.4+
- **Build Tool**: Next.js (integrado)
- **Package Manager**: npm 9+

### 1.2 Herramientas de Desarrollo
- **IDE**: Visual Studio Code
- **Version Control**: Git + GitHub
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript Compiler

### 1.3 Extensiones de VS Code Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "github.copilot",
    "ms-vscode.test-adapter-converter",
    "humao.rest-client"
  ]
}
```

## 2. Configuración del Entorno

### 2.1 Requisitos del Sistema
- **Node.js**: 18.17+ (recomendado 20.x)
- **npm**: 9.0+ (incluido con Node.js)
- **Git**: 2.30+
- **Sistema Operativo**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### 2.2 Instalación de Node.js
```bash
# Usando nvm (recomendado)
nvm install 20
nvm use 20
nvm alias default 20

# Verificar instalación
node --version
npm --version
```

### 2.3 Configuración de Git
```bash
# Configuración global
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Configuración para el proyecto
git config core.autocrlf input  # Linux/Mac
git config core.autocrlf true   # Windows
```

## 3. Flujo de Trabajo

### 3.1 Estructura de Directorios
```
Proyecto-Primer-Bimestre/
├── src/                          # Código fuente
│   ├── app/                      # App Router Next.js
│   ├── components/               # Componentes React
│   │   ├── braille/             # Componentes Braille
│   │   └── ui/                  # Componentes UI base
│   ├── lib/                     # Lógica de negocio
│   ├── types/                   # Definiciones TypeScript
│   └── utils/                   # Utilidades
├── docs/                        # Documentación
├── tests/                       # Pruebas
├── public/                      # Assets estáticos
└── 配置文件/                    # Archivos de configuración
```

### 3.2 Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar tests
npm test

# Linting del código
npm run lint

# Formatear código
npm run format

# Type checking
npm run type-check
```

### 3.3 Flujo de Trabajo Diario

#### 3.3.1 Inicio del Día
```bash
# 1. Actualizar rama principal
git checkout develop
git pull origin develop

# 2. Crear nueva rama de trabajo
git checkout -b feature/nueva-caracteristica

# 3. Iniciar servidor de desarrollo
npm run dev
```

#### 3.3.2 Durante el Desarrollo
```bash
# Commits frecuentes y descriptivos
git add .
git commit -m "feat(component): agregar nuevo componente"

# Push periódico para backup
git push origin feature/nueva-caracteristica

# Ejecutar tests regularmente
npm test
```

#### 3.3.3 Fin del Día
```bash
# Commit final del día
git add .
git commit -m "wip: progreso en característica X"
git push origin feature/nueva-caracteristica

# Crear Pull Request si está listo
# (via GitHub interface)
```

## 4. Configuración del Proyecto

### 4.1 package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "prepare": "husky install"
  }
}
```

### 4.2 Configuración de ESLint
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 4.3 Configuración de Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 4.4 Configuración de Husky (Git Hooks)
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## 5. Testing

### 5.1 Configuración de Jest
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### 5.2 Estructura de Tests
```
tests/
├── unit/                    # Tests unitarios
│   ├── components/
│   ├── lib/
│   └── utils/
├── integration/             # Tests de integración
├── e2e/                    # Tests end-to-end
└── fixtures/               # Datos de prueba
```

### 5.3 Comandos de Testing
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar tests específicos
npm test -- --testNamePattern="BrailleTranscriber"

# Ejecutar tests de un archivo
npm test -- tests/unit/lib/braille-transcriber.test.ts
```

## 6. Debugging

### 6.1 Debugging en VS Code
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    }
  ]
}
```

### 6.2 Debugging en Browser
```javascript
// Para debugging de componentes
console.log('Debug:', { variable });

// Para debugging de transcripción
if (process.env.NODE_ENV === 'development') {
  console.log('Transcription result:', result);
}
```

## 7. Optimización del Desarrollo

### 7.1 Configuración de VS Code
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 7.2 Atajos de Teclado Útiles
- `Ctrl+Shift+P`: Command Palette
- `Ctrl+P`: Quick Open
- `Ctrl+Shift+K`: Delete line
- `Alt+↑/↓`: Move line up/down
- `Ctrl+D`: Select next occurrence
- `Ctrl+Shift+L`: Select all occurrences

### 7.3 Snippets Personalizados
```json
// .vscode/snippets.code-snippets
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  ${2:// props}",
      "}",
      "",
      "export const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({",
      "  ${3:// props}",
      "}) => {",
      "  return (",
      "    <div>",
      "      ${4:// component content}",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ]
  }
}
```

## 8. Performance del Desarrollo

### 8.1 Optimización del Servidor de Desarrollo
```javascript
// next.config.js
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
}
```

### 8.2 Cache de Dependencias
```bash
# Limpiar cache si hay problemas
npm cache clean --force

# Usar cache de Docker para builds más rápidos
docker build --cache-from myapp:latest -t myapp:latest .
```

### 8.3 Optimización de Tests
```javascript
// jest.setup.js
import '@testing-library/jest-dom';

// Mock de APIs globales
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## 9. Troubleshooting Común

### 9.1 Problemas Frecuentes

#### 9.1.1 Error de Dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

#### 9.1.2 Error de TypeScript
```bash
# Limpiar cache de TypeScript
npx tsc --build --clean

# Verificar configuración
npx tsc --showConfig
```

#### 9.1.3 Error de ESLint
```bash
# Resetear configuración
npx eslint --init

# Verificar configuración
npx eslint --print-config src/app/page.tsx
```

### 9.2 Recursos de Ayuda
- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/next.js

## 10. Buenas Prácticas

### 10.1 Código Limpio
- Componentes pequeños y enfocados
- Nombres descriptivos
- Comentarios donde sea necesario
- Tipado estricto en TypeScript

### 10.2 Git Higiene
- Commits atómicos
- Mensajes descriptivos
- Branches de vida corta
- Pull requests bien descritos

### 10.3 Testing
- Tests para cada nueva característica
- Cobertura mínima del 80%
- Tests descriptivos y mantenibles
- Mocks para dependencias externas

---

Este ambiente de desarrollo está optimizado para productividad, calidad de código y colaboración efectiva en el proyecto Transcriptor Español a Braille.
