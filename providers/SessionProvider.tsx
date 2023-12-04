'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const Providers = ({
  children,
  session,
  ...props
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session} {...props}>
      {children}
    </SessionProvider>
  );
};

export default Providers;
