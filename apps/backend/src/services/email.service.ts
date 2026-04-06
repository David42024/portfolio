import { Resend } from "resend";
import { env } from "../config/env.js";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const buildContactEmailHtml = (payload: ContactPayload): string => {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
      <h2 style="margin-bottom: 16px;">Nuevo mensaje desde tu portfolio</h2>
      <p style="margin: 4px 0;"><strong>Nombre:</strong> ${safeName}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> ${safeEmail}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="margin: 0 0 8px;"><strong>Mensaje:</strong></p>
      <p style="line-height: 1.6; margin: 0;">${safeMessage}</p>
    </div>
  `;
};

const buildConfirmationEmailHtml = (name: string): string => {
  const safeName = escapeHtml(name);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
      <h2 style="margin-bottom: 16px;">¡Gracias por contactarme!</h2>
      <p style="margin-bottom: 12px;">Hola ${safeName},</p>
      <p style="line-height: 1.6; margin-bottom: 12px;">
        He recibido tu mensaje correctamente. Me pondré en contacto contigo pronto para discutir tu proyecto.
      </p>
      <p style="line-height: 1.6; margin-bottom: 12px;">
        Mientras tanto, si tienes más preguntas, no dudes en responder a este correo.
      </p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 12px; color: #6b7280; margin: 0;">
        Este es un correo automático. Por favor, no respondas directamente a este mensaje.
      </p>
    </div>
  `;
};

export const emailService = {
  async sendContactNotification(payload: ContactPayload): Promise<boolean> {
    if (!resend || !env.CONTACT_EMAIL) {
      return false;
    }

    const from = env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: env.CONTACT_EMAIL,
      subject: `Nuevo contacto de ${payload.name}`,
      html: buildContactEmailHtml(payload),
      replyTo: payload.email,
    });

    return true;
  },

  async sendContactConfirmation(payload: ContactPayload): Promise<boolean> {
    if (!resend) {
      return false;
    }

    const from = env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: payload.email,
      subject: "Hemos recibido tu mensaje ✓",
      html: buildConfirmationEmailHtml(payload.name),
    });

    return true;
  },
};
