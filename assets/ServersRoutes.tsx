import React from 'react';
import { Route } from 'react-router-dom';
import SshKeyListPage from './SshKey/SshKeyListPage';
import SshKeyDetailsPage from './SshKey/Details/SshKeyDetailsPage';
import { default as ServersPage } from './Servers/Page';

const ServersRoutes = () => (
    <>
        <Route path="/ssh-keys" element={<SshKeyListPage />} />
        <Route path="/ssh-keys/archived" element={<SshKeyListPage isArchive />} />
        <Route path="/ssh-keys/:slug" element={<SshKeyDetailsPage />} />
        <Route path="/servers" element={<ServersPage />} />
        <Route path="/servers/archived" element={<ServersPage isArchive />} />
    </>
);

export default ServersRoutes;
