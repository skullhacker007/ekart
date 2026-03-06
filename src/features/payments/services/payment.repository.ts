/**
 * Payment Repository — Prisma queries for Payment and PaymentTransaction.
 */
import { prisma } from '@/src/lib/db/prisma';
import { PaymentStatus } from '@prisma/client';

export async function dbCreatePayment(data: {
  orderId: string;
  method: string;
  amount: number;
  idempotencyKey: string;
}) {
  // Idempotent — return existing payment if key was already used
  const existing = await prisma.payment.findUnique({
    where: { idempotencyKey: data.idempotencyKey },
  });
  if (existing) return existing;

  return prisma.payment.create({
    data: {
      orderId: data.orderId,
      method: data.method,
      amount: data.amount,
      status: PaymentStatus.INITIATED,
      idempotencyKey: data.idempotencyKey,
    },
  });
}

export async function dbCapturePayment(paymentId: string, gatewayRef: string) {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.CAPTURED },
    });
    await tx.paymentTransaction.create({
      data: { paymentId, gateway: gatewayRef, status: 'CAPTURED', amount: payment.amount },
    });
    return payment;
  });
}

export async function dbRefundPayment(paymentId: string, amount: number) {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.REFUNDED },
    });
    await tx.paymentTransaction.create({
      data: { paymentId, gateway: 'REFUND', status: 'REFUNDED', amount },
    });
    return payment;
  });
}

export async function dbGetPaymentByOrder(orderId: string) {
  return prisma.payment.findFirst({
    where: { orderId },
    include: { transactions: true },
  });
}
