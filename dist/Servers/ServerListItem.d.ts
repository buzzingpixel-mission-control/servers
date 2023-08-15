import React from 'react';
import { ServerWithViewOptions } from './Servers';
declare const ServerListItem: {
    ({ isArchive, item, selectedItemsManager, }: {
        isArchive: boolean;
        item: ServerWithViewOptions;
        selectedItemsManager?: {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    }): React.JSX.Element;
    defaultProps: {
        selectedItemsManager: any;
    };
};
export default ServerListItem;
