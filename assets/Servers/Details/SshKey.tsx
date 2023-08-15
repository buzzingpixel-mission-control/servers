import React from 'react';
import { Link } from 'react-router-dom';
import { ServerWithViewOptions } from '../Servers';
import DetailsSshKeyDisplay from '../../SshKey/Details/DetailsSshKeyDisplay';

const SshKey = (
    {
        data,
    }: {
        data: ServerWithViewOptions;
    },
) => {
    if (!data.sshKey) {
        return null;
    }

    return (
        <>
            <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                    SSH Key
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                    <Link
                        to={data.sshKey.href}
                        className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                        {data.sshKey.title}
                    </Link>
                </dd>
            </div>
            <DetailsSshKeyDisplay data={data.sshKey} />
        </>
    );
};

export default SshKey;
