# Sunset Kuakata — Backend API & CRM Engine

Production-ready NestJS 10 backend API for **Sunset Kuakata Hotel & Resort Limited**, powering investor lead management (CRM), live package pricing & booking money matrix, and administrative security.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [NestJS 10](https://nestjs.com/) (TypeScript)
- **ORM & Database**: [Prisma ORM](https://www.prisma.io/) with SQLite (`dev.db` for zero-config portable storage, PostgreSQL ready)
- **Containerization**: Multi-stage Docker & Docker Compose
- **Security**: JWT Authentication, BCrypt password hashing, Class-Validator, Honeypot anti-spam
- **API Documentation**: Interactive Swagger OpenAPI at `/api/docs`

---

## 🚀 Part 1: Local Development Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sunset_kuakata_dev_secret_key_2026"
CORS_ORIGIN="http://localhost:3000"
```

### 3. Initialize Database & Seed
```bash
# Push schema to SQLite
npx prisma db push

# Seed Super Admin and 16 Official Brochure Packages
npx ts-node prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run start:dev
```
- **API Endpoint**: `http://localhost:4000/api/v1`
- **Swagger Documentation**: `http://localhost:4000/api/docs`
- **Default Super Admin**: `admin@sunsetkuakata.com` / `Admin@12345`

---

## 🌐 Part 2: VPS Production Deployment (Step-by-Step)

### Step 1: Connect to VPS
```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Download ONLY the Backend Folder (Sparse Checkout)
This pulls **only** the `backend` folder from GitHub without downloading the frontend:
```bash
mkdir -p /var/www/sunset-backend
cd /var/www/sunset-backend

git init
git remote add origin https://github.com/sunsetgroupbd/sunsetkuakata.git
git config core.sparseCheckout true
echo "backend/*" >> .git/info/sparse-checkout

git pull origin main

cd backend
```

### Step 3: Create Production `.env`
Inside `/var/www/sunset-backend/backend`:
```bash
nano .env
```
Paste the following:
```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sunset_kuakata_production_secret_key_2026_super_secure"
CORS_ORIGIN="https://sunsetkuakatahotel.com"
```
*(Save and exit: `Ctrl + O` $\rightarrow$ `Enter` $\rightarrow$ `Ctrl + X`)*.

### Step 4: Run with Docker Compose
```bash
docker compose up --build -d
```
Check status:
```bash
docker compose ps
docker compose logs -f
```

---

## 🔒 Part 3: Nginx Reverse Proxy & Free SSL (Let's Encrypt)

### 1. Install Nginx & Certbot
```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2. If Port 80 is Blocked
If Nginx fails to start due to port 80 conflicts:
```bash
sudo systemctl stop apache2 2>/dev/null
sudo fuser -k 80/tcp
sudo systemctl restart nginx
```

### 3. Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/sunset-api
```
Paste:
```nginx
server {
    server_name api.sunsetkuakatahotel.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
*(Save and exit: `Ctrl + O` $\rightarrow$ `Enter` $\rightarrow$ `Ctrl + X`)*.

### 4. Enable Configuration & Obtain SSL
```bash
sudo ln -s /etc/nginx/sites-available/sunset-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Generate SSL certificate
sudo certbot --nginx -d api.sunsetkuakatahotel.com
```

---

## 🔄 Part 4: How to Deploy Code Updates to VPS

Whenever you make changes to your backend code (locally or on GitHub), follow these simple steps to update your live VPS:

### Step A: Push changes from your local machine
On your computer terminal:
```bash
git add .
git commit -m "Update backend features"
git push origin main
```

---

### Step B: Pull & Deploy on your VPS
Log in to your VPS terminal and run:

```bash
# 1. Navigate to the project root
cd /var/www/sunset-backend

# 2. Pull the latest code from GitHub
git pull origin main

# 3. Enter backend and rebuild the container
cd backend
docker compose up --build -d

# 4. Check that the backend is running cleanly
docker compose logs -f --tail=30
```
*(Press `Ctrl + C` anytime to exit the logs view — the backend stays running in the background).*

---

### 💡 Quick One-Liner (Copy-Paste)
You can run all update commands in a single command on your VPS:
```bash
cd /var/www/sunset-backend && git pull origin main && cd backend && docker compose up --build -d && docker compose ps
```

---

### 🛡️ Will my database data be wiped out during updates?
**NO.** All SQLite database records (`dev.db`), inquiries, admin accounts, and custom package prices are preserved safely inside the persistent Docker volume (`backend-db`). Rebuilding or updating containers will **never delete your data**.

---

### ⚠️ Common Troubleshooting on Updates

#### 1. "error: Your local changes would be overwritten by merge" on `git pull`
If you accidentally edited files directly on the VPS:
```bash
cd /var/www/sunset-backend
git stash
git pull origin main
```

#### 2. How to verify the live API after an update:
```bash
# Test local container response on VPS:
curl -I http://localhost:4000/api/v1/packages

# Test live public HTTPS domain:
curl -I https://api.sunsetkuakatahotel.com/api/v1/packages
```
Both should return `HTTP/1.1 200 OK` or `HTTP/2 200`.

---

## 🔗 Part 5: Connecting to Frontend on Vercel

1. Go to your **[Vercel Dashboard](https://vercel.com)** $\rightarrow$ **sunsetkuakata** project.
2. Go to **Settings** $\rightarrow$ **Environment Variables**.
3. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://api.sunsetkuakatahotel.com/api/v1`
   - **Target**: Production, Preview, Development.
4. Go to **Deployments** $\rightarrow$ Click the **three dots (...)** $\rightarrow$ **Redeploy**.

---

## 📡 API Endpoints Reference

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Admin login with email & password |
| `GET` | `/auth/me` | JWT | Get current admin profile |
| `POST` | `/auth/change-password` | JWT | Update admin password |
| `POST` | `/auth/create-admin` | JWT | Create new admin user |
| `GET` | `/auth/admins` | JWT | List all admin accounts |

### Investor Inquiries CRM (`/api/v1/inquiries`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/inquiries` | Public | Submit inquiry form (with honeypot check) |
| `GET` | `/inquiries` | JWT | List leads (filters: `projectSlug`, `status`, `search`) |
| `GET` | `/inquiries/stats` | JWT | Lead counts: total, new, contacted, converted |
| `GET` | `/inquiries/:id` | JWT | Get single lead details |
| `PATCH` | `/inquiries/:id` | JWT | Update lead status & internal sales notes |
| `DELETE` | `/inquiries/:id` | JWT | Delete inquiry record |

### Packages & Live Pricing (`/api/v1/packages`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/packages` | Public | Get all 16 packages (or filter by `?projectSlug=`) |
| `GET` | `/packages/:id` | Public | Get single package |
| `PUT` | `/packages/:id` | JWT | Update package total price, booking money, stay days |
