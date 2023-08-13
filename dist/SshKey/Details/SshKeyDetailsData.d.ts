import { SshKeyWithViewOptions } from '../SshKeys';
export declare const useSshKeyDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: SshKeyWithViewOptions;
};
