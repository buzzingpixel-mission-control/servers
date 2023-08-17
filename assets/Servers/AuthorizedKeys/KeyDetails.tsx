import React from 'react';

const KeyDetails = (
    {
        index,
        keyString,
    }: {
        index: number;
        keyString: string;
    },
) => {
    console.log('here');

    return (
        <div
            className="px-4 py-6"
        >
            <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                <textarea
                    rows={8}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    readOnly
                    defaultValue={keyString}
                />
                <div className="mt-2 text-right">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KeyDetails;
