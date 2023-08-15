import React from 'react';
import { SshKeyWithViewOptions } from '../SshKeys';
import DetailsSshKeyDisplay from './DetailsSshKeyDisplay';

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
                    <DetailsSshKeyDisplay data={data} />
                </dl>
            </div>
        </div>
    </div>
);

export default Details;
