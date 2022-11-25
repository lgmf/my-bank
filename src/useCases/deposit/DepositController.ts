import { Request, Response } from "express";

import { DepositUseCase } from "./DepositUseCase";

interface WithdrawBody {
  amount: number;
}

export class DepositController {
  constructor(private depositUseCase: DepositUseCase) { }

  async handle(req: Request, res: Response) {
    const body = req.body as WithdrawBody;
    const userId = req.context.get("userId") as string;

    await this.depositUseCase.execute({ userId, amount: body.amount });

    res.status(201).send();
  }
}
