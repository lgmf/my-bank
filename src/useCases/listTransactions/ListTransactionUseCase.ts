import { TransactionType } from "@core/entities/Transaction";
import { Search } from "@core/search";
import { TransactionRepository } from "@repositories/TransactionRepository";

interface ListTransactionDTO {
  offset?: number;
  limit?: number;
}

interface TransactionDTO {
  id: string;
  amount: number;
  type: TransactionType;
  createdAt: Date;
  sender: {
    id: string;
    name: string;
  };
  recipient: {
    id: string;
    name: string;
  };
}
export class ListTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    userId: string,
    payload: ListTransactionDTO
  ): Promise<TransactionDTO[]> {
    const search = new Search(payload);

    const transactions = await this.transactionRepository.listByUserId(
      userId,
      search
    );

    return transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
      sender: {
        id: transaction.sender.id,
        name: transaction.sender.name,
      },
      recipient: {
        id: transaction.recipient.id,
        name: transaction.recipient.name,
      },
    }));
  }
}
