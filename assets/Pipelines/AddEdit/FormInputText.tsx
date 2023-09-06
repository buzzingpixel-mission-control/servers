import React, { Dispatch, SetStateAction } from 'react';

const FormInputText = (
    {
        name,
        value = '',
        setValue,
        placeholder,
        useMaxWidth,
    }: {
        name: string;
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
        placeholder?: string;
        useMaxWidth?: boolean;
    },
) => (
    <div className={useMaxWidth ? 'max-w-md' : ''}>
        <input
            type="text"
            id={name}
            placeholder={placeholder || ''}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
            value={value}
            onChange={(e) => { setValue(e.currentTarget.value); }}
        />
    </div>
);

FormInputText.defaultProps = {
    value: '',
    placeholder: '',
    useMaxWidth: true,
};

export default FormInputText;
