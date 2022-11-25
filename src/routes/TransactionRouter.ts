import { Router } from "express";

import jwtAuthorizerMiddleware from "@middlewares/JwtAuthorizerMiddleware";

import { depositController } from "@useCases/deposit";
import { withdrawController } from "@useCases/withdraw";
import { transferController } from "@useCases/transfer";

const transactionRouter = Router();

transactionRouter.post("/withdraw", jwtAuthorizerMiddleware, (req, res) => withdrawController.handle(req, res));
transactionRouter.post("/deposit", jwtAuthorizerMiddleware, (req, res) => depositController.handle(req, res));
transactionRouter.post("/transfer", jwtAuthorizerMiddleware, (req, res) => transferController.handle(req, res));

export default transactionRouter;
