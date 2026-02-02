import {describe, it, expect} from 'vitest';

describe('Ejemplo de test', () => {
  it('debería sumar correctamente', () => {
    const suma = 2 + 3;
    expect(suma).toBe(5);
  });
});