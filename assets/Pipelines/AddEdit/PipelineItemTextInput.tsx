import React, { Dispatch, SetStateAction } from 'react';
import FormInputText from './FormInputText';

const PipelineItemTextInput = (
    {
        label,
        name,
        value = '',
        setValue,
        placeholder,
    }: {
        label: string;
        name: string;
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
        placeholder?: string;
    },
) => (
    <div>
        <label
            htmlFor={name}
            className="text-sm font-medium text-gray-900"
        >
            {label}
        </label>
        <div>
            <FormInputText
                useMaxWidth={false}
                name={name}
                value={value}
                setValue={setValue}
                placeholder={placeholder}
            />
        </div>
    </div>
);

PipelineItemTextInput.defaultProps = {
    value: '',
    placeholder: '',
};

export default PipelineItemTextInput;
