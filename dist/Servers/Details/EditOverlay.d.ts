import React, { Dispatch, SetStateAction } from 'react';
import { Server } from '../Servers';
declare const EditOverlay: ({ item, setIsOpen, }: {
    item: Server;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default EditOverlay;
