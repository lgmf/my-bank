import { PrismaAccountRepository } from "@repositories/implementations/PrismaAccountRepository";
import { PrismaTransactionRepository } from "@repositories/implementations/PrismaTransactionRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { WithdrawController } from "./WithdrawController";
import { WithdrawUseCase } from "./WithdrawUseCase";

const withdrawUserUseCase = new WithdrawUseCase(PrismaTransactionRepository.getInstance(), PrismaUserRepository.getInstance(), PrismaAccountRepository.getInstance());
const withdrawController = new WithdrawController(withdrawUserUseCase);

export { withdrawUserUseCase, withdrawController };
