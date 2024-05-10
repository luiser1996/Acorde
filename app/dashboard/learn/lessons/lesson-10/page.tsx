import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson10-form';
 
export const metadata: Metadata = {
  title: 'Lesson 10',
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
                href="/dashboard/learn/promising-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 10: Scales</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Although it&apos;s good to be able to read tablatures, they can become complicated if you&apos;re just starting out. So let&apos;s take it slow.
            </p>
            <p>In this lesson, we&apos;ll practice some scales. A scale is a group of musical notes arranged in order. You could think of them as small melodies.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-10/c_scale.png"
                    width={400}
                    height={400}
                    alt="C major scale"
                />
            </div>
            <p>This scale is the C major scale. The notes are ordered from the lowest tone (in this case, the 3rd fret of the 5th string) to the highest, forming a scale.
            </p>
            <p className="mt-2"><b>Exercise:</b> Play the C major scale note by note, and when you reach the highest note, go back down following the scale. Once you&apos;re comfortable doing this, try not to look at the tablature.
            </p>
            <p className="mt-2">There are many scales, and the difference lies in which note they start on and which tones and semitones they use.
            </p>
            <p className="mt-2"><b>Exercise:</b> Repeat the previous exercise for the F minor scale:
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-10/fm_scale.png"
                    width={400}
                    height={400}
                    alt="C major scale"
                />
            </div>
        
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
                        href="/dashboard/learn/lessons/lesson-9"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-11"
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