import { Request, Response } from "express";

import { WithdrawUseCase } from "./WithdrawUseCase";

interface WithdrawBody {
  amount: number;
}

export class WithdrawController {
  constructor(private withdrawUseCase: WithdrawUseCase) { }

  async handle(req: Request, res: Response) {
    const body = req.body as WithdrawBody;

    await this.withdrawUseCase.execute({ userId: req.user!.id, amount: body.amount });

    res.status(201).send();
  }
}
