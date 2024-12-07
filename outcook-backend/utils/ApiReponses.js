import { responses } from "../constants/ApiResponse.js";

class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  successful(message = "Successful", data = null) {
    return this.res.status(responses.successful.status).json({
      ...responses.successful.message,
      msg: message,
      data: data || null,
    });
  }

  badRequest(message ) {
    return this.res
      .status(responses.badRequest.status)
      .json(message || responses.badRequest.message);
  }

  unauthorized(message ) {
    return this.res
      .status(responses.unauthorized.status)
      .json(message || responses.unauthorized.message);
  }

  forbidden(message ) {
    return this.res
      .status(responses.forbidden.status)
      .json(message || responses.forbidden.message);
  }

  notFound(message) {
    return this.res
      .status(responses.notFound.status)
      .json(message || responses.notFound.message);
  }

  internalServerError(message ) {
    return this.res
      .status(responses.internalServerError.status)
      .json(message || responses.internalServerError.message);
  }

  customError(status, message) {
    return this.res.status(status).json({ msg: message });
  }
}

export default ApiResponse;
