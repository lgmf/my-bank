import { Router } from "express";

import { signInController } from "@useCases/signIn";

const signInRouter = Router();

signInRouter.post("/", (req, res) => signInController.handle(req, res));

export default signInRouter;
