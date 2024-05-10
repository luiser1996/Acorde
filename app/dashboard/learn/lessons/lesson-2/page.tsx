import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Form from '@/app/ui/lessons/lesson2-form';
 
export const metadata: Metadata = {
  title: 'Lesson 2',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 2: Guitar structure</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Learning to play the guitar requires understanding its components. Let&apos;s explore the parts of a classical guitar. Classical guitar is recommended for beginners but if you have other type of guitar the parts are the same. The only issue you will have is the hardness of the strings and the strenght you will need to play correctly.
            </p>
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
                <Image
                    src="/lessons/lesson-2/guitar-parts.png"
                    width={400}
                    height={400}
                    alt="Parts of a classical guitar"
                />
            </div>
            <h2 className={`${nunito.className} font-semibold text-xl`}>Strings</h2>
            <p>The guitar has six strings named after the sounds they produce when played open and are numbered from bottom to top, referring to the normal position for playing. The thinnest string is number 1, and the thickest is the 6th. In classical or flamenco guitars, the three treble strings are made of monofilament nylon, and the bass strings have a multifilament core and a copper winding.
            </p>

            <h2 className={`${nunito.className} mt-4 font-semibold text-xl`}>Machine Head</h2>
            <p>Its function is to hold and tension the strings. It consists of a mechanism with worm screws that rotate a shaft where the strings are wound. Some builders use personal designs that distinguish their instruments. The front part is made of laminated wood.
            </p>

            <h2 className={`${nunito.className} mt-4 font-semibold text-xl`}>Nut (Upper)</h2>
            <p>It&apos;s an elongated piece embedded in the upper part of the fretboard, between it and the machine head. It&apos;s usually made of bone or hard synthetic materials like graphite. The nut controls the height of the strings over the first fret and allows string separation, securing them with grooves on its front side.
            </p>

            <h2 className={`${nunito.className} mt-4 font-semibold text-xl`}>Neck - Fretboard</h2>
            <p>The fretboard is an elongated piece of ebony that covers the neck. The neck has one or two slots where it fits into the body and is made of hard maple on the front side. It&apos;s divided into spaces delimited by metal bars called frets. Each space (or fret) represents a musical note.
            </p>

            <h2 className={`${nunito.className} mt-4 font-semibold text-xl`}>Body</h2>
            <p>The body or soundbox is the main and fundamental part of acoustic guitars, consisting of the top soundboard, bottom soundboard, and sides. It amplifies the sounds produced when plucking the strings. When the strings are struck, they vibrate, collected by the bridge, and transmitted to the cover of the body. The vibration produced by this cover is collected and amplified by the guitar body, and the sound comes out through the soundhole.
            </p>

            <h2 className={`${nunito.className} mt-4 font-semibold text-xl`}>Bridge</h2>
            <p>The bridge is an elongated, narrow piece located on the top soundboard at a certain distance from the soundhole. It&apos;s where the strings are fixed before placing and tensioning them at the machine head. The placement system is similar to that of the machine head. To adjust the string height on acoustics, we find the saddle (lower nut) on the top of the bridge.
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
                        href="/dashboard/learn/lessons/lesson-1"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-3"
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