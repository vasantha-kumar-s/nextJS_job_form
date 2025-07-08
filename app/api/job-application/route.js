import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import JobApplication from "@/app/models/JobApplication";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    // Parse FormData from the request
    const formData = await req.formData();

    // Extract fields from FormData
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position');
    const message = formData.get('message');
    const resumeFile = formData.get('resume');

    // Validate required fields
    if (!fullname || !email || !phone || !position || !message) {
      return NextResponse.json({
        msg: "All fields are required",
        success: false,
      }, { status: 400 });
    }

    let resumeUrl = "";

    // Handle file upload if resume is provided
    if (resumeFile && resumeFile.size > 0) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = resumeFile.name;
      const extension = path.extname(originalName);
      const filename = `${timestamp}-${path.basename(originalName, extension)}${extension}`;
      const filepath = path.join(uploadsDir, filename);

      // Save file
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filepath, buffer);

      resumeUrl = `/uploads/${filename}`;
    }

    // Create job application record
    const jobApplication = await JobApplication.create({
      fullname,
      email,
      phone,
      position,
      coverLetter: message,
      resumeUrl,
    });

    return NextResponse.json({
      msg: "Job application submitted successfully!",
      success: true,
      applicationId: jobApplication._id,
    });

  } catch (error) {
    console.error("Error saving job application:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        msg: errorMessages,
        success: false,
      }, { status: 400 });
    }

    return NextResponse.json({
      msg: "Something went wrong while processing your application.",
      success: false,
    }, { status: 500 });
  }
}
