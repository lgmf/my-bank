import { User } from "@core/entities/User";

type UserInstance = InstanceType<typeof User>;

export interface UserRepository {
  create(user: User): Promise<void>;
  findByUserName(username: string): Promise<UserInstance | undefined>;
  list(): Promise<UserInstance[]>;
  findById(id: string): Promise<UserInstance | undefined>;
}
