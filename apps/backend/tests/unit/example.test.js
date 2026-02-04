"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Ejemplo de test', () => {
    (0, vitest_1.it)('debería sumar correctamente', () => {
        const suma = 2 + 3;
        (0, vitest_1.expect)(suma).toBe(5);
    });
});
