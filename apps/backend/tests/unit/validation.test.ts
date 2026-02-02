import { describe, it, expect } from "vitest";
import { z } from "zod";

/**
 * Testeamos el schema de validación directamente
 * Esto es lógica pura, no necesita mocks
 */

// Schema igual al del controller
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z.string().email("Email inválido"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
});

describe("Contact Schema Validation", () => {
  describe("datos válidos", () => {
    it("acepta datos correctos", () => {
      const validData = {
        name: "Juan Pérez",
        email: "juan@email.com",
        message: "Este es un mensaje de prueba válido",
      };

      const result = contactSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("acepta nombre con 2 caracteres", () => {
      const data = {
        name: "Jo",
        email: "jo@email.com",
        message: "Mensaje válido con más de 10 caracteres",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(true);
    });
  });

  describe("name", () => {
    it("rechaza nombre vacío", () => {
      const data = {
        name: "",
        email: "test@email.com",
        message: "Mensaje válido con más de 10 caracteres",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(false);
    });

    it("rechaza nombre con 1 carácter", () => {
      const data = {
        name: "J",
        email: "test@email.com",
        message: "Mensaje válido con más de 10 caracteres",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(false);
    });

    it("rechaza nombre mayor a 100 caracteres", () => {
      const data = {
        name: "a".repeat(101),
        email: "test@email.com",
        message: "Mensaje válido con más de 10 caracteres",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(false);
    });
  });

  describe("email", () => {
    it("rechaza email inválido", () => {
      const invalidEmails = [
        "notanemail",
        "missing@domain",
        "@nodomain.com",
        "spaces in@email.com",
        "",
      ];

      invalidEmails.forEach((email) => {
        const data = {
          name: "Test User",
          email,
          message: "Mensaje válido con más de 10 caracteres",
        };

        const result = contactSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });

    it("acepta emails válidos", () => {
      const validEmails = [
        "test@email.com",
        "user.name@domain.org",
        "user+tag@email.co.uk",
      ];

      validEmails.forEach((email) => {
        const data = {
          name: "Test User",
          email,
          message: "Mensaje válido con más de 10 caracteres",
        };

        const result = contactSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });

  describe("message", () => {
    it("rechaza mensaje con menos de 10 caracteres", () => {
      const data = {
        name: "Test User",
        email: "test@email.com",
        message: "Corto",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(false);
    });

    it("rechaza mensaje mayor a 1000 caracteres", () => {
      const data = {
        name: "Test User",
        email: "test@email.com",
        message: "a".repeat(1001),
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(false);
    });

    it("acepta mensaje de exactamente 10 caracteres", () => {
      const data = {
        name: "Test User",
        email: "test@email.com",
        message: "1234567890",
      };

      const result = contactSchema.safeParse(data);

      expect(result.success).toBe(true);
    });
  });
});