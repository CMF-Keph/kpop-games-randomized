# Guía de Testing

## Configuración

El proyecto está configurado con:
- **Jest**: Framework de testing
- **React Testing Library**: Librería para testear componentes de React
- **@testing-library/jest-dom**: Matchers personalizados para Jest

## Estructura de Tests

Los tests se pueden ubicar en dos lugares:

1. **Carpeta `__tests__`**: Coloca los tests en la misma carpeta que el componente/archivo
   ```
   app/games/guess-the-kpop/
   ├── GuessGame.tsx
   └── __tests__/
       └── GuessGame.test.tsx
   ```

2. **Nombre con sufijo `.test` o `.spec`**: Coloca el test en cualquier carpeta con el sufijo
   ```
   app/games/guess-the-kpop/GuessGame.test.tsx
   ```

## Scripts Disponibles

```bash
# Ejecutar tests una sola vez
npm test

# Ejecutar tests en modo watch (se re-ejecutan al cambiar archivos)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## Ejemplo Básico

Ver los tests creados en:
- [__tests__/example.test.ts](../__tests__/example.test.ts) - Ejemplos básicos de testing
- [app/games/guess-the-kpop/__tests__/GuessGame.test.tsx](./GuessGame.test.tsx) - Test de componente React

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
