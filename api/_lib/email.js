import nodemailer from "nodemailer";

// Replace with your product/site name, or set EMAIL_FROM_NAME and reference
// process.env.EMAIL_FROM_NAME here instead of a literal.
const APP_NAME = "XKogni.ai";

const MODE_LABELS = {
  element: "a live page element",
  copy: "a copy block",
};

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
}

function fromAddress() {
  const name = process.env.EMAIL_FROM_NAME || APP_NAME;
  const address = process.env.EMAIL_FROM_ADDRESS;
  return address ? `"${name}" <${address}>` : undefined;
}

export async function sendMagicLinkEmail({ email, link }) {
  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: email,
      subject: `Your ${APP_NAME} login link`,
      text: `Click the link below to log in to the ${APP_NAME} tool. This link expires in 15 minutes and can only be used once.\n\n${link}\n\nIf you didn't request this, you can ignore this email.`,
      html: `<p>Click the link below to log in to the ${APP_NAME} tool.</p><p><a href="${link}">${link}</a></p><p>This link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.</p>`,
    });
  } catch (err) {
    console.error("feedback: failed to send magic-link email (check SMTP config)", err);
  }
}

export async function sendNewCommentNotification({ comment, frontendUrl }) {
  const notifyEmail = process.env.FEEDBACK_NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.warn(
      "feedback: FEEDBACK_NOTIFY_EMAIL is not set — skipping new-comment notification email. " +
        "Set it in your runtime environment to receive these."
    );
    return;
  }

  const link =
    comment.mode === "copy" ? `${frontendUrl}/feedback/copy` : `${frontendUrl}${comment.pagePath}`;

  const contextLines = [
    `Page: ${comment.pageLabel || comment.pagePath} (${comment.pagePath})`,
    `Type: ${MODE_LABELS[comment.mode] || comment.mode}`,
    comment.elementLabel ? `Section: ${comment.elementLabel}` : null,
    comment.textSnapshot ? `Referring to: "${comment.textSnapshot}"` : null,
    `From: ${comment.reviewerEmail}`,
  ].filter(Boolean);

  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: notifyEmail,
      subject: `New feedback on ${comment.pageLabel || comment.pagePath}`,
      text: `${contextLines.join("\n")}\n\nRequested change:\n${comment.note}\n\nView: ${link}`,
      html: `<p>${contextLines.join("<br/>")}</p><p><strong>Requested change:</strong><br/>${comment.note}</p><p><a href="${link}">${link}</a></p>`,
    });
  } catch (err) {
    console.error("feedback: failed to send comment notification email (check SMTP config)", err);
  }
}
