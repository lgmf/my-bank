import { Account } from "@core/entities/Account";
import { BadRequestHttpException, NotFoundHttpException } from "@core/exceptions/HttpException";
import { AccountRepository } from "@repositories/AccountRepository";
import { UserRepository } from "@repositories/UserRepository";

interface TransferDTO {
  senderUserId: string;
  recipientUserId: string;
  amount: number;
}

export class TransferUserCase {
  constructor(
    private userRepository: UserRepository,
    private accountRepository: AccountRepository
  ) { }

  async execute({ senderUserId, recipientUserId, amount }: TransferDTO) {
    if (senderUserId === recipientUserId) {
      throw new BadRequestHttpException("cannot transfer for yourself");
    }

    if (amount <= 0) {
      throw new BadRequestHttpException("amount must be greater than zero");
    }

    const sender = await this.userRepository.findById(senderUserId);

    if (!sender) {
      throw new NotFoundHttpException("sender not found");
    }

    const recipient = await this.userRepository.findById(recipientUserId);

    if (!recipient) {
      throw new NotFoundHttpException("recipient not found");
    }

    const senderAccount = new Account({ balance: sender.account.balance - amount }, sender.account.id);
    const recipientAccount = new Account({ balance: recipient.account.balance + amount }, recipient.account.id);

    await this.accountRepository.transfer(senderAccount, recipientAccount, amount);
  }
}
