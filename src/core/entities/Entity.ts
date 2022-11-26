import crypto from "crypto";
import Joi from "joi";

import { ValidationException } from "../exceptions/ValidationException";

export class Entity<P> {
  readonly id: string;
  protected readonly validationResult: Joi.ValidationResult;

  constructor(propsSchema: Joi.ObjectSchema, props: P, id?: string) {
    const validationResult = propsSchema.validate(props);

    if (validationResult.error) {
      throw new ValidationException(validationResult.error.message);
    }

    this.id = id ? id : crypto.randomUUID();
    this.validationResult = validationResult;
  }
}
