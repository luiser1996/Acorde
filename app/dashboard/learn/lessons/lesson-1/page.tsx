import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Form from '@/app/ui/lessons/lesson1-form';
 
export const metadata: Metadata = {
  title: 'Lesson 1',
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
                  <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 1: Introduction</h1>
              </div>
          </div>
          <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Welcome to Acorde Lessons! In this course, you will embark on an exciting journey into the world of guitar playing. Whether you&apos;re completely new to the instrument or have some experience, this course will provide you with the foundational knowledge and skills to start playing the guitar confidently.
            </p>
            <p>Throughout this course, you will learn about the different parts of the guitar, basic techniques for playing both the right and left hand, how to read chords and notes, understand tabs, explore scales, and much more. By the end of the course, you&apos;ll be equipped with the skills to play basic melodies, chords, and even some advanced techniques.
            </p>
            <p>You can skip lessons and start from the end it you want. But we recommend you to follow the order it&apos;s given. This way you&apos;ll learn naturally easier.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Before we begin, it&apos;s necessary to establish three fundamental points:</h2>
            <ul className="list-disc">
                <li>
                    <p>It&apos;s most convenient for you to use an acoustic guitar with nylon strings (classical type) for learning. It doesn&apos;t matter if you&apos;re using an electric guitar or an acoustic with steel strings, but it&apos;s better with the one we recommend.
                    </p>
                </li>
                <li>
                    <p>&quot;Every exercise should be practiced very slowly, and once mastered, it can be sped up, but never to a point that prevents control of the movements.&quot; This phrase is already well-known; it&apos;s important to understand that when learning to play an instrument, the most important aspect is the quality of the sound you produce, not the speed at which you play.
                    </p>
                </li>
                <li>
                    <p>Lastly, patience and consistency. Set aside a specific time each day (even if it&apos;s short) and try to be consistent. It&apos;s not worth getting discouraged, take your own pace, little by little. Try to stay as motivated as possible, because if you don&apos;t commit to learning, then you&apos;ll be wasting your time.
                    </p>
                </li>
            </ul>
            <p>Each lesson will build upon the previous one, gradually introducing new concepts and challenges. Even though there isn&apos;t a real person and it&apos;s more difficult to keep track of your progress, at the end of each lesson, there is a brief question to check your newly acquired knowledge. Remember, learning the guitar is a journey, and it&apos;s important to be patient and consistent with your practice.
            </p>
            {/* Question */}
            <div className="flex w-full mt-8 items-center justify-between flex-col">
                    <QuestionMarkCircleIcon className="w-20 mb-4 md:mb-0" />
                    <div className="flex flex-col items-center justify-between md:ml-4">
                        <h2 className={`${nunito.className} font-semibold text-xl`}>It&apos;s time for a quiz!</h2>
                        <p>Test your knowledge</p>
                    </div>
                    <Form currentUser={currentUser} />
                    <div className="flex w-full mt-8 items-center justify-end">
                        <Link
                            href="/dashboard/learn/lessons/lesson-2"
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