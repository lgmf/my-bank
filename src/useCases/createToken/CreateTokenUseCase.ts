import { Authorizer } from "@core/authorizer/Authorizer";
import { UnauthorizedHttpException } from "@core/exceptions/HttpException";
import { UserRepository } from "@repositories/UserRepository";

interface SignInDTO {
  username: string;
  password: string;
}

export class CreateTokenUserCase {
  constructor(private userRepository: UserRepository, private authorizer: Authorizer) { }

  async execute({ username, password }: SignInDTO) {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UnauthorizedHttpException("Invalid username or password");
    }

    if (!user.verifyPassword(password)) {
      throw new UnauthorizedHttpException("Invalid username or password");
    }

    return this.authorizer.createToken(user);
  }
}
