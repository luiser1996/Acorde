import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson12-form';
 
export const metadata: Metadata = {
  title: 'Lesson 12',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 12: Basic chords</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now that you&apos;ve played some basic melodies, it&apos;s time to play chords. With chords, you can play all the songs you can imagine. In this lesson, we&apos;ll cover the most basic and often used chords in music.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">C</h1>
                <Image
                    src="/chords/C/C.png"
                    width={200}
                    height={200}
                    alt="C maj chord"
                />
            </div>
            <p>You already know this chord; it&apos;s the C major chord. Try to recall it and play it from memory. Now let&apos;s learn four more chords. In the next lesson, we&apos;ll learn an important technique to play the F major chord. With these chords and the F major chord, you&apos;ll be able to play almost any song.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">D</h1>
                <Image
                    src="/chords/D/D.png"
                    width={200}
                    height={200}
                    alt="D maj chord"
                />
            </div>
            <p>This is D major, easy, right?
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">E</h1>
                <Image
                    src="/chords/E/E.png"
                    width={200}
                    height={200}
                    alt="E maj chord"
                />
            </div>
            <p>This is E major. These last two chords are almost the same in their minor version.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">G</h1>
                <Image
                    src="/chords/G/G.png"
                    width={200}
                    height={200}
                    alt="G maj chord"
                />
            </div>
            <p>This is G major. You can also play it without the 1st string (finger 3 in the image).
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center mt-4 font-bold">A</h1>
                <Image
                    src="/chords/A/A.png"
                    width={200}
                    height={200}
                    alt="A maj chord"
                />
            </div>
            <p>Finally, we have A major. Like D and E, the minor version is almost the same. If you want to remember any chord, remember that you have a chord search tool in the tools section. Just select the tone and semitone. When you finish the advanced chord lesson, you&apos;ll be able to play any chord you see in the chord finder.
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
                        href="/dashboard/learn/lessons/lesson-11"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-13"
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