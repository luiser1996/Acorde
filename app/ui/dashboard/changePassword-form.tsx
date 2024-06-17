'use client';

import { User } from '@/app/lib/definitions';
import { KeyIcon, LockOpenIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { changePassword, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

// Formulario para cambiar la contraseña del usuario
export default function ChangePasswordForm({
  currentUser
}: {
  currentUser: User;
}) {
    const changePasswordUser = async (prevState: State | undefined, formData: FormData): Promise<State | undefined> => {
        try {
            const result = await changePassword(currentUser, prevState, formData);
            if (result == undefined) {
                return prevState;
            } else {
                alert(result);
            }
        } catch (error) {
            return prevState;
        }
    };
    const [errorMessage, dispatch] = useFormState(changePasswordUser, undefined);
 
    return <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Current password */}
        <div className="mb-4">
          <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium">
          Current password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter current password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* New password 1 */}
        <div className="mb-4">
          <label htmlFor="newPassword1" className="mb-2 block text-sm font-medium">
          New password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="newPassword1"
                name="newPassword1"
                type="password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <LockOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* New password 2 */}
        <div className="mb-4">
          <label htmlFor="newPassword2" className="mb-2 block text-sm font-medium">
          Repeat new password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="newPassword2"
                name="newPassword2"
                type="password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Repeat new password"
                required
                minLength={6}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
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
          href='/dashboard/settings/account'
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Apply</Button>
      </div>
    </form>
}