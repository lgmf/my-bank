import { User } from "@core/entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  findByUserName(username: string): Promise<User | undefined>;
  list(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
}
