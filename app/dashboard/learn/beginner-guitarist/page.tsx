import { Metadata } from 'next';
import { fetchLessons } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { auth, getUser } from '@/auth';
import { isLessonCompleted } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Beginner Guitarist',
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
  
  const lessons = await fetchLessons();
  const currentLessons = lessons.slice(0, 5);
  const completedLessons = await Promise.all(currentLessons.map(async (lesson) => {
    const result = await isLessonCompleted(currentUser, lesson.id);
    return result;
  }));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Learn', href: '/dashboard/learn' },
            {
              label: 'Beginner Guitarist',
              href: `/dashboard/learn/beginner-guitarist`,
              active: true,
            },
          ]}
        />
      </div>
      <div className="space-y-4">
        {currentLessons.map((lesson, index) => (
          <Link legacyBehavior key={lesson.id} href={`/dashboard/learn/lessons/lesson-${index + 1}`}>
            <a>
              <div className={`mb-4 p-4 rounded-lg shadow-md ${completedLessons[index] ? 'bg-green-400 hover:bg-green-300 transition-colors duration-300 ease-in-out' : 'bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out'}`}>
                <h2 className="text-lg font-semibold">{lesson.name}</h2>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}