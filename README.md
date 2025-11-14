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

I built a Visual Product Matcher web application using the MERN stack to help users find visually similar products based on an uploaded image. The backend is developed with Node.js, Express, and MongoDB Atlas. I implemented an image-hashing approach using the Sharp library to generate a compact 64-bit average hash (aHash) for each product image. During search, the hash of the uploaded image is compared with stored product hashes using the Hamming distance algorithm to calculate similarity scores.

The database contains 50 product entries, each with a name, category, image URL, and precomputed hash value. A seed script automatically loads and processes these images. The backend exposes APIs for uploading images, entering image URLs, and retrieving similarity results.

The frontend is built with React and provides a simple, responsive interface. Users can upload an image or paste a URL, preview it, and view similar product results with adjustable similarity filtering. Loading states and error handling are included for better UX.

The entire project is deployed using free hosting services. The code is modular, production-friendly, and follows clean structuring to make the system easy to extend or integrate with advanced AI/ML models in the future.
