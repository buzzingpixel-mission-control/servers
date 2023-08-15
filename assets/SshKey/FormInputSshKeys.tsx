import Select from 'react-select';
import EditorParams from 'buzzingpixel-mission-control-frontend-core/assets/Forms/EditorParams';
import React, { useState } from 'react';
import { useSshKeyData } from './SshKeyData';

type Option = {
    value: string;
    label: string;
};

type Options = Array<Option>;

const FormInputSshKeys = (
    {
        input,
    }: EditorParams,
) => {
    const initialValue = input.initialValue || '';

    const [value, setValue] = useState<string>(initialValue);

    const { status, data } = useSshKeyData();

    const options = [] as Options;

    if (status === 'success') {
        data.forEach((sshKey) => {
            options.push({
                value: sshKey.id,
                label: sshKey.title,
            });
        });
    }

    return (
        <>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {input.title}
                {(() => {
                    if (!input.instructions) {
                        return null;
                    }

                    return (
                        <span className="block text-gray-400 text-xs -mt-0.5">
                            {input.instructions}
                        </span>
                    );
                })()}
            </label>
            <div className="mt-1">
                {(() => {
                    if (status === 'loading') {
                        return (
                            <div
                                className="inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] opacity-100 text-cyan-600"
                                role="status"
                            >
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >
                                    Loading...
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Select
                            onChange={(selected) => {
                                setValue(selected?.value || null);

                                if (!input.setValue) {
                                    return;
                                }

                                input.setValue(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    input.name,
                                    selected?.value || '',
                                );
                            }}
                            value={options.filter((option) => option.value === value)}
                            options={options}
                            className="react-select-control"
                            isClearable
                        />
                    );
                })()}
            </div>
        </>
    );
};

export default FormInputSshKeys;
