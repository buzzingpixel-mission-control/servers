import React from 'react';
import { SshKeyWithViewOptions } from './SshKeys';
declare const SshKeyListItem: {
    ({ isArchive, item, selectedItemsManager, }: {
        isArchive: boolean;
        item: SshKeyWithViewOptions;
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
export default SshKeyListItem;
