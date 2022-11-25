import { Account } from "@core/entities/Account";
import { ValidationException } from "@core/exceptions/ValidationException";
import prisma from "@core/orm/prisma";

import { AccountRepository } from "../AccountRepository";

export class PrismaAccountRepository implements AccountRepository {
  private static instance: PrismaAccountRepository | null = null;

  static getInstance(): PrismaAccountRepository {
    if (!PrismaAccountRepository.instance) {
      PrismaAccountRepository.instance = new PrismaAccountRepository();
    }

    return PrismaAccountRepository.instance;
  }

  private constructor() { }

  async save(account: Account) {
    await prisma.account.upsert({
      where: {
        id: account.id
      },
      update: {
        balance: account.balance
      },
      create: {
        id: account.id,
        balance: account.balance
      }
    });
  }

  async transfer(from: Account, to: Account, amount: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const sender = await tx.account.update({
        where: {
          id: from.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })

      if (sender.balance < 0) {
        throw new ValidationException("sender doesn't have enough money")
      }

      await tx.account.update({
        where: {
          id: to.id,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      })
    })
  }
}
