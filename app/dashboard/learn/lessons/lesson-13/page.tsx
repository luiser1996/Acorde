import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson13-form';
 
export const metadata: Metadata = {
  title: 'Lesson 13',
};

function generateBlankUser(): User {
  return {
    id: 'randomId123',
    name: 'Blank User',
    email: 'blank@example.com',
    password: 'randomPassword',
  };
}

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const email: string = user?.email || '';

  const currentUserInfo = await getUser(email);
  const blankUser : User = generateBlankUser();
  const currentUser: User = currentUserInfo || blankUser;

  return (
    <div className="w-full flex flex-col">
        <div className="flex w-full items-center justify-between">
            <Link
                href="/dashboard/learn/emerging-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 13: Capo</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>In this lesson, we&apos;ll discuss the capo, a device used to simulate the guitar nut by using your index finger. By doing this, we raise the pitch of what we&apos;re playing.
            </p>
            <p className="mt-2">Placing our index finger across all frets on the 1st fret achieves a capo on the 1st fret, which raises everything we play by a semitone. Applying the capo technique with your left thumb and index finger to press down all the notes simultaneously requires strength and practice.
            </p>
            <p className="mt-2">Certain chords, like F major, require this technique to be played. Apply the capo technique to play the F major chord:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">F</h1>
                <Image
                    src="/chords/F/F.png"
                    width={200}
                    height={200}
                    alt="F maj chord"
                />
            </div>
            <p>Don&apos;t worry if you don&apos;t succeed at first; it&apos;s normal. Try to be patient, and you&apos;ll eventually play this chord. Once you master it, you&apos;ll be able to play most songs alongside the chords C, G, and Am. Remember, you can always refer to the chord search tool in the toolbox.
            </p>
            <p className="mt-2">Often, a song is in a different key than the usual one. Sometimes it requires a different tuning, but other times, it just needs a capo on a specific fret. When this happens, we use a physical capo, not the technique you&apos;ve learned.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-13/capo.png"
                    width={200}
                    height={200}
                    alt="Capo image"
                />
            </div>
            <p>A capo is a device placed on the guitar neck at the required fret, performing the same function as your index finger. You can purchase a capo at any music store; they&apos;re usually inexpensive. Alternatively, you can make a homemade capo using office materials like rubber bands and a pencil; many online tutorials guide you through making one.
            </p>
            <p className="mt-2">It&apos;s essential to know that when reading a tablature, you&apos;ll see at the beginning if the song requires a capo or not. If it does, you should place it on the specified fret.
            </p>
        
            {/* Question */}
            <div className="flex w-full mt-8 items-center justify-between flex-col">
                <QuestionMarkCircleIcon className="w-20 mb-4 md:mb-0" />
                <div className="flex flex-col items-center justify-between md:ml-4">
                    <h2 className={`${nunito.className} font-semibold text-xl`}>It&apos;s time for a quiz!</h2>
                    <p>Test your knowledge</p>
                </div>
                <Form currentUser={currentUser} />
                <div className="flex w-full mt-8 items-center justify-between">
                    <Link
                        href="/dashboard/learn/lessons/lesson-12"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-14"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <span className="hidden md:block">Next Lesson</span><ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}