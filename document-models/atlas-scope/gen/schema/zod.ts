import { z } from "zod";
import {
  AtlasScopeState,
  GlobalTag,
  PopulateScopeInput,
  Status,
  UpdateScopeInput,
} from "./types";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const GlobalTagSchema = z.enum([
  "ANON_WORKFORCE",
  "AVC",
  "CAIS",
  "DAO_TOOLKIT",
  "ECOSYSTEM_INTELLIGENCE",
  "EXTERNAL_REFERENCE",
  "FACILITATORDAO",
  "INTERNAL_REFERENCE",
  "LEGACY_TERM__USE_APPROVED",
  "ML__DEFER",
  "ML__HIGH_PRIORITY",
  "ML__LOW_PRIORITY",
  "ML__SUPPORT_DOCS_NEEDED",
  "ML___MED_PRIORITY",
  "NEWCHAIN",
  "P0_HUB_ENTRY_NEEDED",
  "PURPOSE_SYSTEM",
  "RECURSIVE_IMPROVEMENT",
  "SCOPE_ADVISOR",
  "SUBDAO_INCUBATION",
  "SUBDAO_REWARDS",
  "TWO_STAGE_BRIDGE",
  "V1__MIP",
]);

export const StatusSchema = z.enum([
  "APPROVED",
  "ARCHIVED",
  "DEFERRED",
  "PLACEHOLDER",
  "PROVISIONAL",
]);

export function AtlasScopeStateSchema(): z.ZodObject<
  Properties<AtlasScopeState>
> {
  return z.object({
    __typename: z.literal("AtlasScopeState").optional(),
    content: z.string().nullable(),
    docNo: z.string().nullable(),
    globalTags: z.array(GlobalTagSchema),
    masterStatus: StatusSchema.nullable(),
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(z.string()),
    provenance: z.string().url().nullable(),
  });
}

export function PopulateScopeInputSchema(): z.ZodObject<
  Properties<PopulateScopeInput>
> {
  return z.object({
    content: z.string().nullish(),
    docNo: z.string().nullish(),
    globalTags: z.array(GlobalTagSchema).nullish(),
    masterStatus: StatusSchema.nullish(),
    name: z.string().nullish(),
    notionId: z.string().nullish(),
    originalContextData: z.array(z.string()).nullish(),
    provenance: z.string().url().nullish(),
  });
}

export function UpdateScopeInputSchema(): z.ZodObject<
  Properties<UpdateScopeInput>
> {
  return z.object({
    globalTags: z.array(GlobalTagSchema).nullish(),
    masterStatus: StatusSchema.nullish(),
  });
}
