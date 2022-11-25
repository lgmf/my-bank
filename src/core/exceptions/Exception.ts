export type ExceptionTypes = "validation" | "http" | "unknown";

export class Exception extends Error {
  constructor(public message: string, public readonly type: ExceptionTypes) {
    super(message);
  }
}
