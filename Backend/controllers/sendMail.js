import transporter from "../config/nodemailer.js";
import Contact from "../models/contactModel.js";

const sendMail = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide your Name, Email, and Message.",
    });
  }

  try {
    // 1. Save inquiry to MongoDB
    let savedContact = null;
    try {
      savedContact = await Contact.create({
        name,
        email,
        phone: phone || "",
        subject: subject || "Website Inquiry",
        message,
      });
    } catch (dbErr) {
      console.warn("Could not save to MongoDB:", dbErr.message);
    }

    // 2. Send email via Nodemailer
    let emailSent = false;
    try {
      const recipient = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: `"Nature Harvest Website" <${process.env.EMAIL_USER}>`,
          replyTo: email,
          to: recipient,
          subject: `New Contact Inquiry: ${subject || "No Subject"} from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <div style="background-color: #075657; color: white; padding: 24px; text-align: center;">
                <h2 style="margin: 0; font-size: 22px;">Nature Harvest</h2>
                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">New Website Contact Inquiry</p>
              </div>
              <div style="padding: 24px; color: #333333; line-height: 1.6;">
                <p style="margin-top: 0; font-size: 15px;">You have received a new enquiry through the contact form:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 0; font-weight: bold; width: 110px; color: #4a5568;">Name:</td>
                    <td style="padding: 10px 0; color: #1a202c;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Email:</td>
                    <td style="padding: 10px 0; color: #1a202c;"><a href="mailto:${email}" style="color: #075657; text-decoration: underline;">${email}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Phone:</td>
                    <td style="padding: 10px 0; color: #1a202c;"><a href="tel:${phone}" style="color: #1a202c;">${phone || "Not provided"}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #edf2f7;">
                    <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Subject:</td>
                    <td style="padding: 10px 0; color: #1a202c;">${subject || "General Inquiry"}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; padding: 16px; background-color: #f7fafc; border-left: 4px solid #f2a318; border-radius: 4px;">
                  <p style="margin: 0; font-weight: bold; color: #075657;">Message:</p>
                  <p style="margin: 8px 0 0 0; white-space: pre-wrap; color: #2d3748; font-size: 14px;">${message}</p>
                </div>
              </div>
              <div style="background-color: #f8f9fa; padding: 14px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #e2e8f0;">
                Sent automatically from Nature Harvest Contact Form
              </div>
            </div>
          `,
        });
        emailSent = true;
      }
    } catch (mailErr) {
      console.error("Nodemailer error:", mailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. Our team will get back to you soon.",
      saved: !!savedContact,
      emailSent,
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error.message,
    });
  }
};

export default sendMail;