import { Request, Response } from "express";

import { CreateTokenUserCase } from "./CreateTokenUseCase";

interface SignInBody {
  username: string;
  password: string;
}

export class CreateTokenController {
  constructor(private signInUseCase: CreateTokenUserCase) { }

  async handle(req: Request, res: Response) {
    const body = req.body as SignInBody;

    const token = await this.signInUseCase.execute({
      username: body.username,
      password: body.password
    });

    res.status(200).json({ token });
  }
}
