export type EntityDefault = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export const ErrorStatusCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  UNAVAILABLE_SERVER: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

type ErrorStatusCode = (typeof ErrorStatusCode)[keyof typeof ErrorStatusCode];

export interface DomainErrorPayload {
  name: string;
  code: ErrorStatusCode;
  message: string;
  data?: Record<string, unknown>;
  stack?: string;
}

interface GenericErrorPayload {
  name: string;
  message: string;
  stack?: string;
}

interface UnknownErrorPayload {
  message: string;
}

export type ApiErrorPayload =
  DomainErrorPayload | GenericErrorPayload | UnknownErrorPayload;

export interface ApiError {
  message: string;
  code?: ErrorStatusCode;
  name?: string;
  data?: Record<string, unknown>;
  httpStatus?: number;
}
