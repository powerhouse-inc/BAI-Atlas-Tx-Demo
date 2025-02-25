import { utils } from "document-model/document";
import { z, UpdateFoundationInput, PopulateFoundationInput } from "../types";
import { UpdateFoundationAction, PopulateFoundationAction } from "./actions";

const { createAction } = utils;

export const updateFoundation = (input: UpdateFoundationInput) =>
  createAction<UpdateFoundationAction>(
    "UPDATE_FOUNDATION",
    { ...input },
    undefined,
    z.UpdateFoundationInputSchema,
    "global",
  );

export const populateFoundation = (input: PopulateFoundationInput) =>
  createAction<PopulateFoundationAction>(
    "POPULATE_FOUNDATION",
    { ...input },
    undefined,
    z.PopulateFoundationInputSchema,
    "global",
  );
