import TabStatus from '@/app/ui/tabs/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredAdminTabs } from '@/app/lib/data';
import Link from 'next/link';

// Función para mostrar tabla de tabs que necesitan ser administrados en función de que tiene el buscador
export default async function AdminTabsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tabs = await fetchFilteredAdminTabs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tabs?.map((tab) => (
              <Link
                key={tab.id}
                href={`/dashboard/tabs/${tab.id}`}
                passHref
              >
              <div className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{tab.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{tab.artist}</p>
                  </div>
                  <TabStatus published={tab.published} finished={tab.finished} />
                </div>
                <div className="flex w-full items-center text-m justify-between pt-4">
                  <div>
                    <p>{tab.favorites_count} likes</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(tab.date)}</p>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Song
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Artist
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Likes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tabs?.map((tab) => (
                <tr
                  key={tab.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/tabs/${tab.id}`}
                        passHref
                      >
                        <p>{tab.name}</p>
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/tabs/${tab.id}`}
                      passHref
                    >
                      {tab.artist}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/tabs/${tab.id}`}
                      passHref
                    >
                    {tab.favorites_count} likes
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/tabs/${tab.id}`}
                      passHref
                    >
                    {formatDateToLocal(tab.date)}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/tabs/${tab.id}`}
                      passHref
                    >
                      <TabStatus published={tab.published} finished={tab.finished} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
