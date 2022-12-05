import { PrismaAccountRepository } from "@repositories/implementations/PrismaAccountRepository";
import { PrismaTransactionRepository } from "@repositories/implementations/PrismaTransactionRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { TransferController } from "./TransferController";
import { TransferUserCase } from "./TransferUseCase";

const transferUseCase = new TransferUserCase(
  PrismaUserRepository.getInstance(),
  PrismaAccountRepository.getInstance(),
  PrismaTransactionRepository.getInstance()
);

export const transferController = new TransferController(transferUseCase);
