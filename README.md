# Tactyqal Labs — Full Stack Intern Challenge

A responsive React homepage concept plus a Node/Express/MongoDB blog CMS API and lightweight admin UI.

## Features
- Responsive landing page based on Tactyqal Labs' public positioning: helping young builders turn ideas into real apps.
- Sections: hero, outcomes, build journey, mentoring benefits, featured work, blog, CTA and footer.
- Blog API with create, read, update, delete, slug generation, validation and centralized errors.
- Admin UI at `/admin` to create, edit and delete blog posts.
- Public blog list on homepage, with graceful sample content if the API is not configured.
- CORS and environment-based configuration.

## Stack
React + Vite + CSS | Node.js + Express | MongoDB + Mongoose

## Run locally

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Set `MONGODB_URI` in `server/.env` to your MongoDB Atlas connection string or local MongoDB URL.
API runs at `http://localhost:5000`.
Health check: `http://localhost:5000/api/health`

Optional: seed three sample articles after connecting MongoDB:
```bash
npm run seed
```

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

### 3. Test API
```bash
curl http://localhost:5000/api/posts
```
Create/update/delete endpoints:
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

For demo purposes the admin UI is open. Before production, add authentication and role-based authorization to write endpoints.

## Environment
Backend `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
CLIENT_URL=http://localhost:5173
```
Frontend `client/.env` (copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment
- Backend: Render. Root directory `server`, build command `npm install`, start command `npm start`. Add `MONGODB_URI`, `CLIENT_URL`, `NODE_ENV=production`.
- Frontend: Vercel. Root directory `client`, build command `npm run build`, output directory `dist`. Add `VITE_API_URL=https://YOUR-API.onrender.com/api`.
- Add the deployed frontend URL to backend `CLIENT_URL`.

## Demo walkthrough (about 90 seconds)
1. Show the responsive homepage and explain the hero, mentoring journey and project showcase.
2. Scroll to the insights section and show blog posts loaded from the API.
3. Open `/admin`, create a post, then return to the homepage to show it in the blog list.
4. Edit and delete a post to demonstrate CRUD.
5. Mention the API structure, MongoDB model, validation, environment configuration and deployment approach.

## Notes
- Sample blog cards are shown when the backend is unavailable, so the homepage remains presentable.
- This is a hiring-challenge MVP, not a production CMS. Authentication, rate limiting, image uploads and rich-text editing are sensible next steps.
