'use client';

import { User } from '@/app/lib/definitions';
import { UserCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProfile, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import Image from 'next/image';

export default function EditProfileForm({
  currentUser
}: {
  currentUser: User;
}) {
  const [imageUrl, setImageUrl] = useState('');
  const updateProfileUser = async (prevState: State | undefined, formData: FormData): Promise<State | undefined> => {
    try {
      const result = await updateProfile(currentUser, imageUrl, prevState, formData);
      console.log(result);
      if (result == undefined) {
        // Si el resultado no es una cadena (indicando un error), devolver el estado previo
        return prevState;
      } else {
        // Si hay un mensaje de error, simplemente devolver el estado previo sin incluir el mensaje de error
        alert(result);
      }
    } catch (error) {
      // En caso de error, simplemente devolver el estado previo
      return prevState;
    }
  };
  const [errorMessage, dispatch] = useFormState(updateProfileUser, undefined);
 
  return <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Profile Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Change name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="name"
                defaultValue={currentUser.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Profile picture */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="mb-2 block text-sm font-medium">
            Change profile picture
          </label>
          <div className="relative mt-2 rounded-md">
            
            <UploadButton className="items-start ut-button:bg-orange-500 ut-button:text-black ut-button:ut-readying:bg-orange-500/50"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                const uploadedFileData = res[0];
                const imageUrl = uploadedFileData.serverData.fileUrl;
                setImageUrl(imageUrl);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`Error: Max image size is 4MB`);
              }}
            />
          </div>
          {imageUrl && (
          <div className="mt-2">
            <Image
            src={imageUrl}
            width={150}
            height={150}
            className="hidden md:block"
            alt="Uploaded Image"
            />
          </div>
          )}
        </div>

      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage.toString()}</p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/profile"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Apply</Button>
      </div>
    </form>
}
