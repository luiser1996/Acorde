'use client'

import { PencilIcon, PlusIcon, TrashIcon, CloudArrowUpIcon, CloudArrowDownIcon, EyeIcon, EyeSlashIcon, HeartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTab, likeTab, makeTabPrivate, makeTabPublic, publishTab, unlikeTab, unpublishTab } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

// Botón para llamar a crear una partitura
export function CreateTab() {
  return (
    <Link
      href="/dashboard/tabs/my-tabs/create"
      className="flex h-10 items-center rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
    >
      <span className="hidden md:block">Create Tab</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// Botón para llamar a pedir publicar una partitura
export async function PublishTab({
  id,
  finished
}: { 
  id: string;
  finished: boolean; 
}) {
  if (!finished){
    const publishTabWithId = publishTab.bind(null, id);
    return (
      <form action={publishTabWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Publish</span>
          <CloudArrowUpIcon className="w-5" />
        </button>
      </form>
    );
  }
  else{
    const unpublishTabWithId = unpublishTab.bind(null, id);
    return (
      <form action={unpublishTabWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Unpublish</span>
          <CloudArrowDownIcon className="w-5" />
        </button>
      </form>
    );
  }
}

// Botón para llamar a publicar una partitura
export async function MakePublicTab({
  id,
  published
}: { 
  id: string;
  published: boolean; 
}) {
  if (!published){
    const makeTabPublicWithId = makeTabPublic.bind(null, id);
    return (
      <form action={makeTabPublicWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Make Public</span>
          <EyeIcon className="w-5" />
        </button>
      </form>
    );
  }
  else{
    const makeTabPrivateWithId = makeTabPrivate.bind(null, id);
    return (
      <form action={makeTabPrivateWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Make Private</span>
          <EyeSlashIcon className="w-5" />
        </button>
      </form>
    );
  }
}

// Botón para llamar a editar una partitura
export function UpdateTab({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tabs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      passHref
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// Botón para llamar a borrar una partitura
export function DeleteTab({ id }: { id: string }) {
  const deleteTabWithId = deleteTab.bind(null, id);
  return (
    <form action={deleteTabWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

// Botón para dar me gusta a una partitura
export async function LikeTab({
  id,
  liked,
  currentUser,
}: { 
  id: string;
  liked: boolean;
  currentUser: User; 
}) {
  if (!liked){
    const likeTabWithId = likeTab.bind(null, id, currentUser.id);
    return (
      <form action={likeTabWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Like Tab</span>
          <HeartIcon className="w-5" />
        </button>
      </form>
    );
  }
  else{
    const unlikeTabWithId = unlikeTab.bind(null, id, currentUser.id);
    return (
      <form action={unlikeTabWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100 bg-red-100 text-red-600">
          <span className="sr-only">Unlike Tab</span>
          <HeartIcon className="w-5 text-red-600" />
        </button>
      </form>
    );
  }
}

// Botón para volver atrás en función de donde vienes
export function GoBackButton(){
  const router = useRouter();

  return(
    <div 
      className="flex items-center justify-center w-1/6 gap-5 self-start p-4 rounded-lg shadow-md bg-gray-50 px-6 py-3 text-sm font-medium text-black transition duration-300 ease-in-out hover:bg-sky-100 hover:text-orange-500 md:text-base"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-5 md:w-6" /><span className="hidden md:block">Go Back</span>
    </div>
  );
}

// Botón para ir a la ruta de tabs privados
export function MyTabs() {
  return (
    <Link
      href="/dashboard/tabs/my-tabs"
      className="flex h-10 items-center rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
    >
      <p>My Tabs</p>
    </Link>
  );
}

// Botón para ir a la ruta de tabs revisables por admins
export function Admin() {
  return (
    <Link
      href="/dashboard/tabs/admin"
      className="flex h-10 items-center rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
    >
      <p>Admin</p>
    </Link>
  );
}