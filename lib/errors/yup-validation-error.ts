import { ValidationError } from "yup";
import { CustomError } from "./custom-error";

export class YupValidationError extends CustomError {
  statusCode = 400;

  constructor(public error: ValidationError) {
    super("");

    Object.setPrototypeOf(this, YupValidationError.prototype);
  }

  serializeErrors() {
    return this.error?.inner?.map((err) => {
      return { message: err.message, field: err.path };
    });
  }
}
