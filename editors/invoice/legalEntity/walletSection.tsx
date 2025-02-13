import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { EditLegalEntityWalletInput } from "./legalEntity";
import { TextInput, FieldLabel } from "./common";

export type LegalEntityWalletSectionProps = Omit<
  ComponentProps<"div">,
  "children" | "onChange"
> & {
  readonly value: EditLegalEntityWalletInput;
  readonly onChange: (value: EditLegalEntityWalletInput) => void;
  readonly disabled?: boolean;
};

export const LegalEntityWalletSection = (
  props: LegalEntityWalletSectionProps,
) => {
  const { value, onChange, disabled, ...divProps } = props;

  const handleInputChange = (
    field: keyof EditLegalEntityWalletInput,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({
      ...value,
      [field]: event.target.value,
    });
  };

  const CHAIN_PRESETS = [
    {
      chainName: "base",
      chainId: "8453",
    },
  ];

  return (
    <div
      {...divProps}
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white p-6",
        props.className,
      )}
    >
      <div className="grid grid-cols-2 gap-4 items-center">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Wallet Information
        </h3>

        <select
          className={
            "px-4 py-2 rounded-full font-semibold text-sm bg-gray-200 text-gray-800"
          }
          onBlur={(e) => {
            const preset = CHAIN_PRESETS.find(
              (p) => p.chainName == e.target.value,
            );
            if (preset) {
              onChange({
                ["chainId"]: preset.chainId,
                ["chainName"]: preset.chainName,
              });
            }
          }}
        >
          {CHAIN_PRESETS.map((preset) => (
            <option key={preset.chainId} value={preset.chainName}>
              {preset.chainName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FieldLabel>Chain Name</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={(e) => handleInputChange("chainName", e)}
                placeholder="Chain Name"
                value={value.chainName ?? ""}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel>Chain ID</FieldLabel>
              <TextInput
                disabled={disabled}
                onChange={(e) => handleInputChange("chainId", e)}
                placeholder="Chain ID"
                value={value.chainId ?? ""}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <FieldLabel>Wallet Address</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={(e) => handleInputChange("address", e)}
            placeholder="0x..."
            value={value.address ?? ""}
          />
        </div>
      </div>
    </div>
  );
};
