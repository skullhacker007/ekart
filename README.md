# E-Kart | Modern E-Commerce MVP

A robust, scalable e-commerce foundation built with **Next.js 14**, **Prisma**, and **Tailwind CSS**. This project follows the **Feature-Sliced Design (FSD)** architectural pattern to ensure long-term maintainability and clean separation of concerns.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database / ORM:** [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Validation:** [Zod](https://zod.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Recommended for Features) / React Context
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 🏗️ Architecture Overview

The project uses a hybrid of **Next.js App Router** and **Feature-Sliced Design (FSD)**.

### Folder Structure

```text
e-kart/
├── app/                  # Next.js App Router (Routing & Layouts only)
│   ├── (auth)/           # Route groups for Auth
│   ├── admin/            # Admin dashboard routes
│   ├── products/         # Product listing & detail routes
│   └── layout.tsx        # Root layout with Providers
├── src/                  # Main Application Logic
│   ├── components/       # Shared Global UI Components (Dumb components)
│   │   ├── ui/           # Generic atomic components (Button, Input)
│   │   └── layout/       # Shared layout pieces (Navbar, Footer)
│   ├── features/         # Domain-driven Modules (The core of the app)
│   │   ├── auth/         # Auth logic: components, actions, services
│   │   ├── products/     # Product logic: cards, galleries, filters
│   │   └── cart/         # Cart state and management
│   ├── lib/              # Third-party library initializations (Prisma, API clients)
│   ├── hooks/            # Global reusable React hooks
│   ├── config/           # App configuration & Env validation
│   └── styles/           # Global styles and Tailwind directives
├── prisma/               # Database schema and migrations
└── public/               # Static assets (images, icons)
```

### Key Architectural Rules

1. **Routing vs Logic:** Keep `app/` folders strictly for routing and high-level layouts. All business logic, complex components, and state should live in `src/features/`.
2. **Feature Encapsulation:** A feature folder (e.g., `src/features/cart`) should ideally contain its own components, server actions, and types.
3. **Shared UI:** Only truly generic/reusable components (like a `Button` or `Modal`) should live in `src/components/ui`.

---

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL instance

### 2. Environment Setup

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ekart"
```

### 3. Installation

```bash
pnpm install
```

### 4. Database Initialization

```bash
pnpm exec prisma generate
pnpm exec prisma db push
```

### 5. Running Development Server

```bash
pnpm dev
# or for network access:
pnpm dev --hostname 0.0.0.0
```

---

## 📖 Developer Knowledge Transfer (KT)

### Adding a New Feature

1. Create a new folder in `src/features/[feature-name]`.
2. Add a `components/` subfolder for feature-specific UI.
3. Add an `actions/` subfolder for Server Actions (`'use server'`).
4. If the feature needs a database model, update `prisma/schema.prisma` and run `pnpm exec prisma generate`.

### Server Actions

We use Next.js Server Actions for all data mutations. Define them in `src/features/[feature]/actions/`. Ensure you use `'use server'` at the top of the file.

### Environment Validation

All environment variables are validated at runtime using Zod. Update `src/config/env.ts` when adding new variables to ensure the app fails fast if a config is missing.

### Prisma Singleton

Always import `prisma` from `@/lib/db/prisma` to ensure you are using the singleton instance and avoid "too many clients" errors during development hot-reloads.

---

## 📜 Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Optimizes the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to check for code quality issues.
- `pnpm exec prisma studio`: Opens a GUI to view/edit your database data.

### 🗄️ Database Commands

```bash
# Add Prisma dependencies (already done)
pnpm add @prisma/client
pnpm add -D prisma

# Run migrations based on schema
pnpm prisma migrate dev --name ecommerce_init

# Generate Prisma client
pnpm prisma generate

# Open Prisma Studio GUI
pnpm prisma studio
```

---

<h2 style="color: #F97316;">💾 Database Logic</h2>

The backend data layer is deliberately structured for maintainability and separation of concerns.

### 1. The Schema (`prisma/schema.prisma`)
This single file is the source of truth for the entire database structure.
-   **Users**: Core user accounts and addresses.
-   **Catalog System**: Categories (tree structure), Brands, and Products.
-   **Variant Engine**: A dynamic attribute system (`Attribute`, `AttributeValue`, `VariantAttribute`) to handle complex product variations (like size/color combinations).
-   **Core Operations**: Tables for Orders, CartItems, and Inventory tracking.

### 2. Database Connection (`src/lib/db/prisma.ts`)
We use a singleton pattern for the Prisma Client.
-   **Why?** In development, Next.js frequently hot-reloads the application. If we created a new client on every reload, we would quickly exhaust the database connections and crash the app. This file attaches the Prisma client to the global namespace, ensuring only one connection pool exists.
-   **Usage:** *Never* instantiate `new PrismaClient()` in your features. Always import the client from this file: `import { prisma } from "@/src/lib/db/prisma";`

### 3. The Repository Layer (`src/lib/repositories/`)
We use the Repository Pattern to abstract away direct database calls. Instead of calling Prisma directly inside Next.js Server Actions or API routes, we call repository functions.
-   **`product.repository.ts`**: Handles finding products, variants, and their nested relations (images, brands). Example: `findProductBySlug()`.
-   **`category.repository.ts`**: Handles fetching tree structures, like grabbing the top-level categories and their children.
-   **`order.repository.ts`**: Centralizes order creation and retrieval.
-   **Why?** This keeps business logic clean and makes it easy to mock database calls in the future if unit testing is introduced.

<h2 style="color: #F97316;">⚙️ Backend Logic</h2>

The following is our comprehensive blueprint for building out the e-commerce backend APIs and Services.

### 1. System Foundation (Required)
- **Project Structure:** Feature modules, shared libraries, and global utilities.
- **Environment Configuration:** Validation using Zod.

### 2. Database Layer (Required)
- **Schema Design:** Users, Catalog, Variants, Inventory, Orders, Payments, Shipping.
- **ORM Integration:** Prisma client, connection management.
- **Optimization:** Indexes and foreign keys.

### 3. Core Backend Architecture (Required)
- **Repository Layer:** Data access abstraction. 
- **Service Layer:** Business logic and domain operations.
- **Validation Layer:** Input request validation.
- **API / Server Actions Layer:** Next.js Data mutations and retrieval endpoints.

### 4. Authentication & Authorization (Required)
- **Authentication System:** User registration, login, and session management.
- **Security:** Password hashing, token validation, CSRF/CORS.

### 5. Catalog Domain (Required)
- **Admin Management:** Categories, Brands, Products, Variants, Attributes.
- **Search & Filtering:** Keyword search, price filtering, and attribute filtering.

### 6. Inventory Domain (Required)
- **Management:** Stock tracking, warehouse management.
- **Reservation System:** Reserve stock securely during checkout flow.

### 7. Cart Domain (Required)
- **Cart Service:** Add/update/remove items.

### 8. Checkout Domain (Required - High Priority)
- **Checkout Service:** Cart validation, inventory validation, price calculation.
- **Idempotency Strategy:** Implement strict idempotency keys to ensure users are never double-charged if they click "Pay" multiple times.

### 9. Order Domain (Required)
- **Order Management:** Creation, items, status updates, and history tracking.

### 10. Payment Domain (Required - High Priority)
- **Payment Service:** Secure creation, verification, capture, and refunds. Integrates tightly with Idempotency keys.

### 11. Shipping Domain (Required)
- **Shipping Service:** Shipment creation and tracking updates.

### 12. Transactional Email Domain (Required)
- **Notifications:** Order confirmations, shipping updates, daily/weekly offers, and new arrival blasts.

### 13. Review Domain (Optional)
- Product reviews, ratings, and moderation.

### 14. Promotions Domain (Optional)
- Coupons, discounts, campaigns, and rules.

### 15. Admin Backend (Required)
- Centralized Admin APIs for managing Products, Categories, Orders, Inventory, and Users.

### 16. Logging, Monitoring, & Error Handling (Required)
- Global error handling, API response standardization, and error tracking.

### 17. Security Layer (Required)
- Input validation, rate limiting, and endpoint protection.

### 18. Performance Optimization (Required)
- Database indexing, caching strategies.

### Final Backend Implementation Order (Professional)

1. **System Foundation**
   - Architecture Design
   - Project Structure
   - Environment Configuration

2. **Database Layer**
   - Database Schema
   - Database Migrations
   - ORM Setup
   - Database Optimization

3. **Core Backend Architecture**
   - Repository Layer
   - Validation Layer
   - Service Layer
   - API / Server Actions (Optimized for fast, sub-100ms responses to prevent UI lag)
   - **Pagination & Filtering Engine** (Cursor-based or offset pagination to handle thousands of products without slowing down)

4. **Security Foundation (Initialized early)**
   - Authentication & Authorization
   - Security Setup
   - CORS
   - CSRF protection
   - Rate limiting (Crucial to protect against spam / multiple rapid requests)

5. **Infrastructure & Platform Services (Required)**
   - **Asset / Media Upload Service:** Handles product image and media storage.
   - **Logging & Monitoring:** Application logs, request tracking, and system monitoring.
   - **Error Handling:** Centralized error handling and API response standardization.
   - **Background Job / Queue System:** Offloads heavy or asynchronous tasks such as email sending, analytics processing, and stock synchronization to prevent blocking API requests.
   - **Caching Layer:** Redis or in-memory caching for catalog data, high-traffic endpoints, and expensive database queries to reduce backend load and improve response times.

6. **Catalog Domain**
   - Catalog Admin Backend
   - Product Search & Filtering (Optimized indexing for instant UI feedback)

7. **Inventory Domain**
   - Inventory Management

8. **Cart Domain**
   - Cart Service

9. **Checkout Domain**
   - Checkout Service
   - Cart validation
   - Inventory validation
   - Price calculation
   - Idempotency handling

10. **Order Domain**
    - Order Management

11. **Payment Domain**
    - Payment Service
    - Payment Gateway Integration

12. **Shipping Domain**
    - Shipping Service

13. **Communication Services (Triggered by events like order placed, shipment updates)**
    - Transactional Email Service (Executed via Background Queue)

14. **Admin Backend**
    - Admin APIs

15. **Performance Layer**
    - Performance Optimization
    - **Concurrency & Multiple Request Handling** (Optimized Prisma connection pooling to handle concurrent database hits smoothly)
    - Query optimization

16. **Optional Domains (Enhancements after core ecommerce works)**
    - Review System
    - Promotions System
    - Analytics System

17. **Future Extensions**
    - Recommendation Engine
    - Notifications System
    - Search Engine Integration
    - Event System