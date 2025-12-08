# Inventory Management API

A RESTful API built with Node.js, Express, and Sequelize for managing products, orders, and inventory.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for products and categories
- **Order Processing**: Create orders with transaction support
- **Stock Management**: Real-time inventory tracking
- **Advanced Error Handling**: Centralized error management
- **Request Logging**: Winston logger for monitoring
- **Input Validation**: Joi schema validation
- **Security**: Helmet, CORS, and password hashing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, bcryptjs

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- Microsoft SQL Server
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/inventory-api.git
   cd inventory-api
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   NODE_ENV=development
   PORT=3000

   # Database
   DB_HOST=localhost
   DB_PORT=1433
   DB_NAME=InventoryDB
   DB_USER=sa
   DB_PASSWORD=YourPassword123

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d

   # API
   API_PREFIX=/api/v1
```

4. **Create database**
   
   Make sure SQL Server is running and create the database:
```sql
   CREATE DATABASE InventoryDB;
```

5. **Run the application**
```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
```

6. **Sync database tables**
   
   The application will automatically create tables on first run.

## 📁 Project Structure
```
inventory-api/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Sequelize configuration
│   │   └── env.js       # Environment variables
│   ├── middleware/      # Express middleware
│   │   ├── auth.js      # JWT authentication
│   │   ├── validate.js  # Input validation
│   │   ├── errorHandler.js
│   │   └── requestLogger.js
│   ├── models/          # Sequelize models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   └── index.js
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   │   ├── AppError.js
│   │   ├── catchAsync.js
│   │   └── responseMapper.js
│   └── app.js           # Express app setup
├── .env                 # Environment variables (not in git)
├── .gitignore
├── package.json
├── README.md
└── server.js            # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product (Admin only)
- `PUT /api/v1/products/:id` - Update product (Admin only)
- `DELETE /api/v1/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category (Admin only)

### Orders
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order by ID
- `POST /api/v1/orders` - Create new order
- `PUT /api/v1/orders/:id/status` - Update order status (Admin only)

## 📝 API Usage Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Product (Admin)
```bash
POST /api/v1/products
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "categoryId": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200.00,
  "stock": 50,
  "sku": "LAP-001"
}
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet for security headers
- CORS protection
- Input validation
- SQL injection prevention (Sequelize ORM)

## 📊 Database Schema
```sql
Users (id, email, password, firstName, lastName, role, isActive)
Categories (id, name, description, isActive)
Products (id, categoryId, name, price, stock, sku, imageUrl, isActive)
Orders (id, userId, orderNumber, totalAmount, status, orderDate)
OrderItems (id, orderId, productId, quantity, price, subtotal)
```

## 🧪 Testing
```bash
# Run tests (when implemented)
npm test
```

## 📦 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_NAME=your-production-db
JWT_SECRET=your-very-strong-secret-key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Chathmini**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Express.js documentation
- Sequelize documentation
- Node.js best practices

---

⭐ If you find this project helpful, please give it a star!