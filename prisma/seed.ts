import { prisma } from "../src/lib/db/prisma";

async function main() {
    await prisma.attribute.createMany({
        data: [
            { name: "Size", code: "size", isFilterable: true },
            { name: "Color", code: "color", isFilterable: true },
        ],
    });

    console.log("Seed completed");
}

main();