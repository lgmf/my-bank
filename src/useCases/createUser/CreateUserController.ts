import { Request, Response } from "express";
import { CreateUserUserCase } from "./CreateUserUseCase";

interface CreateUserBody {
  username: string;
  password: string;
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUserCase) { }

  async handle(req: Request, res: Response) {
    const body = req.body as CreateUserBody;

    const user = await this.createUserUseCase.execute({
      username: body.username,
      password: body.password
    });

    res.status(200).json({ user });
  }
}
