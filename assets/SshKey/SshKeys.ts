import { z } from 'zod';

export const SshKeySchema = z.object({
    id: z.string().min(1),
    isActive: z.boolean(),
    title: z.string().min(1),
    slug: z.string().min(1),
    public: z.string().min(1),
    private: z.string().min(1),
});

export type SshKey = z.infer<typeof SshKeySchema>;

export const SshKeysSchema = z.array(SshKeySchema);

export type SshKeys = z.infer<typeof SshKeysSchema>;

export type SshKeyWithViewOptions = SshKey & {
    href: string;
    activeOrArchivedText: string;
};

export type SshKeysWithViewOptions = Array<SshKeyWithViewOptions>;

export const transformSshKey = (sshKey: SshKey): SshKeyWithViewOptions => ({
    ...sshKey,
    href: `/ssh-keys/${sshKey.slug}`,
    activeOrArchivedText: sshKey.isActive ? 'Active' : 'Archive',
});

export const transformSshKeys = (
    sshKeys: SshKeys,
): SshKeysWithViewOptions => sshKeys.map((sshKey) => transformSshKey(sshKey));
