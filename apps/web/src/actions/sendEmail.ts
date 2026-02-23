"use server";

import nodemailer from "nodemailer";

export async function sendEmail(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;
    const subject = formData.get("subject") as string;

    if (!email || !description || !subject) {
        return { success: false, message: "Todos los campos son obligatorios." };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || "smtp.gmail.com",
            port: Number(process.env.MAIL_PORT) || 465,
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER || process.env.EMAIL_USER,
                pass: process.env.MAIL_PASS || process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_FROM || process.env.MAIL_USER || process.env.EMAIL_USER,
            to: process.env.TARGET_EMAIL || "breakthebeat.dance@gmail.com",
            subject: `Pedido de [${subject}] - Breakthebeat`,
            text: `Nuevo pedido de servicio: ${subject}\n\nEmail del cliente: ${email}\n\nDescripción del evento/pedido:\n${description}`,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: "¡Tu mensaje ha sido enviado con éxito!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Uh oh, hubo un problema enviando el correo. Inténtalo de nuevo." };
    }
}
