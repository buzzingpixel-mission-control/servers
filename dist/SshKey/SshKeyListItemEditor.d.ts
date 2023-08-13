import React, { Dispatch, SetStateAction } from 'react';
import { SshKey } from './SshKeys';
declare const SshKeyListItemEditor: ({ item, setEditorIsOpen, }: {
    item: SshKey;
    setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default SshKeyListItemEditor;
