import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.attribute.createMany({
        data: [
            { name: "Size", code: "size", isFilterable: true },
            { name: "Color", code: "color", isFilterable: true },
        ],
    });

    console.log("Seed completed");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());