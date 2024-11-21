const nodemailer = require("nodemailer");

// פונקציה לשליחת תזכורת תשלום
const sendPaymentReminderEmail = (email, customerName, orderId) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // false עבור פורט 587
        auth: {
          user: "ic7.alloul@gmail.com",
          pass: "qgbb tczx qoin zrzc",
        },
        tls: {
          rejectUnauthorized: false, // עוקף שגיאות אבטחה, רק לצורך בדיקות
        },
      });
      
  const mailOptions = {
    from: "ic7.alloul@gmail.com",
    to: email,
    subject: `תזכורת לתשלום עבור הזמנה מס' ${orderId}`,
    text: `שלום ${customerName},\n\nנראה כי ההזמנה שלך (#${orderId}) עדיין ממתינה לתשלום. נשמח אם תסדיר את התשלום בהקדם.\n\nתודה,\nהצוות שלנו.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendPaymentReminderEmail;
