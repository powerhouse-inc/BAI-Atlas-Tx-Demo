import { z } from "zod";
import {
  DeleteGnosisWalletInput,
  GnosisSafe,
  IWallet,
  IntegrationSettingsState,
  RequestFinance,
  UpdateGnosisSafeInput,
  UpdateRequestFinanceInput,
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

export function DeleteGnosisWalletInputSchema(): z.ZodObject<
  Properties<DeleteGnosisWalletInput>
> {
  return z.object({
    address: z.string().nullish(),
  });
}

export function GnosisSafeSchema(): z.ZodObject<Properties<GnosisSafe>> {
  return z.object({
    __typename: z.literal("GnosisSafe").optional(),
    wallets: z.array(IWalletSchema().nullable()).nullable(),
  });
}

export function IWalletSchema(): z.ZodObject<Properties<IWallet>> {
  return z.object({
    __typename: z.literal("IWallet").optional(),
    address: z.string().nullable(),
    name: z.string().nullable(),
    privateKey: z.string().nullable(),
  });
}

export function IntegrationSettingsStateSchema(): z.ZodObject<
  Properties<IntegrationSettingsState>
> {
  return z.object({
    __typename: z.literal("IntegrationSettingsState").optional(),
    gnosisSafe: GnosisSafeSchema().nullable(),
    requestFinance: RequestFinanceSchema().nullable(),
  });
}

export function RequestFinanceSchema(): z.ZodObject<
  Properties<RequestFinance>
> {
  return z.object({
    __typename: z.literal("RequestFinance").optional(),
    accountEmail: z.string().email().nullable(),
    appId: z.string().nullable(),
    appSecret: z.string().nullable(),
  });
}

export function UpdateGnosisSafeInputSchema(): z.ZodObject<
  Properties<UpdateGnosisSafeInput>
> {
  return z.object({
    address: z.string().nullish(),
    name: z.string().nullish(),
    privateKey: z.string().nullish(),
  });
}

export function UpdateRequestFinanceInputSchema(): z.ZodObject<
  Properties<UpdateRequestFinanceInput>
> {
  return z.object({
    accountEmail: z.string().email().nullish(),
    appId: z.string().nullish(),
    appSecret: z.string().nullish(),
  });
}
