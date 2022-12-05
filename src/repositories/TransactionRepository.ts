import { Transaction } from "@core/entities/Transaction";
import { Search } from "@core/search";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  list(accountId: string, search: Search): Promise<Transaction[]>;
}
