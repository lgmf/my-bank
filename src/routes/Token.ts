import { Router } from "express";

import { createTokenController } from "@useCases/createToken";

const tokenRouter = Router();

tokenRouter.post("/", (req, res) => createTokenController.handle(req, res));

export default tokenRouter;
