import { Transaction } from "@core/entities/Transaction";
import prisma from "@core/orm/prisma";
import { Search } from "@core/search";

import { TransactionRepository } from "../TransactionRepository";

export class PrismaTransactionRepository implements TransactionRepository {
  private static instance: PrismaTransactionRepository | null = null;

  static getInstance(): PrismaTransactionRepository {
    if (!PrismaTransactionRepository.instance) {
      PrismaTransactionRepository.instance = new PrismaTransactionRepository();
    }

    return PrismaTransactionRepository.instance;
  }

  private constructor() {}

  async create(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        amount: transaction.amount,
        recipientId: transaction.recipient.id,
        senderId: transaction.sender.id,
      },
    });
  }

  async listByUserId(
    userId: string,
    { offset, limit }: Search
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            recipientId: userId,
          },
        ],
      },
      include: {
        recipient: true,
        sender: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions.map((transaction) => {
      return new Transaction(
        {
          amount: transaction.amount,
          recipient: transaction.recipient,
          sender: transaction.sender,
          createdAt: transaction.createdAt,
        },
        transaction.id
      );
    });
  }
}
