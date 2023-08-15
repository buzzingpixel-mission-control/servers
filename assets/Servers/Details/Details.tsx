import React from 'react';
import { ServerWithViewOptions } from '../Servers';
import SshCommand from './SshCommand';
import SshPort from './SshPort';
import Address from './Address';
import SshUserName from './SshUserName';
import SshKey from './SshKey';

const Details = (
    {
        data,
    }: {
        data: ServerWithViewOptions;
    },
) => (
    <div className="max-w-6xl">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Title
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                            {data.title}
                        </dd>
                    </div>
                    <SshUserName data={data} />
                    <Address data={data} />
                    <SshPort data={data} />
                    <SshCommand data={data} />
                    <SshKey data={data} />
                </dl>
            </div>
        </div>
    </div>
);

export default Details;
