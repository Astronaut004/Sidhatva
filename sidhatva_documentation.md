# SIDHATVA Project Documentation

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technical Specification](#2-technical-specification)
3. [Features](#3-features)
4. [Design Architecture](#4-design-architecture)
5. [User Manual](#5-user-manual)
6. [Installation & Setup](#6-installation--setup)
7. [API Documentation](#7-api-documentation)
8. [Troubleshooting](#8-troubleshooting)
9. [Development Guidelines](#9-development-guidelines)
10. [Deployment](#10-deployment)

---

## 1. Project Overview

### 1.1 Introduction
**SIDHATVA** is a comprehensive, full-stack e-commerce platform that delivers a modern shopping experience across multiple platforms. The project encompasses a customer-facing web application, a cross-platform mobile interface, and a robust admin dashboard for complete store management.

### 1.2 Project Vision
To create a scalable, user-friendly e-commerce solution that bridges the gap between traditional online shopping and modern digital commerce experiences.

### 1.3 Key Objectives
- **Customer Experience**: Intuitive, responsive shopping interface
- **Administrative Control**: Comprehensive management dashboard
- **Scalability**: Built for growth and high traffic
- **Security**: Robust authentication and data protection
- **Performance**: Fast loading times and smooth interactions

### 1.4 Target Audience
- **End Users**: Online shoppers seeking seamless purchasing experiences
- **Administrators**: Store managers and content managers
- **Developers**: Contributors to the open-source project

### 1.5 Project Status
- **Current Version**: Development Phase
- **Contributors**: 2 active developers
- **Commits**: 118+ commits
- **License**: Open Source

---

## 2. Technical Specification

### 2.1 Architecture Overview
SIDHATVA follows a **client-server architecture** with clear separation of concerns:

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │◄──────────────────►│                 │
│   Client (SPA)  │                     │  Server (API)   │
│   React + Vite  │                     │  Node.js + Express│
└─────────────────┘                     └─────────────────┘
                                                  │
                                                  ▼
                                        ┌─────────────────┐
                                        │   PostgreSQL    │
                                        │    Database     │
                                        └─────────────────┘
```

### 2.2 Technology Stack

| **Layer**           | **Technology**                    | **Version** | **Purpose**                    |
|---------------------|-----------------------------------|-------------|--------------------------------|
| **Frontend**        | React                             | ^18.0.0     | UI Framework                   |
|                     | Vite                              | ^4.0.0      | Build Tool & Dev Server        |
|                     | Tailwind CSS                      | ^3.0.0      | Utility-First CSS Framework    |
|                     | React Router                      | ^6.0.0      | Client-Side Routing            |
| **Backend**         | Node.js                           | ^18.0.0     | Runtime Environment            |
|                     | Express.js                        | ^4.18.0     | Web Framework                  |
|                     | PostgreSQL                        | ^14.0       | Primary Database               |
| **Authentication**  | JWT (jsonwebtoken)                | ^9.0.0      | Token-Based Authentication     |
|                     | bcryptjs                          | ^2.4.3      | Password Hashing               |
| **DevOps**          | Vercel                            | Latest      | Deployment Platform            |
|                     | GitHub                            | Latest      | Version Control                |

### 2.3 System Requirements

#### **Development Environment**
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **PostgreSQL**: >= 14.0
- **Memory**: >= 4GB RAM
- **Storage**: >= 2GB free space

#### **Production Environment**
- **Server**: Linux/Ubuntu 20.04+
- **Memory**: >= 8GB RAM
- **CPU**: >= 2 cores
- **Storage**: >= 20GB SSD
- **Network**: >= 100 Mbps

### 2.4 Performance Specifications
- **Page Load Time**: < 3 seconds
- **API Response Time**: < 500ms
- **Database Query Time**: < 100ms
- **Concurrent Users**: Up to 1,000
- **Uptime**: 99.9%

---

## 3. Features

### 3.1 High-Level Features

#### **Customer Features**
- **User Authentication**
  - Account registration and login
  - Email verification
  - Password reset functionality
  - Social login integration (planned)

- **Product Browsing**
  - Advanced product search and filtering
  - Category-based navigation
  - Product recommendations
  - Wishlist functionality

- **Shopping Cart & Checkout**
  - Add/remove items from cart
  - Real-time cart updates
  - Secure checkout process
  - Multiple payment options

- **Order Management**
  - Order tracking
  - Order history
  - Return/refund requests
  - Download invoices

#### **Administrative Features**
- **Dashboard Overview**
  - Sales analytics
  - Customer insights
  - Inventory status
  - Performance metrics

- **Product Management**
  - Add/edit/delete products
  - Bulk product operations
  - Image management
  - SEO optimization

- **Category Management**
  - Create product categories
  - Manage subcategories
  - Category hierarchy
  - SEO-friendly slugs

- **Order Management**
  - Process orders
  - Update order status
  - Generate reports
  - Handle returns

### 3.2 Mid-Level Features

#### **Search & Discovery**
- Autocomplete search suggestions
- Advanced filtering options
- Sort by price, rating, popularity
- Recently viewed products

#### **User Experience**
- Responsive design for all devices
- Progressive Web App (PWA) capabilities
- Offline functionality
- Push notifications

#### **Analytics & Reporting**
- Sales reports
- Customer behavior analytics
- Inventory reports
- Performance monitoring

### 3.3 Low-Level Features

#### **Technical Features**
- **Caching**: Redis for session management
- **Logging**: Winston for application logging
- **Error Handling**: Comprehensive error management
- **Validation**: Input validation and sanitization
- **Security**: Rate limiting, CORS, helmet.js

#### **Database Features**
- **Indexing**: Optimized database queries
- **Migrations**: Database version control
- **Backup**: Automated database backups
- **Monitoring**: Query performance tracking

---

## 4. Design Architecture

### 4.1 Frontend Architecture

#### **Component Hierarchy**
```
App.jsx
├── Router
│   ├── Public Routes
│   │   ├── Home
│   │   ├── Products
│   │   ├── Auth (Login/Register)
│   │   └── About
│   └── Protected Routes
│       ├── Dashboard
│       ├── Cart
│       ├── Profile
│       └── Orders
└── Global Components
    ├── Navbar
    ├── Footer
    └── ErrorBoundary
```

#### **State Management**
- **React Context API**: Global state management
- **Local State**: Component-specific state with useState
- **Custom Hooks**: Reusable stateful logic

#### **Folder Structure**
```
client/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── adminPanel/
│   │   ├── Category/
│   │   │   ├── AddCategory.jsx
│   │   │   ├── CategoryList.jsx
│   │   │   └── EditCategory.jsx
│   │   └── Product/
│   │       ├── AddProduct.jsx
│   │       ├── ProductList.jsx
│   │       └── EditProduct.jsx
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── Component/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   └── Layout.jsx
│   ├── Data/
│   │   └── mockData.js
│   ├── Pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   └── Products.jsx
│   ├── ui/
│   │   ├── Loader.jsx
│   │   └── Alert.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

### 4.2 Backend Architecture

#### **MVC Pattern**
```
Controllers ──► Models ──► Database
     ↑              ↓
   Routes      Response Data
```

#### **Folder Structure**
```
server/
├── Controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── cartController.js
│   └── orderController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── productMiddleware.js
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   ├── db.js
│   ├── User.js
│   ├── Product.js
│   └── Category.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── categories.js
│   ├── cart.js
│   └── orders.js
├── utils/
│   ├── tokenGenerator.js
│   ├── emailService.js
│   └── validators.js
├── config/
│   ├── database.js
│   └── environment.js
├── tests/
│   ├── unit/
│   └── integration/
├── server.js
└── package.json
```

### 4.3 Database Design

#### **Entity Relationship Diagram**
```
Users ||--o{ Orders : places
Orders ||--o{ OrderItems : contains
Products ||--o{ OrderItems : includes
Products }o--|| Categories : belongs_to
Categories ||--o{ Subcategories : has
Users ||--o{ CartItems : has
Products ||--o{ CartItems : includes
```

#### **Table Schemas**

**Users Table**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(20) DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Products Table**
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES product_categories(id),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id)
);
```

**Categories Table**
```sql
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES product_categories(id),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id)
);
```

---

## 5. User Manual

### 5.1 Customer Guide

#### **Getting Started**
1. **Registration Process**
   - Navigate to the homepage
   - Click "Sign Up" in the top navigation
   - Fill in required details (name, email, password)
   - Verify email address
   - Complete profile setup

2. **Browsing Products**
   - Use the search bar for specific items
   - Browse by categories in the navigation menu
   - Apply filters (price, brand, rating, availability)
   - Sort results by relevance, price, or popularity

3. **Adding to Cart**
   - Click on a product to view details
   - Select quantity and options (size, color, etc.)
   - Click "Add to Cart"
   - View cart summary in the top-right corner

4. **Checkout Process**
   - Review items in your cart
   - Apply coupon codes if available
   - Enter shipping information
   - Select payment method
   - Review order summary
   - Confirm purchase

#### **Account Management**
- **Profile Settings**: Update personal information
- **Address Book**: Manage shipping addresses
- **Order History**: View past orders and track current ones
- **Wishlist**: Save items for later purchase
- **Payment Methods**: Manage saved payment options

### 5.2 Administrator Guide

#### **Dashboard Overview**
The admin dashboard provides a comprehensive view of your store's performance:

1. **Sales Overview**
   - Daily, weekly, monthly revenue
   - Order statistics
   - Top-selling products
   - Customer acquisition metrics

2. **Quick Actions**
   - Add new products
   - Process pending orders
   - Manage customer inquiries
   - Update inventory

#### **Product Management**

1. **Adding Products**
   - Navigate to Products → Add New
   - Enter product details (name, description, price)
   - Upload product images
   - Set inventory levels
   - Assign to categories
   - Configure SEO settings
   - Publish product

2. **Managing Categories**
   - Go to Categories section
   - Create new categories with descriptions
   - Set up category hierarchy
   - Upload category images
   - Configure SEO-friendly URLs

3. **Inventory Management**
   - Monitor stock levels
   - Set low-stock alerts
   - Bulk update inventory
   - Track inventory movements

#### **Order Management**
- **Processing Orders**: Change status from pending to processing
- **Shipping**: Generate shipping labels and tracking numbers
- **Returns**: Handle return requests and refunds
- **Communication**: Send order updates to customers

---

## 6. Installation & Setup

### 6.1 Prerequisites
Before installing SIDHATVA, ensure you have:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- PostgreSQL (v14.0 or higher)
- Git (for cloning the repository)

### 6.2 Development Setup

#### **1. Clone the Repository**
```bash
git clone https://github.com/Astronaut004/Sidhatva.git
cd Sidhatva
```

#### **2. Server Setup**
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
nano .env
```

**Environment Variables (.env)**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sidhatva_db
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### **3. Database Setup**
```bash
# Create database
createdb sidhatva_db

# Run database migrations
npm run migrate

# Seed initial data (optional)
npm run seed
```

#### **4. Start the Server**
```bash
npm run dev
```
The server will start on `http://localhost:5000`

#### **5. Client Setup**
```bash
# Open new terminal and navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

**Client Environment Variables (.env.local)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SIDHATVA
```

#### **6. Start the Client**
```bash
npm run dev
```
The client will start on `http://localhost:5173`

### 6.3 Production Setup

#### **Server Deployment**
```bash
# Build for production
npm run build

# Start production server
npm start
```

#### **Client Deployment**
```bash
# Build for production
npm run build

# The dist/ folder contains the built application
# Deploy the contents to your web server or CDN
```

#### **Environment Configuration for Production**
```env
NODE_ENV=production
DB_HOST=your_production_db_host
JWT_SECRET=your_production_jwt_secret
# ... other production variables
```

---

## 7. API Documentation

### 7.1 Authentication Endpoints

#### **POST /api/auth/register**
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### **POST /api/auth/login**
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 7.2 Product Endpoints

#### **GET /api/products**
Get all products with optional filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `category`: Filter by category ID
- `search`: Search term
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `sortBy`: Sort field (price, name, created_at)
- `sortOrder`: Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### **GET /api/products/:id**
Get a single product by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product Name",
    "slug": "product-name",
    "description": "Product description",
    "price": 29.99,
    "stockQuantity": 100,
    "category": {
      "id": 1,
      "name": "Category Name"
    },
    "images": [...],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### **POST /api/products** (Admin Only)
Create a new product.

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "stockQuantity": 50,
  "categoryId": 1,
  "imageUrl": "https://example.com/image.jpg"
}
```

### 7.3 Category Endpoints

#### **GET /api/categories**
Get all product categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic products",
      "parentId": null,
      "children": [...]
    }
  ]
}
```

#### **POST /api/categories** (Admin Only)
Create a new category.

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category description",
  "parentId": null
}
```

### 7.4 Cart Endpoints

#### **GET /api/cart**
Get user's cart items (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "product": {
          "name": "Product Name",
          "price": 29.99,
          "imageUrl": "..."
        }
      }
    ],
    "totalItems": 2,
    "totalAmount": 59.98
  }
}
```

#### **POST /api/cart/add**
Add item to cart.

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

### 7.5 Order Endpoints

#### **GET /api/orders**
Get user's orders (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-20241215-001",
      "status": "pending",
      "totalAmount": 129.98,
      "createdAt": "2024-12-15T10:30:00Z",
      "items": [...]
    }
  ]
}
```

#### **POST /api/orders**
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

---

## 8. Troubleshooting

### 8.1 Common Installation Issues

#### **Issue: npm install fails with permission errors**
**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### **Issue: PostgreSQL connection refused**
**Symptoms:** `ECONNREFUSED` or `connection refused` errors

**Solutions:**
1. **Check PostgreSQL service:**
   ```bash
   # Start PostgreSQL service
   sudo service postgresql start
   
   # Check status
   sudo service postgresql status
   ```

2. **Verify connection details:**
   - Check database host, port, username, and password in `.env`
   - Ensure database exists: `createdb sidhatva_db`

3. **Check PostgreSQL configuration:**
   ```bash
   # Edit postgresql.conf
   sudo nano /etc/postgresql/14/main/postgresql.conf
   
   # Ensure these lines are uncommented:
   listen_addresses = 'localhost'
   port = 5432
   ```

#### **Issue: Port already in use**
**Symptoms:** `EADDRINUSE` error

**Solutions:**
1. **Find and kill process using the port:**
   ```bash
   # Find process using port 5000
   lsof -i :5000
   
   # Kill the process
   kill -9 <process_id>
   ```

2. **Change port in configuration:**
   - Update `PORT` in server `.env` file
   - Update `VITE_API_URL` in client `.env.local` file

### 8.2 Runtime Issues

#### **Issue: JWT token invalid or expired**
**Symptoms:** 401 Unauthorized errors

**Solutions:**
1. **Clear browser storage:**
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```

