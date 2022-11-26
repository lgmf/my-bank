import express from "express";
import "express-async-errors";

import exceptionHandlerMiddleware from "@middlewares/ExceptionHandlerMiddleware";

import userRouter from "@routes/UserRouter";
import transactionRouter from "@routes/TransactionRouter";
import tokenRouter from "@routes/Token";
import accountRouter from "@routes/AccountRouter";
import { requestContextMiddleware } from "@middlewares/requestContextMiddleware";

const app = express();

app.use(express.json());
app.use(requestContextMiddleware);

app.use("/token", tokenRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
app.use("/accounts", accountRouter);

app.use(exceptionHandlerMiddleware);

export default app;
