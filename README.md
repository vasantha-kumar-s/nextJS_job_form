
# 📝 Job Application Form – Next.js + MongoDB

This is a **job application web form** built using **Next.js (App Router)**, allowing users to submit their:

- ✅ Full Name
- ✅ Email Address
- ✅ Resume File (PDF/DOC)

The submitted data is:

- ✅ Stored in a **MongoDB** database using Mongoose  
- ❌ _Currently not sending emails to the recruiter_ (email functionality can be added later using Nodemailer)

> 🔧 Bootstrapped with `create-next-app` using App Router (Next.js 13+)

---

## 🚀 Getting Started

### 📦 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/job-application-form-nextjs.git
cd job-application-form-nextjs
````

2. **Install dependencies**:

```bash
npm install
```

3. **Create a `.env` file**:

Create a `.env` file in the root of the project and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
```

> 💡 Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI.

4. **Run the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```
job-application-form/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js      # API route to handle form submission
│   └── page.js               # Frontend page containing the form
├── components/
│   └── Form.js               # Form component (if used)
├── public/                   # Static assets
├── .env                      # Environment variables (not pushed to GitHub)
├── .gitignore                # Ignores node_modules, .env, etc.
├── package.json              # Project metadata and dependencies
├── README.md                 # Project documentation
```

---

## 🧰 Tech Stack

| Layer       | Technology                |
| ----------- | ------------------------- |
| Frontend    | Next.js (App Router)      |
| Backend     | Next.js API Routes        |
| Database    | MongoDB Atlas + Mongoose  |
| File Upload | FormData (multipart)      |
| Styling     | CSS |

---

## ✅ Features

* 📝 Clean and simple job application form
* 📁 Resume file upload support
* 🗃 Stores application data in MongoDB
* ❌ Currently no email notifications (can be added later)
* 📦 Deploy-ready for Vercel, Render, or Railway

---

## 📌 Environment Variables

The application requires the following environment variable:

| Key           | Required | Description                               |
| ------------- | -------- | ----------------------------------------- |
| `MONGODB_URI` | ✅        | MongoDB Atlas URI for database connection |

---

## 📦 Future Enhancements

* [ ] Send resume via email to recruiter using Nodemailer
* [ ] Admin dashboard to view applicants
* [ ] Cloud file storage (AWS S3 or Cloudinary)
* [ ] CAPTCHA/spam protection

---
