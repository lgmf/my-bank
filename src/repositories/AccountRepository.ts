import { Account } from "@core/entities/Account";

export interface AccountRepository {
  save(account: Account): Promise<void>;
  transfer(sender: Account, recipient: Account, amount: number): Promise<void>;
  findByUserId(userId: string): Promise<Account | undefined>;
}
