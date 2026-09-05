import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // La Etapa 1 no incluye tests (llegan en la Etapa 3 con tests/lanzamiento.test.ts);
    // CI debe pasar mientras tanto sin afirmar cobertura que no existe.
    passWithNoTests: true,
  },
})
