import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson4-form';
 
export const metadata: Metadata = {
  title: 'Lesson 4',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 4: Right hand</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now that we&apos;ve covered the guitar holding position, let&apos;s get into playing. Playing the guitar involves a great deal of coordination between the two hands. While the left hand is responsible for fretting the notes, the right hand directly produces the sound. The quality, volume, timbre, and range of sounds a guitarist can extract from the instrument depend on it.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-4/drch2.png"
                    width={170}
                    height={170}
                    alt="Right hand position technique"
                />
            </div>
            <p className="mt-4">This time, we&apos;ll discuss some considerations to ensure that the right hand enables the fingers to perform their function optimally:
            </p>
            <ul className="list-disc mt-4">
                <li>
                    <p>The wrist position should be neutral, as an extension of the forearm. Avoid excessive flexion as it poses the risk of median nerve entrapment (Carpal Tunnel Syndrome).
                    </p>
                </li>
                <li>
                    <p>Fingers should maintain a flexible curvature. The index, middle, and ring fingers should be on the same plane, maintaining equal distance from the strings.
                    </p>
                </li>
                <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                    <Image
                        src="/lessons/lesson-4/drch1.png"
                        width={160}
                        height={160}
                        alt="Right hand position technique"
                    />
                </div>
                <li>
                    <p>The pinky finger is only used in some strumming techniques.
                    </p>
                </li>
                <li>
                    <p>The point of contact with the string is where the nail meets the fingertip. For a brighter sound, you&apos;ll use more nail, while for a darker sound, you&apos;ll use more fingertip.
                    </p>
                </li>
                <li>
                    <p>To alter the instrument&apos;s timbre, you can move your hand towards the bridge (producing a more metallic sound) or towards the soundhole and fretboard (producing a sweeter sound). As a general rule, your hand should be positioned towards the right side of the soundhole (neutral sound).
                    </p>
                </li>
                <li>
                    <p>There are two basic ways to strike the strings: &quot;rest stroke&quot; (resting the finger on the immediately adjacent string) or &quot;free stroke&quot; (more common in classical guitar). Ideally, find a position that allows you to switch between them with minimal movement.
                    </p>
                </li>
                <li>
                    <p>As a general rule, avoid using the same finger twice in succession. Though it may seem easier initially, it will ultimately reduce your speed. It&apos;s akin to trying to walk on one leg instead of two.
                    </p>
                </li>
                <li>
                    <p>In melody playing, alternate between the index and middle fingers. In arpeggios, the thumb handles the wound strings, the index the third string, the middle the second, and the ring the first string.
                    </p>
                </li>
                <li>
                    <p>The finger attack should originate from the first joint and move towards the palm, avoiding outward movement typical of beginner guitarists. As control and sensitivity improve, you can explore possibilities with the other two finger joints, especially the last one (tip joint).
                    </p>
                </li>
            </ul>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-4/drch3.png"
                    width={155}
                    height={155}
                    alt="Right hand position technique"
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
                        href="/dashboard/learn/lessons/lesson-3"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-5"
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