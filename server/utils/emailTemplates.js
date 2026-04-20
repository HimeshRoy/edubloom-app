export const getWelcomeTemplate = ({ name, studentId, studentEmail }) => {
    return `
 <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:12px;">
      
      <h2 style="background: linear-gradient(90deg,#6C5CE7,#a29bfe); -webkit-background-clip: text; color: transparent;">🎉 Welcome to EduBloom, Your Journey Starts Now 🚀</h2>

      <p style="font-size:16px;">Hi <b>${name}</b>,</p>

      <p style="color:#555;">
        Your learning journey has officially begun 🚀  
        We're excited to have you onboard. EduBloom is built to help you 
        study smarter, stay consistent, and achieve your goals faster.
      </p>

      <div style="background:#f1f3f5; padding:15px; border-radius:8px; margin:20px 0;">
        <p><b>🎓 Student ID:</b> ${studentId}</p>
        <p><b>📧 Student Email:</b> ${studentEmail}</p>
      </div>

      <h3 style="color:#6C5CE7;">📚 What You’ll Get</h3>
      <ul style="color:#555;">
        <li>✔ Structured lectures</li>
        <li>✔ Smart notes & revision</li>
        <li>✔ Live classes</li>
        <li>✔ Tests & performance tracking</li>
      </ul>

       <h3 style="color:#6C5CE7;">📚 Courses </h3>
      <ul style="color:#555;">
        <li> Mathematics</li>
        <li> Sceience (Physics, Chemsitry and Biology)</li>
      </ul>

      <br>
      <br>
      <div style="text-align:center; margin:20px 0;">
  <a href="https://edubloom-app.vercel.app"
     style="background:#6C5CE7; color:white; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold;">
     🚀 Start Learning Now
  </a>
</div>

      <div style="text-align:center; margin:25px 0;">
        <a href="https://whatsapp.com/channel/0029VbA2OQAJUM2aHgfbF01h"
           style="background:#25D366; color:white; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold;">
            Join Our WhatsApp Channel
        </a>
      </div>

      <div style="text-align:center; margin:20px 0;">
        <img 
          src="https://res.cloudinary.com/dpmpmxyfn/image/upload/v1776680542/edubloomLogo.png" 
          width="200"
        />
      </div>

      <p style="color:#555;">
        Stay connected with updates, important announcements, and learning tips!
      </p>

      <hr style="margin:20px 0;" />

      <p style="font-size:13px; color:#999;">
        Need help? Reach out anytime at  
        <b>nexgen.roygroup.edu@gmail.com</b>
      </p>

      <p style="font-size:13px; color:#999;">
        — Team EduBloom 💜
      </p>

    </div>
  </div>
  `;
};