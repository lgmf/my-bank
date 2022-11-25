import { ValidationException } from "@core/exceptions/ValidationException";
import Joi from "joi";
import { Account } from "./Account";
import { Entity } from "./Entity";

interface TransactionProps {
  account: Account;
  amount: number;
}

const transactionPropsSchema = Joi.object({
  account: Joi.object().required(),
  amount: Joi.number().required()
});

export class Transaction extends Entity<TransactionProps> {
  readonly amount: number;
  readonly account: Account;

  constructor(props: TransactionProps, id?: string) {
    super(transactionPropsSchema, props, id);

    this.amount = props.amount;
    this.account = props.account;
  }
}
