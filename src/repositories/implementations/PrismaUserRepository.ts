import { User } from "@core/entities/User";
import prisma from "@core/orm/prisma";
import { Search } from "@core/search";

import { UserRepository } from "../UserRepository";

interface UserDTO {
  id: string;
  name: string;
  salt: string;
  password: string;
  username: string;
  account: {
    id: string,
    balance: number;
  }
}

export class PrismaUserRepository implements UserRepository {
  private static instance: PrismaUserRepository | null = null;

  static getInstance(): PrismaUserRepository {
    if (!PrismaUserRepository.instance) {
      PrismaUserRepository.instance = new PrismaUserRepository();
    }

    return PrismaUserRepository.instance;
  }

  private static toEntity(user: UserDTO): InstanceType<typeof User> {
    return new User({
      name: user.name,
      password: user.password,
      username: user.username,
      account: user.account,
    }, user.id, user.salt);
  }

  private constructor() { }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        salt: user.salt,
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

    return PrismaUserRepository.toEntity(user);
  }

  async list({ offset, limit, query }: Search): Promise<User[]> {

    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        username: {
          search: query
        },
        name: {
          search: query
        }
      },
      include: {
        account: true
      }
    });

    return users.map((user) => PrismaUserRepository.toEntity(user));
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

    return PrismaUserRepository.toEntity(user);
  }
}
