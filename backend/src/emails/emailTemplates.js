export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chatrix</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
    <center>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.05);">
              
              <!-- Header section -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 12px 12px 0 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <img src="https://static.thenounproject.com/png/email-icon-36696-512.png" alt="Chatrix Logo" width="90" height="90" style="display: block; background: white; border-radius: 50%; padding: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); margin: 0 auto 20px;">
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: 0.5px;">Welcome to Chatrix!</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Real-time messaging for everyone</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main content section -->
              <tr>
                <td style="padding: 40px 35px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <!-- Greeting -->
                    <tr>
                      <td>
                        <p style="font-size: 18px; color: #667eea; margin-top: 0;"><strong>Hello ${name},</strong></p>
                        <p style="font-size: 16px; color: #4a5568;">We're thrilled to welcome you to our messaging platform! Chatrix connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
                      </td>
                    </tr>
                    
                    <!-- Feature highlights -->
                    <tr>
                      <td style="background: #f8f9ff; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #667eea;">
                        <p style="font-size: 18px; margin: 0 0 15px 0; color: #4a5568; font-weight: 600;">Get started in just a few steps:</p>
                        
                        <table width="100%" cellpadding="0" cellspacing="15" border="0">
                          <tr>
                            <!-- Profile -->
                            <td width="50%" align="center" valign="top" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                              <img src="https://static.thenounproject.com/png/profile-icon-3437178-512.png" alt="Profile Icon" width="50" height="50" style="display: block; margin: 0 auto 10px; background: #f0f5ff; border-radius: 50%; padding: 10px;">
                              <p style="margin: 0; font-size: 14px; color: #4a5568;">Set up your profile</p>
                            </td>
                            
                            <!-- Contacts -->
                            <td width="50%" align="center" valign="top" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                              <img src="https://static.thenounproject.com/png/contact-book-icon-2358795-512.png" alt="Contacts Icon" width="50" height="50" style="display: block; margin: 0 auto 10px; background: #f0f5ff; border-radius: 50%; padding: 10px;">
                              <p style="margin: 0; font-size: 14px; color: #4a5568;">Find contacts</p>
                            </td>
                          </tr>
                          <tr>
                            <!-- Chat -->
                            <td width="50%" align="center" valign="top" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                              <img src="https://static.thenounproject.com/png/chat-icon-7801388-512.png" alt="Chat Icon" width="50" height="50" style="display: block; margin: 0 auto 10px; background: #f0f5ff; border-radius: 50%; padding: 10px;">
                              <p style="margin: 0; font-size: 14px; color: #4a5568;">Start chatting</p>
                            </td>
                            
                            <!-- Media -->
                            <td width="50%" align="center" valign="top" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                              <img src="https://static.thenounproject.com/png/media-icon-7829606-512.png" alt="Media Icon" width="50" height="50" style="display: block; margin: 0 auto 10px; background: #f0f5ff; border-radius: 50%; padding: 10px;">
                              <p style="margin: 0; font-size: 14px; color: #4a5568;">Share media</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                      <td align="center" style="padding: 20px 0 30px;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                              <a href="${clientURL}" style="display: inline-block; padding: 14px 35px; color: white; text-decoration: none; font-weight: 500; font-size: 16px;">Open Chatrix</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Closing -->
                    <tr>
                      <td>
                        <p style="margin-bottom: 5px; color: #4a5568;">If you need any help or have questions, we're always here to assist you.</p>
                        <p style="margin-top: 0; color: #4a5568;">Happy messaging!</p>
                        <p style="margin-top: 30px; margin-bottom: 0; color: #4a5568;">Best regards,<br><strong style="color: #667eea;">The Chatrix Team</strong></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 25px 20px; background-color: #f8f9ff; border-radius: 0 0 12px 12px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="color: #a0aec0; font-size: 14px;">
                        <p style="margin: 0 0 15px 0;">© 2025 Chatrix. All rights reserved.</p>
                        <p style="margin: 0;">
                          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 12px;">Privacy Policy</a>
                          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 12px;">Terms of Service</a>
                          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 12px;">Contact Us</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>
  `;
}
