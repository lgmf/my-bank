import { User } from "@core/entities/User";
import { Search } from "@core/search";

type UserInstance = InstanceType<typeof User>;

export interface UserRepository {
  create(user: User): Promise<void>;
  findByUserName(username: string): Promise<UserInstance | undefined>;
  list(search: Search): Promise<UserInstance[]>;
  findById(id: string): Promise<UserInstance | undefined>;
}
