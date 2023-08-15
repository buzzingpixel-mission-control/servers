import React from 'react';
import { ServersWithViewOptions } from './Servers';
declare const ServerList: ({ isArchive, items, }: {
    isArchive: boolean;
    items: ServersWithViewOptions;
}) => React.JSX.Element;
export default ServerList;
