import { PrismaAccountRepository } from "@repositories/implementations/PrismaAccountRepository";
import { PrismaTransactionRepository } from "@repositories/implementations/PrismaTransactionRepository";

import { ListTransactionUseCase } from "./ListTransactionUseCase";
import { ListTransactionController } from "./ListTransactionController";

const listTransactionUseCase = new ListTransactionUseCase(
  PrismaAccountRepository.getInstance(),
  PrismaTransactionRepository.getInstance()
);

export const listTransactionController = new ListTransactionController(
  listTransactionUseCase
);