2. **Check JWT secret consistency:**
   - Ensure `JWT_SECRET` is same across all environments
   - Restart server after changing JWT_SECRET

3. **Check token expiration:**
   - Verify `JWT_EXPIRES_IN` setting
   - Implement automatic token refresh

#### **Issue: CORS errors in browser**
**Symptoms:** `Access-Control-Allow-Origin` errors

**Solutions:**
1. **Update CORS configuration in server:**
   ```javascript
   app.use(cors({
     origin: ['http://localhost:5173', 'https://yourdomain.com'],
     credentials: true
   }));
   ```

2. **Check client API base URL:**
   ```javascript
   // Ensure API URL matches server address
   const API_URL = 'http://localhost:5000/api';
   ```

#### **Issue: Images not loading**
**Symptoms:** Broken image links or 404 errors

**Solutions:**
1. **Check image paths:**
   - Verify image URLs in database
   - Ensure images exist in specified locations

2. **Configure static file serving:**
   ```javascript
   app.use('/uploads', express.static('uploads'));
   ```

3. **Implement image upload handling:**
   - Use multer for file uploads
   - Validate image formats and sizes

### 8.3 Performance Issues

#### **Issue: Slow page loading**
**Solutions:**
1. **Optimize database queries:**
   - Add database indexes
   - Use pagination for large datasets
   - Implement query optimization

