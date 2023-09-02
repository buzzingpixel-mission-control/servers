import React, { Dispatch, SetStateAction } from 'react';
declare const FormInputText: {
    ({ name, value, setValue, placeholder, }: {
        name: string;
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
        placeholder?: string;
    }): React.JSX.Element;
    defaultProps: {
        value: string;
        placeholder: string;
    };
};
export default FormInputText;
