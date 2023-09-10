import React, { Dispatch, SetStateAction } from 'react';
declare const ShowLastErrorButton: ({ errorMessage, setErrorMessageIsOpen, }: {
    errorMessage: string;
    setErrorMessageIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default ShowLastErrorButton;
