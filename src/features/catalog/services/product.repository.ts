import { prisma } from "@/src/lib/db/prisma";

export async function findProducts() {
    return prisma.product.findMany({
        include: {
            variants: true,
            images: true,
            brand: true,
            category: true,
        },
    });
}

export async function findProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            variants: {
                include: {
                    attributes: {
                        include: {
                            value: true,
                        },
                    },
                },
            },
            images: true,
        },
    });
}