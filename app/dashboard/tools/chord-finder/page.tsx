import { Metadata } from 'next';
import { lora } from '@/app/ui/fonts';
import { fetchChords } from '@/app/lib/data';
import Form from '@/app/ui/dashboard/chordFinder-form';
 
export const metadata: Metadata = {
  title: 'Chord Finder',
};

export default async function Page() {
  const chords = await fetchChords();

  return (
  <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lora.className} text-2xl`}>Chord Finder</h1>
    </div>

    <Form chords={chords} />
  </div>
  );
}