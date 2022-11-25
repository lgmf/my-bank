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

    await this.transferUseCase.execute({ senderUserId: req.user!.id, recipientUserId, amount });

    res.status(201).send();
  }
}
