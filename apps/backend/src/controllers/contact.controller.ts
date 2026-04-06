import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { contactRepository } from "../repositories/contact.repository.js";
import { AppError } from "../utils/AppError.js";
import { emailService } from "../services/email.service.js";

// Schema de validación
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

// POST /api/v1/contact
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validar datos
    const validatedData = contactSchema.parse(req.body);

    // Crear mensaje
    const contact = await contactRepository.create(validatedData);

    // El envio de emails no debe romper el guardado del contacto
    try {
      // Notificar al admin
      await emailService.sendContactNotification(validatedData);
      // Auto-respuesta al usuario
      await emailService.sendContactConfirmation(validatedData);
    } catch (emailError) {
      console.error("Error sending contact emails:", emailError);
    }

    res.status(201).json({
      success: true,
      message: "Mensaje enviado correctamente",
      data: {
        id: contact.id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(
        new AppError(
          error.issues.map((e: z.ZodIssue) => e.message).join(", "),
          400
        )
      );
    }
    next(error);
  }
};