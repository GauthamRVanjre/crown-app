import React, { Dispatch, SetStateAction } from "react";
import CreatableSelect from "react-select/creatable";

export interface Option {
  label: string;
  value: string;
}

interface CreateableSelectDropdownProps {
  options: Option[];
  isLoading: boolean;
  value: Option | null | undefined;
  setValue: Dispatch<SetStateAction<Option | null | undefined>>;
  defaultValue?: Option | undefined;
  placeholder?: string;
}

const CreateableSelectDropdown: React.FC<CreateableSelectDropdownProps> = ({
  options,
  isLoading,
  value,
  setValue,
  defaultValue,
  placeholder,
}) => {
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#000",
    }),
    option: (
      styles: { [x: string]: any },
      { data, isDisabled, isFocused, isSelected }: any
    ) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#000" : isFocused ? "#000" : "#fff",
        color: isSelected ? "#fff" : isFocused ? "#fff" : "#000",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    singleValue: (styles: any) => ({
      ...styles,
      color: "#fff", // Color of the selected option in the input field
    }),
    input: (styles: any) => ({ ...styles, color: "#ccc" }),
    placeholder: (styles: any) => ({ ...styles, color: "#ccc" }),
  };

  return (
    <CreatableSelect
      styles={colourStyles}
      isDisabled={isLoading}
      placeholder={placeholder}
      isClearable
      onChange={(newValue) => setValue(newValue)}
      value={value}
      options={options}
      required
      // defaultInputValue={defaultValue}
      defaultValue={defaultValue}
    />
  );
};

export default CreateableSelectDropdown;
