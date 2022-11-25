import { JwtAuthorizer } from "@core/authorizer/JwtAuthorizer";
import { PrismaUserRepository } from "@repositories/implementations/PrismaUserRepository";

import { SignInController } from "./SignInController";
import { SignInUserCase } from "./SignInUseCase";

const jwtAuthorizer = new JwtAuthorizer();
const signInUseCase = new SignInUserCase(PrismaUserRepository.getInstance(), jwtAuthorizer);
const signInController = new SignInController(signInUseCase);

export { signInController };
