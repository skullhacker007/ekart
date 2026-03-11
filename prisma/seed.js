const { PrismaClient } = require('@prisma/client');
const seedData = require('./seed-data.json');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding from JSON source...');

  try {
    const categoryMap = {};

    // 1. Upsert Categories
    for (const cat of seedData.categories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {
          icon: cat.icon,
          color: cat.color,
        },
        create: {
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon,
          color: cat.color,
        },
      });
      categoryMap[cat.slug] = category.id;
    }
    console.log('Categories processed.');

    // 2. Upsert Products
    for (const p of seedData.products) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          rating: p.rating,
          reviewsCount: p.reviewsCount,
        },
        create: {
          name: p.name,
          slug: p.slug,
          rating: p.rating,
          reviewsCount: p.reviewsCount,
          categoryId: categoryMap[p.categorySlug],
          images: {
            create: {
              url: p.imageUrl,
              position: 1,
            },
          },
          variants: {
            create: {
              sku: `${p.slug}-default`,
              price: p.price,
            },
          },
        },
      });
    }

    console.log('Products processed.');
    console.log('Seeding finished successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
