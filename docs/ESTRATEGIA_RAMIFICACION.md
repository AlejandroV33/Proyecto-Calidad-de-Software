# Estrategia de Ramificación - Transcriptor Español a Braille

## 1. Visión General

Este documento establece la estrategia de ramificación (branching strategy) para el proyecto **Transcriptor Español a Braille**, siguiendo las mejores prácticas de Gitflow adaptadas a nuestro contexto.

### 1.1 Objetivos
- Mantener el código estable en la rama `main`
- Facilitar el desarrollo colaborativo
- Asegurar la calidad del código mediante revisiones
- Proporcionar un flujo de trabajo claro y documentado
- Separar desarrollo de documentación

## 2. Ramas Principales

### 2.1 Rama `main`
- **Propósito**: Código estable y production-ready
- **Reglas**:
  - Solo contiene código probado y funcional
  - No se permite desarrollo directo en esta rama
  - Solo se puede actualizar mediante Pull Requests desde `develop`
  - Cada commit en main debe tener un tag de versión
- **Protección**: Branch protection activada
- **Requerimientos**: 
  - Aprobación de al menos 2 revisores
  - Todos los tests deben pasar
  - Build exitoso

### 2.2 Rama `develop`
- **Propósito**: Integración de características
- **Reglas**:
  - Contiene el código más reciente del desarrollo
  - Puede tener características inestables
  - Base para nuevas ramas de características
  - Se actualiza mediante Pull Requests desde feature branches
- **Protección**: Branch protection activada
- **Requerimientos**: Tests exitosos y build correcto

### 2.3 Rama `documentacion`
- **Propósito**: Desarrollo y mantenimiento de documentación
- **Reglas**:
  - Contiene toda la documentación del proyecto
  - No contiene código funcional
  - Se puede actualizar directamente (sin PR obligatorio)
  - Base para mejoras en documentación
- **Contenido**:
  - Manual de usuario
  - Manual de instalación
  - Documentación técnica
  - Casos de prueba
  - Guías de desarrollo

## 3. Ramas de Soporte

### 3.1 Feature Branches (`feature/*`)
- **Propósito**: Desarrollo de nuevas características
- **Nomenclatura**: `feature/nombre-caracteristica`
- **Origen**: `develop`
- **Destino**: `develop` (mediante Pull Request)
- **Ejemplos**:
  - `feature/transcripcion-numeros`
  - `feature/interfaz-usuario`
  - `feature/exportacion-pdf`

### 3.2 Bugfix Branches (`bugfix/*`)
- **Propósito**: Corrección de bugs en producción
- **Nomenclatura**: `bugfix/descripcion-bug`
- **Origen**: `main`
- **Destino**: `main` y `develop` (mediante Pull Request)
- **Ejemplos**:
  - `bugfix/error-transcripcion-acentos`
  - `bugfix/memory-leak-interface`

### 3.3 Hotfix Branches (`hotfix/*`)
- **Propósito**: Correcciones urgentes en producción
- **Nomenclatura**: `hotfix/correction-urgente`
- **Origen**: `main`
- **Destino**: `main` (directamente) y `develop`
- **Proceso**:
  1. Crear desde `main`
  2. Realizar corrección
  3. Merge a `main` con tag de versión
  4. Merge a `develop`

### 3.4 Release Branches (`release/*`)
- **Propósito**: Preparación de nuevas versiones
- **Nomenclatura**: `release/vX.Y.Z`
- **Origen**: `develop`
- **Destino**: `main` y `develop`
- **Actividades**:
  - Testing final
  - Corrección de bugs menores
  - Actualización de documentación
  - Preparación de release notes

## 4. Flujo de Trabajo

### 4.1 Desarrollo de Nueva Característica

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear feature branch
git checkout -b feature/nueva-caracteristica

# 3. Desarrollo
# ... escribir código, commits ...

# 4. Push al remoto
git push origin feature/nueva-caracteristica

# 5. Crear Pull Request a develop
# 6. Revisión y aprobación
# 7. Merge a develop
# 8. Eliminar feature branch
```

### 4.2 Corrección de Bug

```bash
# Para bugs de producción
git checkout main
git pull origin main
git checkout -b bugfix/correction-bug
# ... desarrollo ...
git push origin bugfix/correction-bug
# Crear PR a main y develop

