const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.APP_USERNAME, //  sender gmail address
        pass: process.env.APP_PASSWORD,  // app password of sender gmail
    },
});

const mailOptions = {
    from: {
        name: "samer",
        address: process.env.USER
    }, // sender address
    to: ["mdsameransari45@gmail.com"], // list of receivers
    subject: "Completion of Contract Agreement Between Buyer and Farmers", // Subject line
    html: `
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; padding: 20px; background-color: #ffffff;">
                    <tr>
                        <td>
                            <h2 style="color: #2c3e50;">The Contract Agreement is Done</h2>
                            <p>Dear [Recipient's Name],</p>
                            <p>I hope this message finds you well.</p>

                            <p>I am writing to inform you that the contract between [Buyer’s Name/Company] and [Farmers’ Name/Organization] has been successfully completed as per the agreed terms. We have appreciated your collaboration throughout this process, and we believe that this partnership has been mutually beneficial.</p>

                            <p>For your records, please find the finalized and signed contract attached to this email.</p>

                            <p>If you have any questions or require any further information, please do not hesitate to reach out. We look forward to the possibility of working together again in the future.</p>

                            <p>Thank you for your professionalism and commitment to this agreement.</p>

                            <p>Best regards,</p>
                            <p><strong>[Your Name]</strong><br>
                            [Your Position]<br>
                            [Your Company Name]<br>
                            [Your Contact Information]</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
  `, // html body,
    attachments: [
        {
            filename: "contract.pdf",
            path: path.join(__dirname, 'generate/contract.pdf'),
            contentType: "application/pdf",
        },
    ],
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (e) {
        console.log(process.env)
        console.log(e);
    }
}

sendMail(transporter, mailOptions);