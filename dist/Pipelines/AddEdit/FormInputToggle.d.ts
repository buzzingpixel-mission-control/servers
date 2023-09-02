import React, { Dispatch, SetStateAction } from 'react';
declare const FormInputToggle: {
    ({ name, value, setValue, }: {
        name: string;
        value?: boolean;
        setValue: Dispatch<SetStateAction<boolean>>;
    }): React.JSX.Element;
    defaultProps: {
        value: boolean;
    };
};
export default FormInputToggle;
