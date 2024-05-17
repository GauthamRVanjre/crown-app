import { resend } from "@/lib/utils/resend";
import { EmailTemplate } from "@/lib/utils/email-template";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,
      to: ["thecrownsoceity@gmail.com"],
      subject,
      react: EmailTemplate({ name, email, message }),
      text: "",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
