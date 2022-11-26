import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { ListUserUseCase } from "./ListUserUseCase";
import { ListUserController } from "./ListUserController";

const listUserUseCase = new ListUserUseCase(PrismaUserRepository.getInstance());

export const listUserController = new ListUserController(listUserUseCase);
