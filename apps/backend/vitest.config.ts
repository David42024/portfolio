import { defineConfig } from "vitest/config";


export default defineConfig({
  test: {
    // Carpeta donde buscar tests
    include: ["tests/**/*.test.ts"],

    // Archivo que corre antes de todos los tests
    globalSetup: ["tests/globalSetup.ts"],

    // Entorno de ejecución
    environment: "node",

    // Mostrar más detalle en consola
    reporters: ["verbose"],

    // Variables de entorno para tests
    env: {
      NODE_ENV: "test",
    },
    
    // Timeout por test (ms)
    testTimeout: 10000,
  },
});