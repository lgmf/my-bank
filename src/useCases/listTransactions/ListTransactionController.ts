import { Request, Response } from "express";

import { ListTransactionUseCase } from "./ListTransactionUseCase";

interface ListTransactionQuery {
  offset?: number;
  limit?: number;
}

export class ListTransactionController {
  constructor(private signInUseCase: ListTransactionUseCase) {}

  async handle(req: Request, res: Response) {
    const query = req.query as ListTransactionQuery;
    const userId = req.context.get("userId") as string;

    const transactions = await this.signInUseCase.execute(userId, query);

    res.status(200).json({ results: transactions });
  }
}
