import { Result, ValidationError } from "express-validator";

export function formatResponse(
  data: any,
  message?: string,
  errors?: Result<ValidationError>,
) {
  return {
    message,
    data: { ...data },
    errors: [...(errors?.array() || [])],
  };
}
