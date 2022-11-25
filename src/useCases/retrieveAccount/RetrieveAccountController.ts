import { Request, Response } from "express";

import { RetrieveAccountUserCase } from "./RetrieveAccountUseCase";

export class RetrieveAccountController {
  constructor(private retrieveAccountUseCase: RetrieveAccountUserCase) { }

  async handle(req: Request, res: Response) {
    const accountDTO = await this.retrieveAccountUseCase.execute({ userId: req.user!.id });
    res.status(200).json({ account: accountDTO });
  }
}
