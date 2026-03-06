import { prisma } from "@/src/lib/db/prisma";

export async function getCategories() {
    return prisma.category.findMany({
        where: { parentId: null },
        include: { children: true },
    });
}