import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { CreateUserUserCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { JwtAuthorizer } from "@core/authorizer/JwtAuthorizer";

const jwtAuthorizer = new JwtAuthorizer();
const createUserUseCase = new CreateUserUserCase(PrismaUserRepository.getInstance(), jwtAuthorizer);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
