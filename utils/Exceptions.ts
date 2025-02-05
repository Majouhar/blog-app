export class GlobalError extends Error {
  constructor(public statusCode: StatusCode, public message: string) {
    super(message);
    this.name = "GlobalError";
    this.statusCode = statusCode;
  }
}
