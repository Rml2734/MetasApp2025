export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },
    // Agregar un patrón explícito para los archivos de prueba
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)',
      '**/privado/**/*.test.js', // Asegura que se busquen las pruebas dentro de la carpeta privada
      '**/publico/**/*.test.js',
    ],
  };