import React from 'react';

const SubmitButton = (
    {
        isSaving,
    }: {
        isSaving: boolean;
    },
) => {
    let buttonBgClass = 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500';

    let spinnerSavingClass = 'opacity-0';

    if (isSaving) {
        buttonBgClass = 'bg-gray-600 focus:ring-gray-500';

        spinnerSavingClass = 'opacity-100';
    }

    return (
        <button
            type="submit"
            className={`w-full my-1.5 sm:my-0 sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${buttonBgClass}`}
        >
            <div
                className={`inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerSavingClass}`}
                style={{ marginTop: '0.25rem' }}
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
            <span className="ml-1 inline-block align-middle">
                Submit
            </span>
            <div
                className="inline-block align-middle h-3 w-3"
                style={{ marginTop: '0.25rem' }}
                role="status"
            />
        </button>
    );
};

export default SubmitButton;
