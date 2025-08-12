#!/bin/bash

# Full-Stack Application Setup Script
# NextJS + FastAPI + MySQL + Moonrepo

set -e

echo "🚀 Setting up Full-Stack Application..."

# Check if required tools are installed
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+"
    exit 1
fi

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 8.0+"
    exit 1
fi

# Check Moonrepo
if ! command -v moon &> /dev/null; then
    echo "📦 Installing Moonrepo..."
    curl -fsSL https://moonrepo.dev/install.sh | bash
    echo "✅ Moonrepo installed successfully"
else
    echo "✅ Moonrepo is already installed"
fi

echo "✅ All prerequisites are satisfied"

# Install dependencies
echo "📦 Installing dependencies..."

# Frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
python3 -m pip install -r requirements.txt
cd ..

echo "✅ Dependencies installed successfully"

# Setup environment files
echo "⚙️ Setting up environment files..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    cat > backend/.env << EOF
DATABASE_URL=mysql+pymysql://bryan:123456789a@localhost:3306/app_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
HOST=0.0.0.0
PORT=8000
EOF
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

# Frontend .env.local
if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > frontend/.env.local
    echo "✅ Frontend .env.local file created"
else
    echo "✅ Frontend .env.local file already exists"
fi

echo "✅ Environment files setup completed"

# Database setup
echo "🗄️ Setting up database..."

# Check if MySQL is running
if ! mysqladmin ping -h localhost -u root --silent; then
    echo "❌ MySQL is not running. Please start MySQL service"
    echo "On macOS: brew services start mysql"
    echo "On Ubuntu: sudo systemctl start mysql"
    exit 1
fi

# Create database and user
echo "Creating database and user..."
mysql -u root -p -e "source database_setup.sql"

echo "✅ Database setup completed"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development servers:"
echo "   moon run dev"
echo ""
echo "2. Or start services individually:"
echo "   moon run frontend:dev  # Frontend on http://localhost:3000"
echo "   moon run backend:dev   # Backend on http://localhost:8000"
echo ""
echo "3. Access the applications:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "4. Default test credentials:"
echo "   Username: admin"
echo "   Password: password123"
echo ""
echo "Happy coding! 🚀" 