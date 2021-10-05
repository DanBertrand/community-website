/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    resetMocks: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__test__/config/importJestDOM.ts'],
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'ts-jest',
    },
};
