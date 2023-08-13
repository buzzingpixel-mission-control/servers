import React from 'react';
import { SshKeysWithViewOptions } from './SshKeys';
declare const SshKeyList: ({ isArchive, items, }: {
    isArchive: boolean;
    items: SshKeysWithViewOptions;
}) => React.JSX.Element;
export default SshKeyList;
