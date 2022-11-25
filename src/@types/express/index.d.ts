import { JwtPayload } from "@core/authorizer/JwtAuthorizer";

// to make the file a module and avoid the TypeScript error
export { }

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload["user"];
    }
  }
}
