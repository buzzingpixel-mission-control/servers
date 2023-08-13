import React from 'react';
import { SshKeyWithViewOptions } from '../SshKeys';

const Details = (
    {
        data,
    }: {
        data: SshKeyWithViewOptions;
    },
) => (
    <div className="max-w-6xl">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Public Key
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                            <textarea
                                rows={8}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                readOnly
                            >
                                {data.public}
                            </textarea>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Private Key
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                            <textarea
                                rows={28}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                readOnly
                            >
                                {data.private}
                            </textarea>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
);

export default Details;
