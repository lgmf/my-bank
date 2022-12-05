import { Account } from "@core/entities/Account";
import { Transaction } from "@core/entities/Transaction";
import {
  BadRequestHttpException,
  NotFoundHttpException,
} from "@core/exceptions/HttpException";

import { AccountRepository } from "@repositories/AccountRepository";
import { TransactionRepository } from "@repositories/TransactionRepository";
import { UserRepository } from "@repositories/UserRepository";

interface WithdrawDTO {
  userId: string;
  amount: number;
}

export class WithdrawUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private userRepository: UserRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({ userId, amount }: WithdrawDTO) {
    if (amount <= 0) {
      throw new BadRequestHttpException("amount must be greater than zero");
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundHttpException("user not found");
    }

    if (user.account.balance - amount < 0) {
      throw new BadRequestHttpException(
        `amount exceeded balance: ${user.account.balance}`
      );
    }

    const transaction = new Transaction({
      amount: amount * -1,
      sender: user,
      recipient: user,
    });

    const balance = user.account.balance - amount;
    const account = new Account({ balance }, user.account.id);

    await this.accountRepository.save(account);
    await this.transactionRepository.create(transaction);
  }
}
