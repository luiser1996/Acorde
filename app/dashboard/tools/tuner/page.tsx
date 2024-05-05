import { Metadata } from 'next';
import Link from 'next/link';
import { nunito } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Tuner',
};

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
          <h1 className={`${nunito.className} text-2xl`}>Tuner</h1>
      </div>
      <p className="mt-4 mb-4 text-center">
        If you don&apos;t how to use this tuner, we recommend you to complete the{' '}
        {/*Aqui falta cambiar la ruta cuando sepa donde esta la leccion con el tutorial de afinar la guitarra */}
        <Link legacyBehavior href="/tutorial">
          <a className="text-blue-500 hover:underline">tutorial</a>
        </Link>{''}
        .
      </p>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <iframe
            src="https://guitarapp.com/tuner.html?embed=true&theme=light"
            allow="microphone"
            title="GuitarApp Online Tuner"
            className="w-full max-w-md h-full rounded-md"
            style={{ border: 'none' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}