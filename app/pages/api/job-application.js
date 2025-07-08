import { IncomingForm } from 'formidable';
import path from "path";
import fs from 'fs';
import connectDB from "@/app/lib/mongodb";
import JobApplication from "@/app/models/JobApplication";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    await connectDB();
    
    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
    });
    
    // Use promise wrapper for formidable
    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    
    const { fields, files } = formData;
    const resumePath = files.resume ? files.resume.filepath : "";
    
    await JobApplication.create({
      fullname: fields.fullname,
      email: fields.email,
      phone: fields.phone,
      position: fields.position,
      coverLetter: fields.message,
      resumeUrl: resumePath ? `/uploads/${path.basename(resumePath)}` : "",
    });

    res.status(200).json({ msg: "Job application submitted successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ msg: "Error processing form data" });
  }
}
