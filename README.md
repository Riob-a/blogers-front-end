# Blogers Web App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Status](https://img.shields.io/badge/status-active-success)
![React](https://img.shields.io/badge/frontend-React-blue)
![Flask](https://img.shields.io/badge/backend-Flask-yellow)

A full-stack blogging platform built with **React** and **Flask**. Users can create, share, and engage with blog posts through an intuitive and interactive interface. Includes a secure authentication system, like/dislike features, commenting, and admin controls.

---

## 🔗 Live Demo

 [View Live App](https://blogers-front-end-srpb.vercel.app/)

---

<!-- ##  Screenshots

> *(Update these paths with actual image links or screenshots from your app)*

| Home Page | Post View | Dashboard |
|-----------|-----------|-----------|
| ![Home](screenshots/home.png) | ![Post](screenshots/post.png) | ![Dashboard](screenshots/dashboard.png) |

--- -->

## Features

- **User Authentication** (JWT-based)
- **Create, Edit, and Delete Posts**
- **Like and Dislike Posts**
- **Comment on Posts**
- **Filter by Genre or Author**
- **User Profiles**
- **Role-based Access Control (Admin/User)**

---

## Tech Stack

### Frontend

- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/) / [AOS](https://michalsnik.github.io/aos/)
- [Bootstrap](https://getbootstrap.com/) or [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [Flask](https://flask.palletsprojects.com/)
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)
- [Flask SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [Flask-Migrate](https://flask-migrate.readthedocs.io/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)

### Database

- PostgreSQL or SQLite (for local dev)

### Optional Integrations

- [Cloudinary](https://cloudinary.com/) – Image uploads
- [SendGrid](https://sendgrid.com/) – Email services

---

## Environment Variables

Create a `.env` file in both `frontend/` and `backend/` directories:

### Backend (`backend/.env`)

```env
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_key
DATABASE_URL=postgresql://user:pass@localhost/dbname
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
SENDGRID_API_KEY=your_sendgrid_key

```

### Setup

## Front end

Clone the repo

 ```bash

git clone https://github.com/your-username/blogers-web-app.git
cd blogers-web-app

cd frontend
npm install
npm start
```

## Backend-setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
flask run

```

### Testing

## Manual

- Use Postman or Thunder Client to test backend endpoints.

- Access full functionality via the frontend UI.

## Automated

- Backend: Use pytest or unittest.
- Frontend: Use Jest + React Testing Library.

---

### Deployment

Frontend:

- Vercel
- Netlify

Backend:

- Render
- Railway
- Heroku

Database:

- Supabase
- ElephantSQL

---

### License

This project is licensed under the MIT License.
See the LICENSE file for more details.

---

### Acknowledgements

- React
- Flask
- PostgreSQL
- Cloudinary
- SendGrid
