import React, { Dispatch, SetStateAction } from 'react';
import 'ace-builds/src-noconflict/mode-nix';
import 'ace-builds/src-noconflict/theme-github';
declare const FormInputText: {
    ({ name, value, setValue, }: {
        name: string;
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
    }): React.JSX.Element;
    defaultProps: {
        value: string;
    };
};
export default FormInputText;
