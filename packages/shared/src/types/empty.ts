import * as z from "zod";

export const EmptyRequestSchema = z.any();
export const EmptyResponseSchema = z.any();

type EmptyRequest = void;
export type EmptyParams = EmptyRequest;
export type EmptyQuery = EmptyRequest;
export type EmptyBody = EmptyRequest;

export type EmptyResponse = void;