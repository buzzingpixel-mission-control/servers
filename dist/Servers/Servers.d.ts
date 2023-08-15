import { z } from 'zod';
import { ProjectsWithViewOptions, ProjectWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';
import { SshKeysWithViewOptions, SshKeyWithViewOptions } from '../SshKey/SshKeys';
export declare const ServerSchema: z.ZodObject<{
    id: z.ZodString;
    isActive: z.ZodBoolean;
    projectId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    slug: z.ZodString;
    sshUserName: z.ZodNullable<z.ZodString>;
    address: z.ZodNullable<z.ZodString>;
    sshPort: z.ZodNullable<z.ZodNumber>;
    sshKeyId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}, {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}>;
export type Server = z.infer<typeof ServerSchema>;
export declare const ServersSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    isActive: z.ZodBoolean;
    projectId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    slug: z.ZodString;
    sshUserName: z.ZodNullable<z.ZodString>;
    address: z.ZodNullable<z.ZodString>;
    sshPort: z.ZodNullable<z.ZodNumber>;
    sshKeyId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}, {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}>, "many">;
export type Servers = z.infer<typeof ServersSchema>;
export type ServerWithViewOptions = Server & {
    href: string;
    manageAuthorizedKeysHref: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
    sshKey?: SshKeyWithViewOptions;
};
export type ServersWithViewOptions = Array<ServerWithViewOptions>;
export declare const transformServer: (server: Server, projects?: ProjectsWithViewOptions, sshKeys?: SshKeysWithViewOptions) => ServerWithViewOptions;
export declare const transformServers: (servers: {
    id?: string;
    isActive?: boolean;
    projectId?: string;
    title?: string;
    slug?: string;
    sshUserName?: string;
    address?: string;
    sshPort?: number;
    sshKeyId?: string;
}[], projects?: ProjectsWithViewOptions, sshKeys?: SshKeysWithViewOptions) => ServersWithViewOptions;
