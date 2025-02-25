import { z } from "zod";
import {
  AtlasFoundationState,
  FAtlasType,
  FGlobalTag,
  FStatus,
  PopulateFoundationInput,
  UpdateFoundationInput,
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

export const FAtlasTypeSchema = z.enum([
  "ACTIVE_DATA_CONTROLLER",
  "ARTICLE",
  "CORE",
  "SECTION",
]);

export const FGlobalTagSchema = z.enum([
  "AVC",
  "AVC_",
  "CAIS",
  "CAIS_",
  "DAO_TOOLKIT",
  "DAO_TOOLKIT_",
  "ECOSYSTEM_INTELLIGENCE",
  "ECOSYSTEM_INTELLIGENCE_",
  "EXTERNAL_REFERENCE",
  "EXTERNAL_REFERENCE_",
  "LEGACY_TERM_USE_APPROVED",
  "LEGACY_TERM_USE_APPROVED_",
  "ML_DEFER",
  "ML_DEFER_",
  "ML_LOW_PRIORITY",
  "ML_LOW_PRIORITY_",
  "ML_SUPPORT_DOCS_NEEDED",
  "ML_SUPPORT_DOCS_NEEDED_",
  "NEWCHAIN",
  "NEWCHAIN_",
  "PURPOSE_SYSTEM",
  "PURPOSE_SYSTEM_",
  "RECURSIVE_IMPROVEMENT",
  "RECURSIVE_IMPROVEMENT_",
  "SCOPE_ADVISOR",
  "SCOPE_ADVISOR_",
  "TWO_STAGE_BRIDGE",
  "TWO_STAGE_BRIDGE_",
]);

export const FStatusSchema = z.enum([
  "APPROVED",
  "ARCHIVED",
  "DEFERRED",
  "PLACEHOLDER",
  "PROVISIONAL",
]);

export function AtlasFoundationStateSchema(): z.ZodObject<
  Properties<AtlasFoundationState>
> {
  return z.object({
    __typename: z.literal("AtlasFoundationState").optional(),
    atlasType: FAtlasTypeSchema,
    content: z.string().nullable(),
    docNo: z.string().nullable(),
    globalTags: z.array(FGlobalTagSchema),
    masterStatus: FStatusSchema,
    name: z.string().nullable(),
    notionId: z.string().nullable(),
    originalContextData: z.array(z.string()),
    parent: z.string(),
    provenance: z.string().url().nullable(),
    references: z.array(z.string()),
  });
}

export function PopulateFoundationInputSchema(): z.ZodObject<
  Properties<PopulateFoundationInput>
> {
  return z.object({
    atlasType: FAtlasTypeSchema,
    content: z.string().nullish(),
    docNo: z.string().nullish(),
    globalTags: z.array(FGlobalTagSchema).nullish(),
    masterStatus: FStatusSchema,
    name: z.string().nullish(),
    notionId: z.string().nullish(),
    originalContextData: z.array(z.string()).nullish(),
    parent: z.string(),
    provenance: z.string().url().nullish(),
    references: z.array(z.string()).nullish(),
  });
}

export function UpdateFoundationInputSchema(): z.ZodObject<
  Properties<UpdateFoundationInput>
> {
  return z.object({
    atlasType: FAtlasTypeSchema,
    content: z.string().nullish(),
    globalTags: z.array(FGlobalTagSchema).nullish(),
    masterStatus: FStatusSchema.nullish(),
    name: z.string().nullish(),
    references: z.array(z.string()).nullish(),
  });
}
