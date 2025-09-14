import { resendClient , sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

// step134: now lets create a function to send the welcome email to users when they sign up now below.

// step135: it has the following parameters passed when called here below ; the recipient's email address , receipient's name , and the clientURL to be used in the email template.
export const sendWelcomeEmail = async (email,name,clientURL) => {

    // step136: now we extract data and error from the response of the resendClient.emails.send function here below ; where resendClient uses resend API client to send email ; resendClient is an object made using API key earlier ; then we call the send method below to send email using the details passed inside it below.
    const {data,error} = await resendClient.emails.send({

        // step137: const sender = { name: "Chatrix", email: "noreply@chatrix.com" }; so it sends it as : "Chatrix Team <noreply@chatrix.com>" for example.
        from:`${sender.name} <${sender.email}>`,

        // step138: sends to the below reciepient's email address with the subject mentioned below.
        to: email,
        subject:"Welcome to Chatrix",

        // step139: we also pass the actual body/content of the email, in HTML format made in emailTemplates.js file now below.
        html: createWelcomeEmailTemplate(name,clientURL)
    });

    // step140: let snow handle if there is some error or not here below ; as we had catched the error in the "error" variable above.
    if(error) {
        console.log("Error sending email",error);
        throw new Error("Failed to send the welcome email");
    } 
    
    // step141: else if no error there log the "data" sent with success message here below.

    // step142: see the next steps in auth.controller.js file now there.
    else {
        console.log("Welcome Email sent successfully",data);
    }
}