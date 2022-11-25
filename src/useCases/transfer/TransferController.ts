import { Request, Response } from "express";

import { TransferUserCase } from "./TransferUseCase";

interface TransferBody {
  recipientUserId: string;
  amount: number;
}

export class TransferController {
  constructor(
    private transferUseCase: TransferUserCase
  ) { }

  async handle(req: Request, res: Response) {
    const { recipientUserId, amount } = req.body as TransferBody;

    const senderUserId = req.context.get("userId") as string;

    await this.transferUseCase.execute({ senderUserId, recipientUserId, amount });

    res.status(201).send();
  }
}
