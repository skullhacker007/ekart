import { PrismaClient } from "@prisma/client";
import { logger } from "../src/lib/services/logger";

const prisma = new PrismaClient();

async function main() {
    await prisma.attribute.createMany({
        data: [
            { name: "Size", code: "size", isFilterable: true },
            { name: "Color", code: "color", isFilterable: true },
        ],
    });

    logger.info('Seed completed');
}

main()
    .catch((e) => logger.error('Seed failed', { error: e }))
    .finally(() => prisma.$disconnect());