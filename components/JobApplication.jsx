"use client";
import { useState } from "react";

export default function JobApplicationForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [message, setMessage] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position", position);
        formData.append("message", message);
        if (resume) formData.append("resume", resume);

        try {
            const res = await fetch("/api/job-application", {
                method: "POST",
                body: formData, // DO NOT set headers here!
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Something went wrong");
            }

            setError("");
            alert("Application submitted successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
            <div>
                <label htmlFor="fullname">Full Name</label>
                <input
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    type="text"
                    id="fullname"
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label htmlFor="email">Email Id</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                />
            </div>

            <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    id="phone"
                    placeholder="+91 9876543210"
                />
            </div>

            <div>
                <label htmlFor="position">Position Applied For</label>
                <select
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                    id="position"
                >
                    <option value="">-- Select Position --</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                </select>
            </div>

            <div>
                <label htmlFor="message">Cover Letter / Message</label>
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="h-32"
                    id="message"
                    placeholder="Write a short cover letter..."
                />
            </div>

            <div>
                <label htmlFor="resume">Upload Resume (PDF/DOC)</label>
                <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                />
            </div>

            <button className="bg-green-700 p-3 text-white font-bold" type="submit">
                Send Application
            </button>

            {error && (
                <div className="bg-slate-100 flex flex-col">
                    <div className="text-red-600 px-5 py-2">{error}</div>
                </div>
            )}
        </form>
    );
}
