"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const AppError_js_1 = require("../../src/utils/AppError.js");
(0, vitest_1.describe)('AppError', () => {
    (0, vitest_1.it)('debería crear una instancia de AppError con los parámetros correctos', () => {
        const error = new AppError_js_1.AppError('Test error message', 400, 'TEST_ERROR');
        (0, vitest_1.expect)(error).toBeInstanceOf(AppError_js_1.AppError);
        (0, vitest_1.expect)(error.message).toBe('Test error message');
        (0, vitest_1.expect)(error.statusCode).toBe(400);
        (0, vitest_1.expect)(error.isOperational).toBe(true);
    });
    // Debería ser implementado en un futuro:
    /*it("usa status 500 por defecto", () => {
    const error = new AppError("Error interno");

    expect(error.statusCode).toBe(500);
  });
  */
});
// Debería ser implementado en un futuro:
/*
describe("NotFoundError", () => {
it("tiene status 404", () => {
const error = new NotFoundError("Usuario no encontrado");

expect(error.statusCode).toBe(404);
expect(error.message).toBe("Usuario no encontrado");
});

it("usa mensaje por defecto", () => {
const error = new NotFoundError();

expect(error.message).toBe("Recurso no encontrado");
});
});

*/
