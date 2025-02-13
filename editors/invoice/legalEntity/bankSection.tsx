import {
  ChangeEvent,
  ComponentProps,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { EditLegalEntityBankInput } from "./legalEntity";

const FieldLabel = ({ children }: { readonly children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);

const TextInput = (props: ComponentProps<"input">) => (
  <input
    {...props}
    className={twMerge(
      "h-10 w-full rounded-md border border-gray-200 bg-white px-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:p-0",
      props.className,
    )}
    type="text"
  />
);

const ACCOUNT_TYPES = ["CHECKING", "SAVINGS", "TRUST"] as const;

const AccountTypeSelect = (props: ComponentProps<"select">) => (
  <select
    {...props}
    className={twMerge(
      "h-10 w-full rounded-md border border-gray-200 bg-white px-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:p-0",
      props.className,
    )}
  >
    <option value="">Select Account Type</option>
    {ACCOUNT_TYPES.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
);

interface BankDetailsSectionProps {
  value: EditLegalEntityBankInput;
  onChange: (field: keyof EditLegalEntityBankInput, value: string) => void;
  disabled?: boolean;
  prefix?: string;
  title?: string;
  className?: string;
}

const BankDetailsSection = ({
  value,
  onChange,
  disabled,
  prefix = "",
  title = "Banking Information",
  className,
}: BankDetailsSectionProps) => {
  const getFieldName = (field: string): keyof EditLegalEntityBankInput =>
    prefix
      ? (`${field}${prefix}` as keyof EditLegalEntityBankInput)
      : (field as keyof EditLegalEntityBankInput);

  const getValue = (field: string) => value[getFieldName(field)] ?? "";

  const getBICValue = () => {
    const bicField = getFieldName("BIC");
    const abaField = getFieldName("ABA");
    const swiftField = getFieldName("SWIFT");
    return (value[bicField] || value[abaField] || value[swiftField]) ?? "";
  };

  return (
    <div className={twMerge("space-y-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <FieldLabel>Account Number</FieldLabel>
            <TextInput
              disabled={disabled}
              onChange={(e) =>
                onChange(getFieldName("accountNum"), e.target.value)
              }
              placeholder="Account Number"
              value={getValue("accountNum")}
            />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FieldLabel>Account Details</FieldLabel>
                <AccountTypeSelect
                  disabled={disabled}
                  onChange={(e) =>
                    onChange(getFieldName("accountType"), e.target.value)
                  }
                  value={getValue("accountType")}
                />
              </div>
              <div className="space-y-2">
                <FieldLabel>ABA/BIC/SWIFT No.</FieldLabel>
                <TextInput
                  disabled={disabled}
                  onChange={(e) =>
                    onChange(getFieldName("BIC"), e.target.value)
                  }
                  placeholder="ABA/BIC/SWIFT No."
                  value={getBICValue()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <FieldLabel>Beneficiary Information</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={(e) =>
              onChange(getFieldName("beneficiary"), e.target.value)
            }
            placeholder="Beneficiary Name"
            value={getValue("beneficiary")}
          />
        </div>

        <div className="space-y-4">
          <FieldLabel>Bank Details</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={(e) => onChange(getFieldName("name"), e.target.value)}
            placeholder="Bank Name"
            value={getValue("name")}
          />
        </div>

        <div className="space-y-4">
          <FieldLabel>Bank Address</FieldLabel>
          <div
            className={twMerge(
              "space-y-4 rounded-lg p-4",
              prefix ? "bg-gray-100" : "bg-gray-50",
            )}
          >
            <TextInput
              disabled={disabled}
              onChange={(e) =>
                onChange(getFieldName("streetAddress"), e.target.value)
              }
              placeholder="Street Address"
              value={getValue("streetAddress")}
            />
            <TextInput
              disabled={disabled}
              onChange={(e) =>
                onChange(getFieldName("extendedAddress"), e.target.value)
              }
              placeholder="Extended Address"
              value={getValue("extendedAddress")}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                disabled={disabled}
                onChange={(e) => onChange(getFieldName("city"), e.target.value)}
                placeholder="City"
                value={getValue("city")}
              />
              <TextInput
                disabled={disabled}
                onChange={(e) =>
                  onChange(getFieldName("stateProvince"), e.target.value)
                }
                placeholder="State/Province"
                value={getValue("stateProvince")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                disabled={disabled}
                onChange={(e) =>
                  onChange(getFieldName("postalCode"), e.target.value)
                }
                placeholder="Postal Code"
                value={getValue("postalCode")}
              />
              <TextInput
                disabled={disabled}
                onChange={(e) =>
                  onChange(getFieldName("country"), e.target.value)
                }
                placeholder="Country"
                value={getValue("country")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel>Memo</FieldLabel>
          <TextInput
            disabled={disabled}
            onChange={(e) => onChange(getFieldName("memo"), e.target.value)}
            placeholder="Memo"
            value={getValue("memo")}
          />
        </div>
      </div>
    </div>
  );
};

interface LegalEntityBankSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  readonly value: EditLegalEntityBankInput;
  readonly onChange: (value: EditLegalEntityBankInput) => void;
  readonly disabled?: boolean;
}

export const LegalEntityBankSection = ({
  value,
  onChange,
  disabled,
  ...divProps
}: LegalEntityBankSectionProps) => {
  const [showIntermediary, setShowIntermediary] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof EditLegalEntityBankInput, newValue: string) => {
      onChange({
        ...value,
        [field]: newValue,
      });
    },
    [onChange, value],
  );

  const handleIntermediaryToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setShowIntermediary(event.target.checked);
    },
    [],
  );

  return (
    <div
      {...divProps}
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white p-6",
        divProps.className,
      )}
    >
      <BankDetailsSection
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div className="border-t border-gray-200 pt-4">
        <label className="flex items-center space-x-2">
          <input
            checked={showIntermediary}
            className="size-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            id="showIntermediary"
            onChange={handleIntermediaryToggle}
            type="checkbox"
          />
          <span className="text-sm font-medium text-gray-700">
            Include Intermediary Bank
          </span>
        </label>
      </div>

      {showIntermediary && (
        <BankDetailsSection
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          prefix="Intermediary"
          title="Intermediary Bank Details"
          className="mt-4 bg-blue-50 rounded-lg border border-blue-100 p-6"
        />
      )}
    </div>
  );
};

export default LegalEntityBankSection;
