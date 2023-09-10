import React, { Dispatch, SetStateAction } from 'react';

const ShowLastErrorButton = (
    {
        errorMessage,
        setErrorMessageIsOpen,
    }: {
        errorMessage: string;
        setErrorMessageIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    if (!errorMessage) {
        return null;
    }

    return (
        <span
            className="w-full my-1.5 sm:my-0 sm:w-auto cursor-pointer inline-flex justify-center rounded-md border border-slate-200 px-4 py-2 text-base font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm bg-white hover:bg-slate-100 focus:ring-cyan-500 mr-2"
            onClick={() => {
                setErrorMessageIsOpen(true);
            }}
        >
            <span className="ml-1 inline-block align-middle">
                Show Last Error
            </span>
        </span>
    );
};

export default ShowLastErrorButton;
