import { Router } from "express";

import { createUserController } from "@useCases/createUser";
import { listUserController } from "@useCases/listUsers";

const userRouter = Router();

userRouter.post("/", (req, res) => createUserController.handle(req, res));
userRouter.get("/", (req, res) => listUserController.handle(req, res));

export default userRouter;
