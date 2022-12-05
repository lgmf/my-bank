import Joi from "joi";

import { Entity } from "./Entity";
import { User } from "./User";

export type TransactionType = "deposit" | "withdraw" | "transfer";

interface TransactionProps {
  amount: number;
  sender: Omit<User, "account" | "verifyPassword">;
  recipient: Omit<User, "account" | "verifyPassword">;
  createdAt?: Date;
}

const transactionPropsSchema = Joi.object({
  amount: Joi.number().required(),
  sender: Joi.object().required(),
  recipient: Joi.object().required(),
  createdAt: Joi.date(),
});

export class Transaction extends Entity<TransactionProps> {
  readonly amount: number;
  readonly sender: Omit<User, "account" | "verifyPassword">;
  readonly recipient: Omit<User, "account" | "verifyPassword">;
  readonly createdAt: Date;

  constructor(props: TransactionProps, id?: string) {
    super(transactionPropsSchema, props, id);

    this.amount = props.amount;
    this.sender = props.sender;
    this.recipient = props.recipient;
    this.createdAt = props.createdAt || new Date();
  }

  get type(): TransactionType {
    if (this.sender.id !== this.recipient.id) {
      return "transfer";
    }

    if (this.amount < 0) {
      return "withdraw";
    }

    return "deposit";
  }
}
