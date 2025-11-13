# Visual Product Matcher - Quick Start

## Backend
1. cd backend
2. copy .env.example to .env and set MONGO_URI and BASE_URL
3. place 50 images in backend/seed/images (names like product1.jpg ... product50.jpg)
4. npm install
5. npm run seed   # seeds DB with product docs
6. node server.js

API endpoints:
- GET /api/products
- POST /api/products/search (multipart 'file' or form field 'imageUrl')

## Frontend
1. cd frontend
2. copy .env.example to .env (set REACT_APP_API_URL if needed)
3. npm install
4. npm start

Open http://localhost:3000 and test by uploading an image or pasting a URL.
