import jwt from "jsonwebtoken";

import environment from "@config/environment";

import { User } from "../entities/User";
import { Authorizer } from "./Authorizer";

const secret = environment.JWT_SECRET;

export interface JwtPayload {
  user: {
    id: string;
    username: string;
    account: {
      id: string;
    }
  }
}

export class JwtAuthorizer implements Authorizer {
  createToken(user: User) {
    const payload: JwtPayload = {
      user: {
        id: user.id,
        username: user.username,
        account: {
          id: user.account.id
        }
      }
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return token;
  }

  verifyToken<JwtPayload>(token: string) {
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload;
  }
}
