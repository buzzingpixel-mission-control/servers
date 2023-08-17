import React from 'react';
import AddNewKeyButton from './AddNewKeyButton';

const PageHeader = (
    {
        slug,
        pageName,
    }: {
        slug: string;
        pageName: string;
    },
) => (
    <div className="mb-8">
        <div className="border-b border-gray-200 pb-4">
            <div className="md:flex md:items-center md:justify-between md:space-x-5">
                <div className="flex items-start space-x-5 overflow-hidden">
                    {/*
                      Use vertical padding to simulate center alignment when both lines of text are one line,
                      but preserve the same layout if the text wraps without making the image jump around.
                    */}
                    <div className="pt-1.5">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {pageName}
                        </h1>
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                    <AddNewKeyButton slug={slug} />
                </div>
            </div>
        </div>
    </div>
);

export default PageHeader;
