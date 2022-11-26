import Joi from "joi";
import crypto from "crypto";

import { Account } from "./Account";
import { Entity } from "./Entity";

interface UserProps {
  username: string;
  password: string;
  account: Account;
  name: string;
}

const userPropsSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
  account: Joi.object(),
  name: Joi.string().required().min(4).max(240)
});

export class User extends Entity<UserProps> {
  readonly username: string;

  readonly password: string;

  readonly account: Account;

  readonly name: string;

  readonly salt: string;

  constructor(props: UserProps, id?: string, salt?: string) {
    super(userPropsSchema, props, id);

    const isNew = !id;

    this.username = props.username;
    this.account = props.account;
    this.name = props.name;
    this.salt = salt || crypto.randomBytes(16).toString("hex");
    this.password = isNew ? this.encryptPassword(props.password) : props.password;
  }

  private encryptPassword(password: string) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  }

  public verifyPassword(password: string) {
    const hash = this.encryptPassword(password);
    return this.password === hash;
  }
}
