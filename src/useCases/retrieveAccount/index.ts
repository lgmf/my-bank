import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { RetrieveAccountUserCase } from "./RetrieveAccountUseCase";
import { RetrieveAccountController } from "./RetrieveAccountController";

const retrieveAccountUseCase = new RetrieveAccountUserCase(PrismaUserRepository.getInstance());
const retrieveAccountController = new RetrieveAccountController(retrieveAccountUseCase);

export { retrieveAccountController };
