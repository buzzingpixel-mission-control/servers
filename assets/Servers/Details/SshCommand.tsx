import React from 'react';
import { ServerWithViewOptions } from '../Servers';

const SshCommand = (
    {
        data,
    }: {
        data: ServerWithViewOptions;
    },
) => {
    if (!data.sshUserName || !data.address) {
        return null;
    }

    const cmd = [
        'ssh ',
        data.sshUserName,
        '@',
        data.address,
    ];

    if (data.sshPort !== null && data.sshPort > 0 && data.sshPort !== 22) {
        cmd.push(` -p ${data.sshPort}`);
    }

    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
                SSH Command
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    value={cmd.join('')}
                    readOnly
                />
            </dd>
        </div>
    );
};

export default SshCommand;
