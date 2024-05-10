import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson16-form';
 
export const metadata: Metadata = {
  title: 'Lesson 16',
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
                href="/dashboard/learn/star-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 16: Advanced melodies</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now you have everything you need to play slightly more advanced melodies. In this lesson, you will learn to play the intro of two well-known songs.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-16/pinkfloyd.png"
                    width={600}
                    height={600}
                    alt="Pink Floyd melody"
                />
            </div>
            <p>This is the intro of &quot;Wish You Were Here&quot; by Pink Floyd. You will notice that in the tab, several notes are seen on the same line; when you see this, you should strum a chord or play it as an arpeggio. If you look at the chord that appears at the end of the first line, which uses all the strings, it corresponds to the G chord. Practice playing the melody patiently until you can play it smoothly with a good sound. If you don&apos;t know how the melody sounds, we recommend searching for the song on YouTube.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-16/stairway.png"
                    width={600}
                    height={600}
                    alt="Stairway to heaven melody"
                />
            </div>
            <p>This melody corresponds to the intro of &quot;Stairway to Heaven&quot; by Led Zeppelin. It may be more challenging than the other one; if you see only two or three notes in a supposed chord, we recommend plucking the strings or arpeggiating it rather than strumming it. When playing the melody, you&apos;ll find it more comfortable to form a chord with your fingers in a fixed position and then adjust your finger positions from that chord.
            </p>
            <p className="mt-2"><b>Exercise:</b> Applying the tips and all your current knowledge, play the last melody until you can play it smoothly. When you finish, answer the quiz honestly.
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
                        href="/dashboard/learn/lessons/lesson-15"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-17"
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