import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Proporciona la ruta al archivo de configuración de Next.js para cargar variables de entorno
  dir: './',
})

// Añade cualquier configuración personalizada de Jest aquí
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Añade más configuración aquí si es necesario
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
}

// createJestConfig es exportado desta manera para asegurar que next/jest
// puede cargar la configuración de Next.js
export default createJestConfig(config)
