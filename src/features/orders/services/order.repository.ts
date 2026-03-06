import { prisma } from "@/src/lib/db/prisma";
//data: Prisma.OrderCreateInput

export async function createOrder(data: any) {
    return prisma.order.create({
        data,
        include: { items: true },
    });
}
export async function findOrdersByUser(userId: string) {
    return prisma.order.findMany({
        where: { userId },
        include: { items: true },
    });
}