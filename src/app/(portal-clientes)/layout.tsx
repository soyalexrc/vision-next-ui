import React from 'react';
import {Providers} from '@/store/Providers';
import Layout from '@/components/layout';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <Providers>
            <Layout>{children}</Layout>
        </Providers>
    );
}
