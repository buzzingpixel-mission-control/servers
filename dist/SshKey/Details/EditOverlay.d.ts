import React, { Dispatch, SetStateAction } from 'react';
import { SshKey } from '../SshKeys';
declare const EditOverlay: ({ item, setIsOpen, }: {
    item: SshKey;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default EditOverlay;
