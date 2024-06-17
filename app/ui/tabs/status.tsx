import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

// Función para manejar la lógica de los tres posibles estados de una partitura
export default function TabStatus({ published, finished }: { published: boolean; finished: boolean }) {
  const status = finished ? (published ? 'published' : 'pending') : 'unfinished';

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'unfinished',
          'bg-yellow-500 text-white': status === 'pending',
          'bg-green-500 text-white': status === 'published',
        },
      )}
    >
      {status === 'published' ? (
        <>
          Published
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : status === 'unfinished' ? (
        <>
          Unfinished
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}