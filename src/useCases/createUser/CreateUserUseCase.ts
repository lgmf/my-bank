import { Authorizer } from "@core/authorizer/Authorizer";
import { Account } from "@core/entities/Account";
import { User } from "@core/entities/User";
import { BadRequestHttpException } from "@core/exceptions/HttpException";
import { UserRepository } from "@repositories/UserRepository";

interface CreateUserDTO {
  username: string;
  password: string;
}

type CreateUserResponseDTO = User & { token: string };

export class CreateUserUserCase {
  constructor(
    private userRepository: UserRepository,
    private authorizer: Authorizer
  ) { }

  async execute({ username, password }: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const account = new Account({ balance: 100 });
    const user = new User({ username, password, account });

    const usernameAlreadyTaken = await this.userRepository.findByUserName(user.username);

    if (usernameAlreadyTaken) {
      throw new BadRequestHttpException("username already taken");
    }

    await this.userRepository.create(user);

    const token = this.authorizer.createToken(user);

    return { ...user, token };
  }
}