# Para bugs de desarrollo
git checkout develop
git pull origin develop
git checkout -b bugfix/dev-bug
# ... desarrollo ...
git push origin bugfix/dev-bug
# Crear PR a develop
```

### 4.3 Actualización de Documentación

```bash
# Para documentación
git checkout documentacion
git pull origin documentacion
# ... editar documentos ...
git add .
git commit -m "docs: actualizar manual de usuario"
git push origin documentacion
# No requiere Pull Request
```

## 5. Convenciones de Commits

### 5.1 Formato de Mensajes
```
<tipo>(<alcance>): <descripción>

[opcional: cuerpo]

[opcional: pie de página]
```

### 5.2 Tipos de Commits
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin lógica)
- `refactor`: Refactorización
- `test`: Agregar/modificar tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance

### 5.3 Ejemplos
```
feat(transcriber): agregar soporte para números

- Implementar mapeo de dígitos 0-9
- Agregar indicador numérico
- Actualizar tests

Closes #123

docs: actualizar manual de instalación

- Agregar requisitos del sistema
- Incluir pasos para Windows/Mac/Linux
- Agregar troubleshooting

fix(interface): error en validación de entrada

- Corregir límite de caracteres
- Mejorar mensajes de error
- Actualizar tests unitarios
```

## 6. Pull Requests

### 6.1 Plantilla de PR
```markdown
## Descripción
Breve descricripción de los cambios implementados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pasan
- [ ] Integration tests pasan
- [ ] Manual testing realizado
- [ ] Casos de prueba documentados

## Checklist
- [ ] Código sigue las convenciones
- [ ] Self-review completado
- [ ] Comentarios de PR respondidos
- [ ] Documentación actualizada
- [ ] Tests agregados/actualizados

## Issues Relacionados
Closes #123
```

### 6.2 Requerimientos de PR
- Título descriptivo siguiendo convenciones
- Descripción clara de cambios
- Tests actualizados/agregados
- Documentación actualizada si aplica
- Sin conflictos de merge
- Build exitoso

## 7. Integración Continua

### 7.1 GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
      - name: Build project
        run: npm run build
```

### 7.2 Protección de Ramas
```yaml
# Configuración de branch protection
main:
  required_reviews: 2
  dismiss_stale_reviews: true
  require_code_owner_reviews: true
  require_up_to_date: true
  required_status_checks:
    - ci/circleci: build
    - codecov/patch

develop:
  required_reviews: 1
  dismiss_stale_reviews: true
  require_up_to_date: true
  required_status_checks:
    - ci/circleci: build
```

## 8. Versionamiento

### 8.1 Semantic Versioning
- **Major**: Cambios breaking (X.0.0)
- **Minor**: Nuevas características (X.Y.0)
- **Patch**: Correcciones de bugs (X.Y.Z)

### 8.2 Tags de Versión
```bash
# Crear tag de versión
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags
```

### 8.3 Release Notes
Generados automáticamente desde commits:
```bash
# Usando conventional-changelog
npm run release
```

## 9. Manejo de Conflictos

### 9.1 Prevención
- Mantener branches actualizadas
- Comits pequeños y frecuentes
- Comunicación entre desarrolladores

### 9.2 Resolución
```bash
# Actualizar branch
git checkout feature/mi-caracteristica
git pull origin develop

# Resolver conflictos
# ... editar archivos ...

# Continuar merge
git add .
git commit -m "resolve: conflictos con develop"
git push origin feature/mi-caracteristica
```

## 10. Buenas Prácticas

### 10.1 Generales
- Commits atómicos y descriptivos
- Branches de vida corta
- Testing continuo
- Revisión de código obligatoria
- Documentación actualizada

### 10.2 Específicas del Proyecto
- Validar caracteres Braille en cada PR
- Incluir casos de prueba para nuevas características
- Actualizar mapeo de caracteres si es necesario
- Documentar cambios en el sistema Braille

## 11. Herramientas Recomendadas

### 11.1 Git
- **GUI**: SourceTree, GitKraken
- **CLI**: Git con aliases personalizados
- **Integración**: VS Code Git integration

### 11.2 GitHub
- **GitHub CLI**: gh para operaciones rápidas
- **GitHub Desktop**: Para usuarios no técnicos
- **GitHub Actions**: Para CI/CD

### 11.3 Code Quality
- **ESLint**: Linting de código
- **Prettier**: Formato de código
- **Husky**: Git hooks
- **Commitlint**: Validación de commits

---

Esta estrategia asegura un desarrollo ordenado, código de alta calidad y documentación completa para el proyecto Transcriptor Español a Braille.
