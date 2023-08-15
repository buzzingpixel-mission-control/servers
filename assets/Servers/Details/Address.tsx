import React from 'react';
import { ServerWithViewOptions } from '../Servers';

const Address = (
    {
        data,
    }: {
        data: ServerWithViewOptions;
    },
) => {
    if (!data.address) {
        return null;
    }

    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
                Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-5 sm:mt-0">
                {data.address}
            </dd>
        </div>
    );
};

export default Address;
