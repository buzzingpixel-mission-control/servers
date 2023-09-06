import React, { Dispatch, SetStateAction } from 'react';
declare const ErrorModal: ({ isOpen, setIsOpen, message, }: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    message: string;
}) => React.JSX.Element;
export default ErrorModal;
