import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [2, "Name must be at least 2 characters long"],
    maxLength: [50, "Name can't be more than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"],
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: [50, "Email can't be more than 50 characters"],
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?\d{10,15}$/, "Invalid phone number"],
  },

  position: {
    type: String,
    required: [true, "Please specify the position you're applying for"],
  },

  coverLetter: {
    type: String,
    required: [true, "Cover letter / message is required"],
  },

  resumeUrl: {
    type: String, // URL or file path
    required: false, // Optional depending on implementation
  },

  date: {
    type: Date,
    default: Date.now,
  }
});

const JobApplication =
  mongoose.models.JobApplication || mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
