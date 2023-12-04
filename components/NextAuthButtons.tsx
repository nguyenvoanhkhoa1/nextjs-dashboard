'use client';
import { Button } from '@/app/ui/button';
import { signIn, signOut } from 'next-auth/react';
import { ArrowRightIcon, PowerIcon } from '@heroicons/react/20/solid';

export const SignIn = () => {
  return (
    <Button className="mt-4 w-full" onClick={() => signIn('keycloak')}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
};

export const SignOut = () => {
  return (
    <button
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      onClick={() => signOut()}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
};
