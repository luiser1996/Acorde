import AcordeLogo from '@/app/ui/acorde-logo';
import SignUpForm from '@/app/ui/signup-form';
import { Metadata } from 'next';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Sign up',
};
 
export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
          <Link href="/">
            <div className="w-32 text-black md:w-36">
              <AcordeLogo />
            </div>
          </Link>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
