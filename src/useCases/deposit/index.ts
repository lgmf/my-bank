import { PrismaAccountRepository } from "@repositories/implementations/PrismaAccountRepository";
import { PrismaTransactionRepository } from "@repositories/implementations/PrismaTransactionRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { DepositController } from "./DepositController";
import { DepositUseCase } from "./DepositUseCase";

const depositUserUseCase = new DepositUseCase(PrismaTransactionRepository.getInstance(), PrismaUserRepository.getInstance(), PrismaAccountRepository.getInstance());
const depositController = new DepositController(depositUserUseCase);

export { depositUserUseCase, depositController };
