import React, { Dispatch, SetStateAction } from 'react';
declare const PipelineItemTextInput: {
    ({ label, name, value, setValue, placeholder, }: {
        label: string;
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
export default PipelineItemTextInput;
