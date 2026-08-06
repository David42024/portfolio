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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const PRIMARY = "#10b981";
const BG = "#0b0f0e";
const CARD = "#ffffff";
const TEXT = "#111827";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";

// CAMBIO: plantillas rediseñadas alineadas con la identidad del portfolio
// (acento verde #10b981, layout de tarjeta limpio, footer con datos del autor).
// Solo estilos inline por compatibilidad con clientes de correo.
const buildLayout = (preview: string, title: string, bodyHtml: string): string => {
  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BG};color:${TEXT};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
            <!-- Encabezado -->
            <tr>
              <td style="background-color:${PRIMARY};border-radius:12px 12px 0 0;padding:24px 32px;">
                <p style="margin:0;color:#0b0f0e;font-size:14px;font-weight:bold;letter-spacing:1px;">DAVID LUCANO · BACKEND DEVELOPER</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;line-height:1.2;">${title}</h1>
              </td>
            </tr>
            <!-- Cuerpo -->
            <tr>
              <td style="background-color:${CARD};border-radius:0 0 12px 12px;padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <!-- Pie -->
            <tr>
              <td style="padding:20px 32px 0;text-align:center;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">
                  Portfolio de David Lucano · Backend Developer<br />
                  <a href="https://portfolio-frontend-iota-drab.vercel.app" style="color:${PRIMARY};text-decoration:none;">portfolio-frontend-iota-drab.vercel.app</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const buildContactEmailHtml = (payload: ContactPayload): string => {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  const body = `
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
      Recibiste un nuevo mensaje a través de tu portfolio.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;background-color:#f9fafb;border:1px solid ${BORDER};border-radius:8px;">
          <p style="margin:0 0 8px;"><strong style="color:${TEXT};">Nombre:</strong> <span style="color:${MUTED};">${safeName}</span></p>
          <p style="margin:0;"><strong style="color:${TEXT};">Email:</strong> <a href="mailto:${safeEmail}" style="color:${PRIMARY};text-decoration:none;">${safeEmail}</a></p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:13px;color:${MUTED};text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:16px 20px;background-color:#f9fafb;border-left:4px solid ${PRIMARY};border-radius:0 8px 8px 0;">
          <p style="margin:0;font-size:15px;line-height:1.7;">${safeMessage}</p>
        </td>
      </tr>
    </table>
  `;

  return buildLayout(
    `Nuevo contacto de ${payload.name}`,
    "Nuevo mensaje en tu portfolio",
    body
  );
};

const buildConfirmationEmailHtml = (name: string): string => {
  const safeName = escapeHtml(name);

  const body = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hola <strong>${safeName}</strong>,</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Gracias por escribirme. He recibido tu mensaje correctamente y me pondré en contacto contigo
      lo antes posible para hablar de tu proyecto.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
      Mientras tanto, si necesitas añadir algo más, no dudes en responder a este correo.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:4px 0 8px;">
          <span style="display:inline-block;font-size:20px;">&lt;/&gt;</span>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:15px;line-height:1.6;">Saludos,</p>
    <p style="margin:0;font-size:16px;font-weight:bold;color:${TEXT};">David Lucano</p>
    <p style="margin:4px 0 0;font-size:13px;color:${MUTED};">Backend Developer</p>
  `;

  return buildLayout(
    "Hemos recibido tu mensaje",
    "¡Gracias por tu mensaje!",
    body
  );
};

export const emailService = {
  async sendContactNotification(payload: ContactPayload): Promise<boolean> {
    if (!resend || !env.CONTACT_EMAIL) {
      return false;
    }

    const from = env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: env.CONTACT_EMAIL,
      subject: `Nuevo contacto de ${payload.name}`,
      html: buildContactEmailHtml(payload),
      replyTo: payload.email,
    });

    if (error) {
      throw new Error(error.message || "Error sending contact notification email");
    }

    return true;
  },

  async sendContactConfirmation(payload: ContactPayload): Promise<boolean> {
    if (!resend) {
      return false;
    }

    const from = env.CONTACT_EMAIL_FROM || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: payload.email,
      subject: "Hemos recibido tu mensaje ✓",
      html: buildConfirmationEmailHtml(payload.name),
    });

    if (error) {
      throw new Error(error.message || "Error sending contact confirmation email");
    }

    return true;
  },
};