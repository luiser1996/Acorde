import { Metadata } from 'next';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { nunito } from '@/app/ui/fonts';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Lesson9 from '@/app/ui/lessons/lesson9-form';
 
export const metadata: Metadata = {
  title: 'Lesson 9',
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
                <h1 className={`${nunito.className} font-bold text-2xl`}>Lesson 9: Tabs</h1>
            </div>
        </div>
        <div className="border-t border-gray-300 mt-4 mb-4"></div>

        {/* Content */}
        <div>
            <p>Now that we know how to read chords and notes, let&apos;s talk about something fundamental: tablatures. Acorde has a library of tablatures moderated by admins. All users can create their own tablatures and publish them. To ensure the quality of the tablatures, they are not public until an admin reviews and corrects them if there are errors or gives their approval.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Tabs Overview</h2>
            <p>Navigate to the &quot;Tabs&quot; tab, where you&apos;ll see a list of songs. These tabs are public and have been reviewed by an admin who has determined they are suitable for publication. You can use the search function by name, artist, or date to filter the tabs you want to find. Clicking on the song name will display the tab. Here, you&apos;ll see the song&apos;s name and artist at the top, followed by the capo position and the tab&apos;s author and date. Below this header, you&apos;ll find the chords of the song to guide you when playing it. Beneath the chords is the content of the song. Typically, the song is structured with its parts, and above the lyrics, you&apos;ll find the chord names. Remember that even though you have everything you need to learn a song by viewing the tab, you should listen to it at least once to learn the rhythm and how it&apos;s sung. Sometimes you&apos;ll also see tabs written as fingerstyle arrangements.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>My Tabs</h2>
            <p>When you view a public tab that isn&apos;t yours, you&apos;ll notice a heart icon in the top right corner. This is the Like button. When you click it, the tab will be saved as a favorite, and you&apos;ll be able to see it in your list. In the &quot;Tabs&quot; tab, next to the search bar, you&apos;ll find a &quot;My Tabs&quot; button. Here, you&apos;ll see your list of tabs that you&apos;ve Liked, but you&apos;ll also see the tabs you&apos;ve created. You&apos;ll notice that you can also search among the tabs you&apos;ve saved and those that are yours.
            </p>
            <h2 className={`${nunito.className} mt-4 mb-4 font-semibold text-xl`}>Creating Tabs</h2>
            <p>To create a tab, simply go to &quot;My Tabs&quot;, then click on &quot;Create Tab&quot;. You&apos;ll see an input form where you&apos;ll need to enter the song&apos;s name and artist. Make sure the song you want to create isn&apos;t already public, as it&apos;s likely an admin will reject it. The capo, YouTube url, chords, and tab content are optional fields. This is so you can have your tab as a draft and decide when it&apos;s ready to be uploaded. To add the YouTube url you only have to search your song in YouTube, copy the url and paste it. To add the song&apos;s chords, click the &quot;+&quot; button and select the chord you want. There&apos;s no limit to the number of chords you can add. To remove a chord, simply click it again. The content should be structured with the song&apos;s parts in brackets, for example, a song would have [intro], [chorus], and [verse]. You should then add the lyrics below and the chords above the lyrics. When you&apos;re done, click &quot;Create Tab&quot;, and you&apos;ll see the newly created tab. Once created, you&apos;ll see different buttons:
            </p>
            <ul className="list-disc">
                <li>
                    <p><b>Publish Tab:</b> This appears as a cloud with an arrow pointing up. Until you click it, your tab will appear in &quot;My Tabs&quot; with a status of &quot;unfinished&quot;. Once clicked, you won&apos;t be able to edit or delete your tab. The publish icon will also change to a cloud with a downward arrow. Clicking it again will revert it to &quot;unfinished&quot;, allowing you to edit or delete it again. When you click Publish, it will be marked as &quot;pending&quot;, indicating that an admin can review it manually, and if they think it&apos;s suitable, they can make it public.
                    </p>
                </li>
                <li>
                    <p><b>Edit Tab:</b> This appears as a pencil and is used to edit your unfinished tab. The form is the same as creating a tab from scratch. You can edit it as many times as you like until you decide to publish it.
                    </p>
                </li>
                <li>
                    <p><b>Delete Tab:</b> This appears as a trash can and is used to delete your tab if you no longer want to work on it.
                    </p>
                </li>
            </ul>
            <p>Exercise: It&apos;s time for you to create a tab. Following the steps above, create a tab called &quot;Tutorial&quot; with the artist &quot;Acorde&quot;. No capo, add the chords &quot;C&quot;, &quot;G&quot;, &quot;F&quot;, and &quot;Am&quot;. Add whatever content you like. Click Create, and you&apos;ll see your tab. Congratulations, you&apos;ve created your first tab.
            </p>
        
            {/* Question */}
            <div className="flex w-full mt-8 items-center justify-between flex-col">
                <QuestionMarkCircleIcon className="w-20 mb-4 md:mb-0" />
                <div className="flex flex-col items-center justify-between md:ml-4">
                    <h2 className={`${nunito.className} font-semibold text-xl`}>It&apos;s time for a quiz!</h2>
                    <p>Test your knowledge</p>
                </div>
                <Lesson9 currentUser={currentUser} />
                <div className="flex w-full mt-8 items-center justify-between">
                    <Link
                        href="/dashboard/learn/lessons/lesson-8"
                        className="flex items-center justify-center mt-2 w-1/5 gap-5 p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
                    >
                        <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Previous Lesson</span>
                    </Link>
                    <Link
                        href="/dashboard/learn/lessons/lesson-10"
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