import { ValidationException } from "@core/exceptions/ValidationException";
import Joi from "joi";

const searchPropsSchema = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(0).max(25).default(10),
  query: Joi.string().min(3)
})

interface SearchProps {
  offset?: number;
  limit?: number;
  query?: string;
}

export class Search {
  readonly offset: number;
  readonly limit: number;
  readonly query?: string;

  constructor(props: SearchProps) {
    const result = searchPropsSchema.validate(props);

    if (result.error) {
      throw new ValidationException(result.error.message);
    }

    const { limit, offset, query } = result.value as SearchProps;

    this.offset = offset ?? 0;
    this.limit = limit ?? 10;
    this.query = query;
  }
}