import { User } from "@core/entities/User";

export interface Authorizer {
  createToken(user: User): string;
  verifyToken<P>(token: string): P;
}
