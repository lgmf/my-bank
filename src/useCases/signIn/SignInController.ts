import { Request, Response } from "express";

import { SignInUserCase } from "./SignInUseCase";

interface SignInBody {
  username: string;
  password: string;
}

export class SignInController {
  constructor(private signInUseCase: SignInUserCase) { }

  async handle(req: Request, res: Response) {
    const body = req.body as SignInBody;

    const token = await this.signInUseCase.execute({
      username: body.username,
      password: body.password
    });

    res.status(200).json({ token });
  }
}
