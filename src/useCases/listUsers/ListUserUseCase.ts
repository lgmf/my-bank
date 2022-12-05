import { Search } from "@core/search";
import { UserRepository } from "@repositories/UserRepository";

interface ListUserDTO {
  offset?: number;
  limit?: number;
  query?: string;
}

interface UserDTO {
  id: string;
  name: string;
  username: string;
  account?: {
    id: string;
    balance: number;
  };
}

export class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, payload: ListUserDTO): Promise<UserDTO[]> {
    const search = new Search(payload);

    const users = await this.userRepository.list(search);

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      account:
        user.id === userId
          ? {
              id: user.account.id,
              balance: user.account.balance,
            }
          : undefined,
    }));
  }
}
