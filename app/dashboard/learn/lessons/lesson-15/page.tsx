import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson15-form';
 
export const metadata: Metadata = {
  title: 'Lesson 15',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 15: Rhythms</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Strumming may initially feel awkward and unnatural, but fear not! With the right technique and focused practice, strumming a guitar will become as effortless as riding a bike. We&apos;re here to guide you through it.
            </p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>Guitar Strumming Technique and Timing Tips</h2>
            <ul className="list-disc">
                <li>
                    <p><b>Keep Your Strumming Hand Moving:</b> Ensure your strumming hand is always in motion, even during brief pauses. This continuous movement eliminates the need to time your strums precisely and helps maintain a steady rhythm.
                    </p>
                </li>
                <li>
                    <p><b>Maintain a Loose Wrist:</b> Avoid tensing up your wrist; instead, keep it relaxed and flexible. Most of the movement should come from rotating your lower arm, allowing your hand and wrist to follow naturally.
                    </p>
                </li>
                <li>
                    <p><b>Hold the Pick Lightly:</b> While it&apos;s natural to grip the pick tightly to prevent slipping, excessive tension can hinder smooth movement and affect your wrist&apos;s flexibility. Hold the pick with a gentle grip, allowing it to glide effortlessly over the strings.
                    </p>
                </li>
                <li>
                    <p><b>Be Selective with Strumming:</b> Not every strum requires hitting all strings. Often, only three or four strings are necessary for each chord. Aim to strike all strings or just the lower ones on downstrums, and only the highest strings on upstrums. This approach creates variation in tone and makes strumming more manageable.
                    </p>
                </li>
            </ul>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>How to Learn Strum Patterns</h2>
            <p>When strumming, tap into your innate sense of rhythm. Experienced musicians do this instinctively, allowing them to strum effortlessly. Strumming, like riding a bike, becomes second nature with practice. Let&apos;s take a look to the simplest strum rhythm possible as an example.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-15/strumming1.png"
                    width={400}
                    height={400}
                    alt="Strumming image"
                />
            </div>
            <p>To internalize rhythm, visualize the strumming pattern mentally before playing. Practice saying the beats aloud to establish the rhythm. Start by focusing on one chord to master the strumming pattern without the distraction of chord changes.
            </p>
            <p>Once comfortable, apply the strumming pattern to a chord progression, such as C, Am, Dm, and G7. Start with simpler patterns and gradually progress to more complex ones, always focusing on maintaining rhythm and fluidity.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-15/strumming2.png"
                    width={400}
                    height={400}
                    alt="Strumming image"
                />
            </div>
            <p>Try to learn the pattern above with the techniques you learned. When you are fluent try to play it with the same chords progression (C, Am, Dm and G7).</p>
            <p>Now lets complicate things a bit more.</p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-15/strumming3.png"
                    width={400}
                    height={400}
                    alt="Strumming image"
                />
            </div>
            <p><b>Exercise:</b> Learn and practice the provided strumming pattern with the given chord progression (C, Am, Dm, and G7). Once you are able to play it answer the quiz below.
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
                        href="/dashboard/learn/lessons/lesson-14"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-16"
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