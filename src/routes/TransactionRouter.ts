import { Router } from "express";

import jwtAuthorizerMiddleware from "@middlewares/JwtAuthorizerMiddleware";

import { depositController } from "@useCases/deposit";
import { withdrawController } from "@useCases/withdraw";
import { transferController } from "@useCases/transfer";
import { listTransactionController } from "@useCases/listTransactions";

const transactionRouter = Router();

transactionRouter.post("/withdraw", jwtAuthorizerMiddleware, (req, res) =>
  withdrawController.handle(req, res)
);

transactionRouter.post("/deposit", jwtAuthorizerMiddleware, (req, res) =>
  depositController.handle(req, res)
);

transactionRouter.post("/transfer", jwtAuthorizerMiddleware, (req, res) =>
  transferController.handle(req, res)
);

transactionRouter.get("/", jwtAuthorizerMiddleware, (req, res) =>
  listTransactionController.handle(req, res)
);

export default transactionRouter;
