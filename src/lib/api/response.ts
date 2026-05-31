import { NextResponse } from "next/server";

export interface ApiResponseEnvelope<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

function jsonResponse<T>(body: ApiResponseEnvelope<T>, status: number) {
  return NextResponse.json(body, { status });
}

export function successResponse<T>(data: T, message = "Request completed successfully.") {
  return jsonResponse({ success: true, message, data }, 200);
}

export function createdResponse<T>(data: T, message = "Resource created successfully.") {
  return jsonResponse({ success: true, message, data }, 201);
}

export function validationErrorResponse(errors: unknown, message = "Please check the highlighted fields.") {
  return jsonResponse({ success: false, message, errors }, 400);
}

export function badRequestResponse(message = "Bad request.", errors?: unknown) {
  return jsonResponse({ success: false, message, errors }, 400);
}

export function notFoundResponse(message = "Resource was not found.") {
  return jsonResponse({ success: false, message }, 404);
}

export function serverErrorResponse(message = "Something went wrong.") {
  return jsonResponse({ success: false, message }, 500);
}
