import React from 'react';
import { Route } from 'react-router-dom';
import SshKeyListPage from './SshKey/SshKeyListPage';
import SshKeyDetailsPage from './SshKey/Details/SshKeyDetailsPage';

const ServersRoutes = () => (
    <>
        <Route path="/ssh-keys" element={<SshKeyListPage />} />
        <Route path="/ssh-keys/archived" element={<SshKeyListPage isArchive />} />
        <Route path="/ssh-keys/:slug" element={<SshKeyDetailsPage />} />
    </>
);

export default ServersRoutes;
