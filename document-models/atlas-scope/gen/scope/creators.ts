import { utils } from "document-model/document";
import { z, UpdateScopeInput, PopulateScopeInput } from "../types";
import { UpdateScopeAction, PopulateScopeAction } from "./actions";

const { createAction } = utils;

export const updateScope = (input: UpdateScopeInput) =>
  createAction<UpdateScopeAction>(
    "UPDATE_SCOPE",
    { ...input },
    undefined,
    z.UpdateScopeInputSchema,
    "global",
  );

export const populateScope = (input: PopulateScopeInput) =>
  createAction<PopulateScopeAction>(
    "POPULATE_SCOPE",
    { ...input },
    undefined,
    z.PopulateScopeInputSchema,
    "global",
  );
