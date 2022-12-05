import { Transaction } from "@core/entities/Transaction";
import { Search } from "@core/search";

type TransactionInstance = InstanceType<typeof Transaction>;

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  listByUserId(userId: string, search: Search): Promise<TransactionInstance[]>;
}
