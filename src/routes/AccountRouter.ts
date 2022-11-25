import { Router } from "express";

import { retrieveAccountController } from "@useCases/retrieveAccount";
import jwtAuthorizerMiddleware from "@middlewares/JwtAuthorizerMiddleware";

const accountRouter = Router();

accountRouter.get("/", jwtAuthorizerMiddleware, (req, res) => retrieveAccountController.handle(req, res));

export default accountRouter;
