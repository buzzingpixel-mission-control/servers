import React, { Dispatch, SetStateAction } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-nix';
import 'ace-builds/src-noconflict/theme-github';

const FormInputText = (
    {
        name,
        value = '',
        setValue,
    }: {
        name: string;
        value?: string;
        setValue: Dispatch<SetStateAction<string>>;
    },
) => (
    <>
        <div className="w-full rounded-md border border-gray-300 shadow-sm overflow-hidden">
            <AceEditor
                width="100%"
                minLines={4}
                maxLines={Infinity}
                highlightActiveLine={false}
                wrapEnabled
                mode="nix"
                theme="github"
                name={name}
                value={value}
                onChange={(val) => { setValue(val); }}
            />
        </div>
    </>
);

FormInputText.defaultProps = {
    value: '',
};

export default FormInputText;
