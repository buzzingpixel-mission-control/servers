import React, { Dispatch, SetStateAction } from 'react';
declare const FormInputProjects: {
    ({ value, setValue, }: {
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
    }): React.JSX.Element;
    defaultProps: {
        value: string;
    };
};
export default FormInputProjects;
