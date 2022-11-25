import { User } from "@core/entities/User";
import prisma from "@core/orm/prisma";

import { UserRepository } from "../UserRepository";

export class PrismaUserRepository implements UserRepository {
  private static instance: PrismaUserRepository | null = null;

  static getInstance(): PrismaUserRepository {
    if (!PrismaUserRepository.instance) {
      PrismaUserRepository.instance = new PrismaUserRepository();
    }

    return PrismaUserRepository.instance;
  }

  private constructor() { }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        password: user.password,
        username: user.username,
        account: {
          create: {
            id: user.account.id,
            balance: user.account.balance
          }
        }
      },
    });
  }

  async findByUserName(username: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        username
      },
      include: {
        account: true
      }
    });

    if (!user) {
      return;
    }

    return user;
  }

  list(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        account: true
      }
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        account: true
      }
    });

    if (!user) {
      return;
    }

    return user;
  }
}
