import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Kart API',
      version: '1.0.0',
      description:
        'Professional e-commerce REST API built with Next.js 14, Prisma, and PostgreSQL.',
      contact: {
        name: 'E-Kart Dev Team',
      },
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development Server' },
      { url: 'https://your-production-url.com', description: 'Production Server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ─── COMMON ────────────────────────────────────────────────────
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Resource not found' },
            statusCode: { type: 'integer', example: 404 },
          },
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 20 },
            hasNextPage: { type: 'boolean' },
            nextCursor: { type: 'string', nullable: true },
          },
        },
        // ─── CATALOG ───────────────────────────────────────────────────
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Electronics' },
            slug: { type: 'string', example: 'electronics' },
            parentId: { type: 'string', nullable: true },
            children: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
          },
        },
        Brand: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Apple' },
            slug: { type: 'string', example: 'apple' },
          },
        },
        ProductImage: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            url: { type: 'string', example: 'https://cdn.example.com/image.jpg' },
            position: { type: 'integer', nullable: true },
          },
        },
        ProductVariant: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            sku: { type: 'string', example: 'IPHONE-15-128GB' },
            price: { type: 'number', format: 'float', example: 999.99 },
            attributes: { type: 'array', items: { type: 'object' } },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'iPhone 15' },
            slug: { type: 'string', example: 'iphone-15' },
            description: { type: 'string', nullable: true },
            category: { $ref: '#/components/schemas/Category' },
            brand: { $ref: '#/components/schemas/Brand' },
            images: { type: 'array', items: { $ref: '#/components/schemas/ProductImage' } },
            variants: { type: 'array', items: { $ref: '#/components/schemas/ProductVariant' } },
          },
        },
        // ─── INVENTORY ─────────────────────────────────────────────────
        Inventory: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            variantId: { type: 'string', format: 'uuid' },
            warehouseId: { type: 'string', format: 'uuid' },
            stock: { type: 'integer', example: 150 },
            reserved: { type: 'integer', example: 5 },
          },
        },
        // ─── CART ──────────────────────────────────────────────────────
        CartItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            variantId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', example: 2 },
          },
        },
        // ─── ORDER ─────────────────────────────────────────────────────
        OrderItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            variantId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', example: 1 },
            price: { type: 'number', format: 'float', example: 999.99 },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            total: { type: 'number', format: 'float', example: 1999.98 },
            status: {
              type: 'string',
              enum: ['PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
          },
        },
        // ─── PAYMENT ───────────────────────────────────────────────────
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            orderId: { type: 'string', format: 'uuid' },
            method: { type: 'string', example: 'CARD' },
            amount: { type: 'number', format: 'float', example: 1999.98 },
            status: { type: 'string', enum: ['INITIATED', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'] },
          },
        },
        // ─── USER ──────────────────────────────────────────────────────
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            name: { type: 'string', nullable: true, example: 'John Doe' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'User registration, login, and session management' },
      { name: 'Catalog', description: 'Product catalog, categories, and brands' },
      { name: 'Products', description: 'Product listing, detail, search, and filtering' },
      { name: 'Cart', description: 'Shopping cart operations' },
      { name: 'Checkout', description: 'Checkout and order preparation' },
      { name: 'Orders', description: 'Order management and history' },
      { name: 'Payments', description: 'Payment creation and verification' },
      { name: 'Shipping', description: 'Shipment tracking and updates' },
      { name: 'Inventory', description: 'Stock management' },
      { name: 'Admin', description: 'Admin-only management APIs' },
      { name: 'Reviews', description: 'Product reviews and ratings (optional)' },
    ],
  },
  // Scan all API route files for JSDoc @swagger comments
  apis: ['./app/api/**/*.ts', './src/features/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
