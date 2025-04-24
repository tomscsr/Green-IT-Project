# Green IT Project

## Branch Structure
- `main`: Project overview and documentation
- `frontend`: All client-side code (HTML, CSS, JS)
- `backend`: Server code (Node.js, Express)
- `database`: Database schema and migrations

## Installation

1. Clone all branches:
```bash
git clone https://github.com/tomscsr/green-it-project.git
cd green-it-project
git fetch --all
```

2. Set up backend:
```bash
git checkout backend
cd backend
npm install
```

3. Set up database:
```bash
git checkout database
cd database
mysql -u root -p < databaseGreenIT.sql
```

4. Run the application:
```bash
git checkout backend
cd backend
npm start
```

5. Access the frontend at http://localhost:3000