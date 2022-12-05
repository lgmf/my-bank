import { NotFoundHttpException } from "@core/exceptions/HttpException";
import { Search } from "@core/search";
import { AccountRepository } from "@repositories/AccountRepository";
import { TransactionRepository } from "@repositories/TransactionRepository";

interface ListTransactionDTO {
  offset?: number;
  limit?: number;
}

interface TransactionDTO {
  id: string;
  amount: number;
  type: "deposit" | "withdraw";
  createdAt: Date;
}
export class ListTransactionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository
  ) {}

  async execute(
    userId: string,
    payload: ListTransactionDTO
  ): Promise<TransactionDTO[]> {
    const account = await this.accountRepository.findByUserId(userId);

    if (!account) {
      throw new NotFoundHttpException("account not found");
    }

    const search = new Search(payload);
    const transactions = await this.transactionRepository.list(
      account.id,
      search
    );

    return transactions.map(({ id, amount, createdAt }) => ({
      id,
      amount,
      type: amount < 0 ? "withdraw" : "deposit",
      createdAt,
    }));
  }
}
