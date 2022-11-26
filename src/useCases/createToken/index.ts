import { JwtAuthorizer } from "@core/authorizer/JwtAuthorizer";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { CreateTokenController } from "./CreateTokenController";
import { CreateTokenUseCase } from "./CreateTokenUseCase";

const jwtAuthorizer = new JwtAuthorizer();
const createTokenUseCase = new CreateTokenUseCase(PrismaUserRepository.getInstance(), jwtAuthorizer);
const createTokenController = new CreateTokenController(createTokenUseCase);

export { createTokenController };
