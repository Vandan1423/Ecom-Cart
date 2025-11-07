# Vibe Commerce - Full Stack E-Commerce Cart

A modern, full-stack shopping cart application built with React, Node.js, Express, and MongoDB. This project demonstrates complete e-commerce cart functionality including product browsing, cart management, and mock checkout flow with receipt generation.

## 📋 Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation & Setup](#installation--setup)
-   [API Documentation](#api-documentation)
-   [Screenshots](#screenshots)
-   [Key Functionality](#key-functionality)
-   [Error Handling](#error-handling)
-   [Future Enhancements](#future-enhancements)

---

## ✨ Features

### Core Features

-   **Product Catalog**: Browse 20 products fetched from FakeStore API with automatic database persistence
-   **Shopping Cart Management**:
    -   Add products to cart with quantity selection
    -   Update item quantities in real-time
    -   Remove individual items or clear entire cart
    -   Persistent cart storage in MongoDB
-   **Mock Checkout Flow**:
    -   Customer information form (name, email, phone)
    -   Order confirmation with itemized summary
    -   Receipt generation with unique order numbers
-   **Responsive Design**: Mobile-first UI with seamless desktop experience
-   **Real-time Notifications**: Toast notifications for all user actions

### Bonus Features Implemented

-   ✅ **Database Persistence**: MongoDB for products and cart data
-   ✅ **FakeStore API Integration**: Automatic product seeding from external API
-   ✅ **Comprehensive Error Handling**: Joi validation + custom error middleware
-   ✅ **Loading States**: Smooth UX with loading indicators
-   ✅ **Form Validation**: Client and server-side validation

---

## 🛠 Tech Stack

### Frontend

-   **React 19.1.1** - UI library with hooks
-   **React Router DOM 7.9.5** - Client-side routing
-   **Vite 7.1.7** - Build tool and dev server
-   **CSS3** - Custom styling with responsive design

### Backend

-   **Node.js** - Runtime environment
-   **Express 5.1.0** - Web application framework
-   **MongoDB** - NoSQL database
-   **Mongoose 8.19.3** - ODM for MongoDB

### Key Libraries

-   **Joi 18.0.1** - Request validation
-   **CORS 2.8.5** - Cross-origin resource sharing
-   **Method-Override 3.0.0** - HTTP method override

---

## 📁 Project Structure

```
Ecom-Cart/
├── backend/
│   ├── controllers/
│   │   ├── cartController.js       # Cart CRUD operations
│   │   ├── checkoutController.js   # Checkout & receipt logic
│   │   └── productController.js    # Product fetching & seeding
│   ├── models/
│   │   ├── cart.js                 # Cart schema (items array with productId refs)
│   │   └── product.js              # Product schema
│   ├── routes/
│   │   ├── cartRoutes.js           # /api/cart endpoints
│   │   ├── checkoutRoutes.js       # /api/checkout endpoint
│   │   └── productRoutes.js        # /api/products endpoint
│   ├── utils/
│   │   ├── ExpressError.js         # Custom error class
│   │   └── wrapAsync.js            # Async error wrapper
│   ├── Schema.js                   # Joi validation schemas
│   ├── app.js                      # Express server setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Loader/             # Loading spinner component
    │   │   ├── Navbar/             # Navigation components
    │   │   ├── ProductCard/        # Product display components
    │   │   └── Toast/              # Toast notification system
    │   ├── pages/
    │   │   ├── Cart/
    │   │   │   ├── Cart.jsx        # Main cart page
    │   │   │   ├── CartItemCard.jsx    # Individual cart item
    │   │   │   ├── CartDetails.jsx     # Cart summary sidebar
    │   │   │   ├── Checkout.jsx    # Checkout modal
    │   │   │   └── Receipt.jsx     # Order receipt modal
    │   │   └── Home/
    │   │       ├── Home.jsx        # Main products page
    │   │       └── ProductsGrid.jsx    # Product grid layout
    │   ├── styles/                 # Component-specific CSS
    │   ├── App.jsx                 # Root component
    │   └── main.jsx                # React entry point
    ├── vite.config.js
    └── package.json
```

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

-   **Node.js** (v16 or higher)
-   **MongoDB** (v5 or higher)
-   **npm** or **yarn**
-   **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Vandan1423/Ecom-Cart
cd Ecom-Cart
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB service (if not running)
# For macOS/Linux:
sudo systemctl start mongod
# For Windows:
net start MongoDB

# Start the backend server
npm start
```

The backend server will start on **http://localhost:3000**

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:5173** 

### 4. Verify Installation

1. Open your browser and navigate to the frontend URL
2. You should see the products page load automatically
3. Products will be fetched from FakeStore API on first load

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Products Endpoints

#### GET `/api/products`

Fetch all products. If database is empty, automatically fetches from FakeStore API and seeds database.

**Response:**

```json
[
    {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Product Name",
        "price": 29.99,
        "description": "Product description",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/product.jpg"
    }
]
```

---

### Cart Endpoints

#### GET `/api/cart`

Retrieve current cart with populated product details and total price.

**Response:**

```json
{
    "cart": {
        "_id": "507f1f77bcf86cd799439012",
        "items": [
            {
                "_id": "507f1f77bcf86cd799439013",
                "productId": {
                    "_id": "507f1f77bcf86cd799439011",
                    "title": "Product Name",
                    "price": 29.99,
                    "image": "https://..."
                },
                "qty": 2
            }
        ]
    },
    "totalPrice": 59.98
}
```

#### POST `/api/cart`

Add a product to cart or increment quantity if already exists.

**Request Body:**

```json
{
    "productId": "507f1f77bcf86cd799439011",
    "quantity": 1
}
```

**Validation:**

-   `productId`: Required, valid MongoDB ObjectId
-   `quantity`: Required, number between 1-100

**Response:**

```json
{
  "success": true,
  "message": "Product added to cart",
  "cart": { ... }
}
```

#### PATCH `/api/cart/:cartId/:itemId`

Update quantity of a specific cart item.

**Request Body:**

```json
{
    "qty": 3
}
```

**Response:**

```json
{
  "success": true,
  "message": "Quantity updated",
  "cart": { ... }
}
```

#### DELETE `/api/cart/:cartId/:itemId`

Remove a specific item from cart.

**Response:**

```json
{
  "success": true,
  "message": "Item removed from cart",
  "cart": { ... }
}
```

#### DELETE `/api/cart/:cartId`

Clear all items from cart.

**Response:**

```json
{
    "success": true,
    "message": "Cart cleared",
    "cart": { "items": [] }
}
```

---

### Checkout Endpoint

#### POST `/api/checkout`

Generate order receipt with customer information.

**Request Body:**

```json
{
    "items": [
        {
            "productId": {
                "title": "Product Name",
                "price": 29.99
            },
            "qty": 2
        }
    ],
    "totalPrice": 59.98,
    "user": {
        "username": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
    }
}
```

**Response:**

```json
{
    "success": true,
    "orderNumber": "ORD-1699123456789",
    "date": "11/7/2025",
    "time": "10:30:45 AM",
    "items": [
        {
            "name": "Product Name",
            "price": 29.99,
            "quantity": 2,
            "subtotal": 59.98
        }
    ],
    "totalPrice": 59.98,
    "message": "Order placed successfully"
}
```

---

## 📸 Screenshots

### 1. Products Page

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Navigate to home page (http://localhost:5173)
-   Ensure products are loaded in a grid layout
-   Show the full page with navbar
-   Capture: Product grid showing multiple products with images, titles, prices, and "Add to Cart" buttons

---

### 2. Product Card Hover State

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Hover over any product card
-   Capture: Product card with hover effects showing enhanced styling
-   Should show product image, title, price clearly

---

### 3. Empty Cart

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Click cart icon in navbar before adding any items
-   Capture: Cart page showing "Your cart is empty" message

---

### 4. Cart with Items

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Add 3-4 different products to cart with varying quantities
-   Navigate to cart page
-   Capture: Full cart view showing:
    -   Cart items with images and details
    -   Quantity controls for each item
    -   Remove buttons
    -   Cart summary sidebar with subtotal and total
    -   "Proceed to Checkout" button

---

### 5. Cart Item Quantity Update

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   In cart, show quantity update controls (+ and - buttons)
-   Capture: Close-up of a cart item showing quantity controls
-   Should demonstrate the update functionality

---

### 6. Toast Notification

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Add an item to cart to trigger success toast
-   Capture: Toast notification appearing (top-right corner)
-   Should show success message like "Product added to cart"

---

### 7. Checkout Modal - Customer Form

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Click "Proceed to Checkout" button
-   Capture: Checkout modal showing:
    -   Customer information form (name, email, phone fields)
    -   Order items summary below
    -   Total price
    -   "Confirm Order" and "Cancel" buttons

---

### 8. Checkout Modal - Order Summary

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Scroll down in checkout modal to show order summary section
-   Capture: Order items list with quantities and subtotals, plus grand total

---

### 9. Receipt Modal

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Complete checkout by filling form and clicking "Confirm Order"
-   Capture: Receipt modal showing:
    -   Order number (ORD-xxxxx)
    -   Date and time
    -   Customer information
    -   Itemized order with prices
    -   Total amount
    -   Success message

---

### 10. Mobile Responsive View

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Resize browser to mobile width (375px) or use browser dev tools mobile view
-   Capture: Products page on mobile showing responsive grid layout

---

### 11. Loading State

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Refresh the page and quickly capture loading spinner
-   OR open network tab, throttle to "Slow 3G" and reload
-   Capture: Loading spinner with text "Loading products..." or "Loading Cart Data..."

---

### 12. Error Handling

**[INSERT SCREENSHOT HERE]**

_Screenshot Instructions:_

-   Stop backend server (Ctrl+C in backend terminal)
-   Try adding product to cart or refreshing cart page
-   Capture: Error toast notification showing "Failed to Load Cart" or similar error message

---

## 🔑 Key Functionality

### Product Management

-   **Automatic Seeding**: On first GET request to `/api/products`, if MongoDB is empty, products are fetched from FakeStore API
-   **Joi Validation**: All products validated against schema before insertion
-   **Error Recovery**: Failed validations are logged, valid products are saved

### Cart Operations

-   **Single Cart Model**: Application maintains one cart (can be extended for multi-user)
-   **Quantity Management**: Smart quantity updates - adds new or increments existing
-   **Real-time Calculation**: Total price computed on every cart fetch
-   **Cascade Updates**: All operations return updated cart with populated product refs

### Checkout Process

1. User clicks "Proceed to Checkout" from cart
2. Modal displays customer form + order summary
3. Client-side validation (required fields, email format)
4. POST to `/api/checkout` with cart items and customer info
5. Server generates unique order number with timestamp
6. Receipt modal displays with complete order details
7. Cart is automatically cleared after successful order
8. Toast notification confirms order placement

### User Experience

-   **Loading States**: Spinner displayed during async operations
-   **Toast Notifications**: Success/error feedback for all actions
-   **Form Validation**: Real-time validation with helpful error messages
-   **Responsive Design**: Mobile-first approach with breakpoints for tablet/desktop
-   **Modal Management**: Overlay modals for checkout flow preventing page navigation

---

## 🛡 Error Handling

### Backend Error Handling

#### Validation Errors (400)

```javascript
// Joi validation returns detailed error messages
{
  "success": false,
  "message": "Validation failed",
  "errors": ["\"quantity\" must be between 1 and 100"]
}
```

#### Not Found Errors (404)

```javascript
{
  "success": false,
  "error": "Cart not found"
}
```

#### Server Errors (500)

```javascript
{
  "success": false,
  "error": "Internal server error"
}
```

### Frontend Error Handling

-   **API Errors**: Caught in try-catch blocks, displayed via toast notifications
-   **Network Errors**: Graceful handling with user-friendly messages
-   **Empty States**: Proper UI feedback for empty cart/products
-   **Validation Errors**: Inline form validation before API calls

---

## 🚧 Future Enhancements

-   [ ] User authentication and multiple user carts
-   [ ] Product search and filtering
-   [ ] Category-based navigation
-   [ ] Wishlist functionality
-   [ ] Order history tracking
-   [ ] Payment gateway integration
-   [ ] Inventory management
-   [ ] Product reviews and ratings
-   [ ] Admin dashboard for product management
-   [ ] Email notifications for orders

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Errors

Ensure backend server is running on port 3000 and CORS is enabled in `backend/app.js`.

### Products Not Loading

1. Check MongoDB connection in backend terminal
2. Verify FakeStore API is accessible
3. Check browser console for errors
4. Verify backend API responds: `curl http://localhost:3000/api/products`

---

## 📝 Assignment Completion Checklist

-   [x] Backend REST API with all required endpoints
-   [x] MongoDB database integration with Mongoose
-   [x] Product seeding from FakeStore API
-   [x] Add/Remove items from cart
-   [x] Update item quantities
-   [x] Calculate cart totals
-   [x] Mock checkout with customer form
-   [x] Receipt generation with order details
-   [x] React frontend with routing
-   [x] Responsive design (mobile + desktop)
-   [x] Error handling and validation
-   [x] Loading states for async operations
-   [x] Toast notifications for UX feedback
-   [x] Clean code structure with separation of concerns
-   [x] Comprehensive README with setup instructions

---

## 👨‍💻 Developer

**Vandan Nagori**

This project was developed as part of the Vibe Commerce internship screening assignment, demonstrating full-stack development skills with modern web technologies.

---

## 📄 License

This project is created for educational and evaluation purposes as part of an internship application.

---

## 🙏 Acknowledgments

-   [FakeStore API](https://fakestoreapi.com/) for providing mock product data
-   Vibe Commerce for the internship opportunity
-   React and Node.js communities for excellent documentation
