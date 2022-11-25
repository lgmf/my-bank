import Joi from "joi";

import { Account } from "./Account";
import { Entity } from "./Entity";

interface UserProps {
  username: string;
  password: string;
  account: Account;
}

const userPropsSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
  account: Joi.object()
});

export class User extends Entity<UserProps> {
  readonly username: string;
  
  readonly password: string;

  readonly account: Account;

  constructor(props: UserProps, id?: string) {
    super(userPropsSchema, props, id);

    this.username = props.username;
    this.password = props.password;
    this.account = props.account;
  }
}