2. **Implement caching:**
   - Use Redis for session storage
   - Implement browser caching headers
   - Cache frequently accessed data

3. **Optimize frontend bundle:**
   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   
   # Implement code splitting
   # Use React.lazy() for route-based splitting
   ```

#### **Issue: High memory usage**
**Solutions:**
1. **Check for memory leaks:**
   - Use Node.js profiling tools
   - Monitor memory usage over time
   - Check for unclosed database connections

2. **Optimize database connections:**
   ```javascript
   // Use connection pooling
   const pool = new Pool({
     max: 20,
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000,
   });
   ```

### 8.4 Debugging Tools

#### **Server-side Debugging**
```bash
# Enable debug mode
DEBUG=* npm run dev

# Use Node.js debugger
node --inspect server.js
```

#### **Client-side Debugging**
```bash
# Enable React DevTools
npm install -g react-devtools

# Use browser debugging tools
# Check Network tab for API calls
# Use Console for error messages
```

#### **Database Debugging**
```sql
-- Enable query logging in PostgreSQL
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC;
```

### 8.5 Error Codes Reference

| **Error Code** | **Description** | **Solution** |
|----------------|-----------------|--------------|
| `AUTH001` | Invalid credentials | Check email/password combination |
| `AUTH002` | Token expired | Refresh authentication token |
| `PROD001` | Product not found | Verify product ID exists |
| `PROD002` | Insufficient stock | Check inventory levels |
| `CART001` | Cart item not found | Refresh cart data |
| `ORDER001` | Invalid order data | Validate order payload |
| `DB001` | Database connection failed | Check database service |
| `DB002` | Query execution failed | Review SQL syntax |

---

## 9. Development Guidelines

### 9.1 Code Standards

#### **JavaScript/React Standards**
```javascript
// Use meaningful variable names
const userAuthenticationToken = generateToken();

