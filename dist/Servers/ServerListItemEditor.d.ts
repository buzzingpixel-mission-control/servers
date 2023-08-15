import React, { Dispatch, SetStateAction } from 'react';
import { Server } from './Servers';
declare const ServerListItemEditor: ({ item, setEditorIsOpen, }: {
    item: Server;
    setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default ServerListItemEditor;
