import { JwtAuthorizer } from "@core/authorizer/JwtAuthorizer";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { CreateTokenController } from "./CreateTokenController";
import { CreateTokenUserCase } from "./CreateTokenUseCase";

const jwtAuthorizer = new JwtAuthorizer();
const createTokenUseCase = new CreateTokenUserCase(PrismaUserRepository.getInstance(), jwtAuthorizer);
const createTokenController = new CreateTokenController(createTokenUseCase);

export { createTokenController };
