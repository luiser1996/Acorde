import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Botón para ir a la ruta de editar perfil
export function EditProfile() {
  return (
    <Link
      href={`/dashboard/profile/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}