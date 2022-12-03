import { Authorizer } from "@core/authorizer/Authorizer";
import { User } from "@core/entities/User";
import { UnauthorizedHttpException } from "@core/exceptions/HttpException";
import { UserRepository } from "@repositories/UserRepository";

interface CreateTokenDTO {
  username: string;
  password: string;
}

interface UserDTO {
  id: string;
  username: string;
  name: string;
  token: string;
}

export class CreateTokenUseCase {
  constructor(
    private userRepository: UserRepository,
    private authorizer: Authorizer
  ) {}

  async execute({ username, password }: CreateTokenDTO): Promise<UserDTO> {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UnauthorizedHttpException("Invalid username or password");
    }

    if (!user.verifyPassword(password)) {
      throw new UnauthorizedHttpException("Invalid username or password");
    }

    const token = await this.authorizer.createToken(user);

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      token,
    };
  }
}
