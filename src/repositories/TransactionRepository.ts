import { Transaction } from "@core/entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
}
