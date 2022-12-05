import Joi from "joi";
import { Account } from "./Account";
import { Entity } from "./Entity";

interface TransactionProps {
  account: Account;
  amount: number;
  createdAt?: Date;
}

const transactionPropsSchema = Joi.object({
  account: Joi.object().required(),
  amount: Joi.number().required(),
  createdAt: Joi.date(),
});

export class Transaction extends Entity<TransactionProps> {
  readonly amount: number;
  readonly account: Account;
  readonly createdAt: Date;

  constructor(props: TransactionProps, id?: string) {
    super(transactionPropsSchema, props, id);

    this.amount = props.amount;
    this.account = props.account;
    this.createdAt = props.createdAt || new Date();
  }
}
