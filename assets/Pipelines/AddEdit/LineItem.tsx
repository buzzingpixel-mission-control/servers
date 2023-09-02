import React from 'react';

const LineItem = (
    {
        label,
        labelFor,
        RenderInput,
    }: {
        label: string;
        labelFor: string;
        RenderInput: React.JSX.Element;
    },
) => (
    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">
            <label htmlFor={labelFor}>
                {label}
            </label>
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
            {RenderInput}
        </dd>
    </div>
);

export default LineItem;
