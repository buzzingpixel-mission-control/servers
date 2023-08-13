import { z } from 'zod';
export declare const SshKeySchema: z.ZodObject<{
    id: z.ZodString;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    public: z.ZodString;
    private: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}, {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}>;
export type SshKey = z.infer<typeof SshKeySchema>;
export declare const SshKeysSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    public: z.ZodString;
    private: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}, {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}>, "many">;
export type SshKeys = z.infer<typeof SshKeysSchema>;
export type SshKeyWithViewOptions = SshKey & {
    href: string;
    activeOrArchivedText: string;
};
export type SshKeysWithViewOptions = Array<SshKeyWithViewOptions>;
export declare const transformSshKey: (sshKey: SshKey) => SshKeyWithViewOptions;
export declare const transformSshKeys: (sshKeys: {
    id?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    public?: string;
    private?: string;
}[]) => SshKeysWithViewOptions;