// Prefer const over let, avoid var
const apiEndpoint = process.env.VITE_API_URL;

// Use async/await instead of promises
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Component naming convention
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
};
```

#### **CSS/Tailwind Standards**
```jsx
// Use Tailwind utility classes consistently
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Product Name</h2>
  <span className="text-lg font-bold text-green-600">$29.99</span>
</div>

// Create reusable component classes
<button className="btn btn-primary">
  Primary Action
</button>
```

#### **Node.js/Express Standards**
```javascript
// Use middleware for common functionality
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Consistent error handling
const handleAsyncError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Controller structure
const getProducts = handleAsyncError(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const products = await Product.findAll({ page, limit });
  
  res.json({
    success: true,
    data: products,
    pagination: { page, limit, total: products.length }
  });
});
```

### 9.2 Git Workflow

#### **Branch Strategy**
```bash
# Main branches
main          # Production-ready code
develop       # Development integration
feature/*     # New features
hotfix/*      # Critical fixes
release/*     # Release preparation
```

#### **Commit Message Convention**
```bash
# Format: <type>(<scope>): <description>
feat(auth): add user registration endpoint
fix(cart): resolve quantity update bug
docs(readme): update installation instructions
style(ui): improve button hover effects
refactor(db): optimize product query performance
test(api): add unit tests for auth controller
chore(deps): update package dependencies
```

#### **Pull Request Guidelines**
1. **Create feature branch from develop**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/user-profile-management
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat(profile): add user profile update functionality"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/user-profile-management
   # Create PR via GitHub interface
   ```

4. **PR Requirements**
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes
   - Test coverage maintained
   - Code review approval required

### 9.3 Testing Strategy

#### **Unit Testing**
```javascript
// Example test for auth controller
import { authController } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

describe('Auth Controller', () => {
  describe('login', () => {
    it('should return token for valid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'validpassword'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await authController.login(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          token: expect.any(String)
        })
      );
    });

    it('should return 401 for invalid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Invalid credentials'
        })
      );
    });
  });
});
```

#### **Integration Testing**
```javascript
// Example integration test
import request from 'supertest';
import app from '../server.js';

describe('Product API Integration', () => {
  let authToken;
  
  beforeAll(async () => {
    // Setup test database and get auth token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'testpassword'
      });
    
    authToken = response.body.token;
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'A test product',
      price: 29.99,
      stockQuantity: 100,
      categoryId: 1
    };

    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(productData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(productData.name);
  });
});
```

#### **Frontend Testing**
```jsx
// React component testing with Jest and React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../Component/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 29.99,
  description: 'A test product',
  imageUrl: 'test-image.jpg'
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    const mockOnAddToCart = jest.fn();
    
    renderWithRouter(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
  });

  it('calls onAddToCart when add button is clicked', async () => {
    const mockOnAddToCart = jest.fn();
    
    renderWithRouter(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct.id);
    });
  });
});
```

### 9.4 Code Review Checklist

#### **Functionality**
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is implemented
- [ ] Performance considerations addressed

#### **Code Quality**
- [ ] Code follows project conventions
- [ ] Functions are properly documented
- [ ] No code duplication
- [ ] Meaningful variable/function names

#### **Security**
- [ ] Input validation implemented
- [ ] No sensitive data in logs
- [ ] Authentication checks in place
- [ ] SQL injection prevention

#### **Testing**
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Test coverage maintained
- [ ] Manual testing completed

---

## 10. Deployment

### 10.1 Production Deployment

#### **Server Deployment (Digital Ocean/AWS/Heroku)**

**Using PM2 for Process Management:**
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'sidhatva-api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
EOF

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

**Using Docker:**
```dockerfile
# Dockerfile for server
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

**Docker Compose for full stack:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: sidhatva_db
      POSTGRES_USER: sidhatva_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: 
      context: ./server
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_NAME: sidhatva_db
      DB_USER: sidhatva_user
      DB_PASSWORD: secure_password
      JWT_SECRET: your_super_secure_jwt_secret
    ports:
      - "5000:5000"
    depends_on:
      - postgres

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - api

volumes:
  postgres_data:
```

#### **Client Deployment (Vercel/Netlify)**

**Vercel Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from client directory
cd client
vercel

# Configure environment variables in Vercel dashboard
# VITE_API_URL=https://your-api-domain.com/api
```

**Manual Build Deployment:**
```bash
# Build the client application
cd client
npm run build

# The dist/ folder contains the built application
# Upload contents to your web server or CDN
```

### 10.2 CI/CD Pipeline

#### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy SIDHATVA

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install server dependencies
      run: |
        cd server
        npm ci
    
    - name: Install client dependencies
      run: |
        cd client
        npm ci
    
    - name: Run server tests
      run: |
        cd server
        npm test
      env:
        NODE_ENV: test
        DB_HOST: localhost
        DB_PASSWORD: test_password
        DB_NAME: test_db
        JWT_SECRET: test_secret
    
    - name: Run client tests
      run: |
        cd client
        npm test
    
    - name: Build client
      run: |
        cd client
        npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        # Add your deployment script here
        echo "Deploying to production..."
```

### 10.3 Environment Configuration

#### **Production Environment Variables**
```env
# Server (.env)
NODE_ENV=production
PORT=5000

# Database
DB_HOST=your-production-db-host
DB_PORT=5432
DB_NAME=sidhatva_production
DB_USER=sidhatva_user
DB_PASSWORD=super_secure_production_password

# Security
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Service
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key

# File Upload
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=5MB

# Redis (if using)
REDIS_URL=redis://localhost:6379

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn
```

```env
# Client (.env.production)
VITE_API_URL=https://api.sidhatva.com/api
VITE_APP_NAME=SIDHATVA
VITE_ENVIRONMENT=production
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

### 10.4 Performance Optimization

#### **Server Optimizations**
```javascript
// Enable compression
import compression from 'compression';
app.use(compression());

// Set security headers
import helmet from 'helmet';
app.use(helmet());

// Rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Cache static assets
app.use(express.static('public', {
  maxAge: '1y',
  etag: false
}));
```

#### **Database Optimizations**
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Optimize queries with EXPLAIN
EXPLAIN ANALYZE SELECT * FROM products 
WHERE category_id = 1 AND is_active = true 
ORDER BY created_at DESC;
```

#### **Client Optimizations**
```javascript
// Code splitting with React.lazy
const ProductList = React.lazy(() => import('./Pages/ProductList'));
const Dashboard = React.lazy(() => import('./adminPanel/Dashboard'));

// Image optimization
const optimizeImage = (url, width = 400, quality = 80) => {
  return `${url}?w=${width}&q=${quality}`;
};

// Implement service worker for caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 10.5 Monitoring and Logging

#### **Application Monitoring**
```javascript
// Winston logging configuration
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Error tracking with Sentry
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

#### **Performance Monitoring**
```javascript
// Response time middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// Database query monitoring
const monitoredQuery = async (query, params) => {
  const start = Date.now();
  try {
    const result = await db.query(query, params);
    const duration = Date.now() - start;
    
    if (duration > 1000) {
      logger.warn(`Slow query detected: ${duration}ms - ${query}`);
    }
    
    return result;
  } catch (error) {
    logger.error(`Database query failed: ${query}`, error);
    throw error;
  }
};
```

### 10.6 Backup and Recovery

#### **Database Backup Script**
```bash
#!/bin/bash
# backup.sh

DB_NAME="sidhatva_production"
DB_USER="sidhatva_user"
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create database backup
pg_dump -h localhost -U $DB_USER -d $DB_NAME > $BACKUP_DIR/sidhatva_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/sidhatva_$DATE.sql

# Remove backups older than 7 days
find $BACKUP_DIR -name "sidhatva_*.sql.gz" -mtime +7 -delete

echo "Backup completed: sidhatva_$DATE.sql.gz"
```

#### **Automated Backup with Cron**
```bash
# Add to crontab (crontab -e)
# Run backup daily at 2:00 AM
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1
```

#### **Recovery Process**
```bash
# Restore from backup
gunzip sidhatva_20241215_020000.sql.gz
psql -h localhost -U sidhatva_user -d sidhatva_production < sidhatva_20241215_020000.sql
```

### 10.7 Security Checklist

#### **Server Security**
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Set security headers (helmet.js)
- [ ] Validate and sanitize all inputs
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Implement proper authentication and authorization
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Implement logging for security events
- [ ] Set up firewalls and access controls

#### **Database Security**
- [ ] Use strong database passwords
- [ ] Limit database user permissions
- [ ] Enable SSL for database connections
- [ ] Regular security updates
- [ ] Monitor for suspicious queries
- [ ] Implement backup encryption

#### **Application Security**
- [ ] Implement Content Security Policy (CSP)
- [ ] Use secure cookie settings
- [ ] Implement CSRF protection
- [ ] Validate file uploads
- [ ] Sanitize user-generated content
- [ ] Implement proper session management

---

## 11. Additional Resources

### 11.1 Useful Commands

#### **Development Commands**
```bash
# Start development environment
npm run dev:all          # Start both client and server
npm run dev:client       # Start only client
npm run dev:server       # Start only server

# Testing commands
npm run test:unit        # Run unit tests
npm run test:integration # Run integration tests
npm run test:e2e         # Run end-to-end tests
npm run test:coverage    # Generate coverage report

# Database commands
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset database
npm run db:backup        # Create database backup

# Production commands
npm run build            # Build for production
npm run start:prod       # Start production server
npm run deploy          # Deploy to production
```

#### **Docker Commands**
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run specific service
docker-compose up postgres
docker-compose up api

# View logs
docker-compose logs api
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Clean up
docker-compose down -v  # Remove volumes
docker system prune -a  # Clean up unused images
```

### 11.2 Documentation Links

- **React Documentation**: https://reactjs.org/docs
- **Node.js Documentation**: https://nodejs.org/en/docs/
- **Express.js Documentation**: https://expressjs.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/

### 11.3 Community and Support

- **GitHub Repository**: https://github.com/Astronaut004/Sidhatva
- **Issues**: Report bugs and feature requests
- **Discussions**: Community discussions and Q&A
- **Contributors**: @Astronaut004, @Garbhit12

### 11.4 License

This project is open source. Please refer to the LICENSE file in the repository for full license terms.

---

## 12. Changelog

### Version History

**v1.0.0 (Development)**
- Initial project setup
- Basic authentication system
- Product management functionality
- Shopping cart implementation
- Admin dashboard foundation
- Database schema design
- API endpoint development

**Upcoming Features**
- Payment integration
- Order tracking system
- Email notifications
- Advanced search functionality
- Mobile application
- Performance optimizations

---

*This documentation is maintained by the SIDHATVA development team. For the most up-to-date information, please refer to the GitHub repository.*