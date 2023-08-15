import React from 'react';
import { ServerWithViewOptions } from './Servers';
declare const ServerListItem: {
    ({ isArchive, item, projectPageSlug, selectedItemsManager, }: {
        isArchive: boolean;
        item: ServerWithViewOptions;
        projectPageSlug?: string | null | undefined;
        selectedItemsManager?: {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    }): React.JSX.Element;
    defaultProps: {
        projectPageSlug: any;
        selectedItemsManager: any;
    };
};
export default ServerListItem;
