import Joi from "joi";
import { Entity } from "./Entity";

interface AccountProps {
  balance: number;
}

const accountPropsSchema = Joi.object({
  balance: Joi.number().required().min(0).strict(true)
});

export class Account extends Entity<AccountProps> {
  readonly balance: number;

  constructor(props: AccountProps, id?: string) {
    super(accountPropsSchema, props, id);

    const { balance } = this.validationResult.value as AccountProps;

    this.balance = balance;
  }
}