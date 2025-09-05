import * as z from "zod";

export const EmptyParams = z.unknown();
export const EmptyQuery = z.unknown();
export const EmptyBody = z.unknown();

export const EmptyData = z.unknown();

export const EmptyRequestSchema = {
  params: EmptyParams,
  query: EmptyQuery,
  body: EmptyBody
}

export const EmptyResponseSchema = z.unknown();