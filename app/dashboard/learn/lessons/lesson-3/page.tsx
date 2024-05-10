import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson3-form';
 
export const metadata: Metadata = {
  title: 'Lesson 3',
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
                href="/dashboard/learn/beginner-guitarist"
                className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
            >
                <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
            </Link>
            <div className="flex w-full ml-4 items-center justify-between">
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 3: Body posture</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Before picking up the guitar, it&apos;s essential to understand the proper sitting position to hold and play it. You should sit on a sturdy chair with a flat base, high enough so your legs are bent at a 90-degree angle, with your feet firmly planted on the floor and your knees apart at shoulder width. Your back should be straight, shoulders relaxed, and level. Ensure your clothing doesn&apos;t hinder your playing; it often happens that sleeves dampen the sound of the strings.
            </p>
            <h2 className={`${nunito.className} font-semibold mt-4 mb-4 text-xl`}>Holding the guitar</h2>
            <p><b>Standard Position:</b> Rest the guitar&apos;s waist on your right leg and place your right forearm on the edge of the body. The neck should be close to the body and slightly tilted upwards. Avoid pressing the guitar against your stomach. Tilt the top of the guitar slightly inwards to reduce the need for excessive bending to see where you place your fingers on both hands.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-3/pos1.png"
                    width={155}
                    height={155}
                    alt="Standard position to hold a guitar"
                />
            </div>
            <p className="mt-2"><b>Classical Position:</b> Rest the guitar&apos;s waist on the left leg, with the neck tilted upwards so the left hand easily reaches the fretboard. The right forearm rests on the body&apos;s edge. In this position, the guitar&apos;s weight is well-balanced. The left foot rests on a footstool to slightly elevate the leg. It&apos;s the best position for beginners, the guitar won&apos;t slip and the arms are positioned in a way that the strings are easy to reach in a comfortable way. 
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-3/pos2.png"
                    width={150}
                    height={150}
                    alt="Classical position to hold a guitar"
                />
            </div>
            <p className="mt-2"><b>Standing Position:</b> Any guitar can be played standing by using a strap. It&apos;s crucial for the instrument to hang with its weight towards the body and with a good center of gravity, allowing hands and arms to move freely. While many modern guitarists tend to hang the guitar low for aesthetic reasons, it makes playing more challenging and isn&apos;t recommended for beginners. For greater ease with the left hand, the neck should be tilted upwards.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-3/pos3.png"
                    width={140}
                    height={140}
                    alt="Standing position to hold a guitar"
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
                        href="/dashboard/learn/lessons/lesson-2"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-4"
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