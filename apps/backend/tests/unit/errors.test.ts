import { describe, expect, it } from 'vitest';

import {AppError} from '../../src/utils/AppError.js';

describe('AppError', () => {
    it('debería crear una instancia de AppError con los parámetros correctos', () => {
        const error = new AppError('Test error message', 400, 'TEST_ERROR');

        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe('Test error message');
        expect(error.statusCode).toBe(400);
        expect(error.isOperational).toBe(true);
    }
    );

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
