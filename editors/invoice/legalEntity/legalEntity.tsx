/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  EditIssuerBankInput,
  EditIssuerInput,
  EditIssuerWalletInput,
  EditPayerBankInput,
  EditPayerInput,
  EditPayerWalletInput,
  InputMaybe,
  LegalEntity,
  LegalEntityCorporateRegistrationId,
  LegalEntityTaxId,
} from "../../../document-models/invoice";
import {
  EditIssuerBankInputSchema,
  EditIssuerInputSchema,
  EditIssuerWalletInputSchema,
} from "../../../document-models/invoice/gen/schema/zod";

import React, { ComponentProps, useEffect, useState } from "react";
import { ComponentPropsWithRef, Ref } from "react";
import { twMerge } from "tailwind-merge";
import { LegalEntityWalletSection } from "./walletSection";
import LegalEntityBankSection from "./bankSection";

export type EditLegalEntityWalletInput =
  | EditIssuerWalletInput
  | EditPayerWalletInput;

export type EditLegalEntityBankInput = EditIssuerBankInput | EditPayerBankInput;
export type EditLegalEntityInput = EditIssuerInput | EditPayerInput;

function TextInput(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={twMerge(
        "h-10 w-full rounded-md border border-gray-200 bg-white px-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:p-0",
        props.className,
      )}
      type="text"
    />
  );
}

const FieldLabel = ({ children }: { readonly children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);

export type LegalEntityMainSectionProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  readonly value: EditLegalEntityInput;
  readonly onChange: (value: EditLegalEntityInput) => void;
  readonly disabled?: boolean;
};

export const LegalEntityMainSection = (props: LegalEntityMainSectionProps) => {
  const { value, onChange, disabled, ...divProps } = props;

  const normalizeId = (id: any) => {
    return typeof value.id === "string"
      ? id
      : ((id as any)?.taxId ?? (id as any)?.corpRegId ?? "");
  };

  const [taxId, setTaxId] = useState(normalizeId(value.id));

  useEffect(() => {
    setTaxId(normalizeId(value.id));
  }, [value]);

  const handleInputChange =
    (field: keyof EditLegalEntityInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        id: field === "id" ? e.target.value : value.id, // Ensure `id` remains a string
        [field]: e.target.value,
      });
    };

  return (
    <div
      {...divProps}
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white p-6",
        props.className,
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Basic Information
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <FieldLabel>Name</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={handleInputChange("name")}
            placeholder="Legal Entity Name"
            value={value.name ?? ""}
          />
        </div>

        <div className="space-y-2">
          <FieldLabel>Tax ID / Corp. Reg</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={(e) => setTaxId(e.target.value)}
            onBlur={(e) =>
              onChange({
                id: taxId,
              })
            }
            placeholder="123456789..."
            value={taxId}
          />
        </div>

        <div className="space-y-4">
          <FieldLabel>Address</FieldLabel>
          <div className="space-y-4">
            <TextInput
              disabled={disabled}
              onChange={handleInputChange("streetAddress")}
              placeholder="Street Address"
              value={value.streetAddress ?? ""}
            />
            <TextInput
              disabled={disabled}
              onChange={handleInputChange("extendedAddress")}
              placeholder="Extended Address"
              value={value.extendedAddress ?? ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FieldLabel>City</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={handleInputChange("city")}
                placeholder="City"
                value={value.city ?? ""}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel>State/Province</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={handleInputChange("stateProvince")}
                placeholder="State/Province"
                value={value.stateProvince ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FieldLabel>Postal Code</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={handleInputChange("postalCode")}
                placeholder="Postal Code"
                value={value.postalCode ?? ""}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel>Country</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={handleInputChange("country")}
                placeholder="Country"
                value={value.country ?? ""}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <FieldLabel>Email</FieldLabel>
            <TextInput
              disabled={disabled}
              onChange={handleInputChange("email")}
              placeholder="Email"
              type="email"
              value={value.email ?? ""}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Telephone</FieldLabel>
            <TextInput
              disabled={disabled}
              onChange={handleInputChange("tel")}
              placeholder="Telephone"
              type="tel"
              value={value.tel ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type LegalEntityFormProps = {
  readonly legalEntity: LegalEntity;
  readonly onChangeInfo?: (info: EditLegalEntityInput) => void;
  readonly onChangeBank?: (bank: EditLegalEntityBankInput) => void;
  readonly onChangeWallet?: (wallet: EditLegalEntityWalletInput) => void;
  readonly basicInfoDisabled?: boolean;
  readonly bankDisabled?: boolean;
  readonly walletDisabled?: boolean;
};

export function LegalEntityForm({
  legalEntity,
  onChangeInfo,
  onChangeBank,
  onChangeWallet,
  basicInfoDisabled,
  bankDisabled,
  walletDisabled,
}: LegalEntityFormProps) {
  const basicInfo = EditIssuerInputSchema().parse({
    ...legalEntity,
    ...legalEntity.address,
    ...legalEntity.contactInfo,
    id:
      (legalEntity.id as InputMaybe<LegalEntityTaxId>)?.taxId ??
      (legalEntity.id as InputMaybe<LegalEntityCorporateRegistrationId>)
        ?.corpRegId ??
      null,
  });

  const bankInfo: EditLegalEntityBankInput = EditIssuerBankInputSchema().parse({
    ...legalEntity.paymentRouting?.bank,
    ...legalEntity.paymentRouting?.bank?.address,
    ...legalEntity.paymentRouting?.bank?.intermediaryBank,
    ...legalEntity.paymentRouting?.bank?.intermediaryBank?.address,
  });

  const walletInfo: EditLegalEntityWalletInput =
    EditIssuerWalletInputSchema().parse({
      ...legalEntity.paymentRouting?.wallet,
    });

  return (
    <div className="space-y-8">
      {!basicInfoDisabled && !!onChangeInfo && (
        <LegalEntityMainSection onChange={onChangeInfo} value={basicInfo} />
      )}
      {!walletDisabled && !!onChangeWallet && (
        <LegalEntityWalletSection
          onChange={onChangeWallet}
          value={walletInfo}
        />
      )}
      {!bankDisabled && !!onChangeBank && (
        <LegalEntityBankSection onChange={onChangeBank} value={bankInfo} />
      )}
    </div>
  );
}
