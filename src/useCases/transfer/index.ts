import { PrismaAccountRepository } from "@repositories/implementations/PrismaAccountRepository";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { TransferController } from "./TransferController";
import { TransferUserCase } from "./TransferUseCase";

const transferUseCase = new TransferUserCase(PrismaUserRepository.getInstance(), PrismaAccountRepository.getInstance())
const transferController = new TransferController(transferUseCase);

export { transferController };
