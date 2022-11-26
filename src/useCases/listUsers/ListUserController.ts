import { Request, Response } from "express";

import { ListUserUseCase } from "./ListUserUseCase";

interface ListUserQuery {
  offset?: number;
  limit?: number;
  query?: string;
}

export class ListUserController {
  constructor(private signInUseCase: ListUserUseCase) { }

  async handle(req: Request, res: Response) {
    const query = req.query as ListUserQuery;

    const users = await this.signInUseCase.execute(query);

    res.status(200).json({ results: users });
  }
}
