import { NotFoundHttpException } from "@core/exceptions/HttpException";
import { UserRepository } from "@repositories/UserRepository";

interface RetrieveAccountDTO {
  userId: string;
}

interface AccountDTO {
  id: string;
  username: string;
  balance: number;
}

export class RetrieveAccountUserCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ userId }: RetrieveAccountDTO): Promise<AccountDTO> {
    console.log("userId", userId);
    
    const user = await this.userRepository.findById(userId);

    console.log("user", user);

    if (!user) {
      throw new NotFoundHttpException("user not found");
    }

    return {
      id: user.account.id,
      username: user.username,
      balance: user.account.balance
    }
  }
}
