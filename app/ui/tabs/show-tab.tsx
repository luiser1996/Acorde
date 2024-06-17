import { fetchTabById, fetchTabChords, fetchUserById, isTabFinished, isTabLikedByUser, isTabOwner, isTabPublic } from "@/app/lib/data";
import { nunito } from "../fonts";
import Image from "next/image";
import { DeleteTab, GoBackButton, LikeTab, MakePublicTab, PublishTab, UpdateTab } from "./buttons";
import { User } from "@/app/lib/definitions";
import YouTubeEmbed from "./youtube-embed";

// Función para mostrar una partitura
export default async function ShowTab({
    id,
    currentUser,
}: {
    id: string;
    currentUser: User;
}) {
    const tab = await fetchTabById(id);
    const finished = await isTabFinished(id);
    const published = await isTabPublic(id);
    const liked = await isTabLikedByUser(id, currentUser.id);

    const user = await fetchUserById(tab.user_id);
    const chords = await fetchTabChords(id);

    const admin = currentUser.admin;
    const owner = await isTabOwner(id, currentUser.id);
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <main>
            <div className="w-full flex flex-col">
                <div className="flex w-full items-center justify-between">
                    <GoBackButton />
                    <div className="flex w-full ml-4 items-center justify-between">
                        <h1 className={`${nunito.className} text-2xl`}>&quot;{tab.name}&quot; by <b>{tab.artist}</b></h1>
                    </div>
                    <div className="flex w-full ml-4 items-center gap-2 justify-end">
                        {owner && (
                            <>
                                {!published && (
                                    <>
                                        <PublishTab id={id} finished={finished} />
                                        {!finished && (
                                            <>
                                                <UpdateTab id={id} />
                                                <DeleteTab id={id} />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {admin && (    
                            <>
                                <MakePublicTab id={id} published={published}/>
                                {!published && (
                                    <>
                                        {!owner && (
                                            <>
                                                <PublishTab id={id} finished={finished} />
                                                <UpdateTab id={id} />
                                                <DeleteTab id={id} />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {!owner && (
                            <>
                                <LikeTab id={id} liked={liked} currentUser={currentUser}/>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <p><b>Capo:</b> {tab.capo ? tab.capo : 'No Capo'}</p>
                </div>
                <div className="mt-4">
                    <p><b>Author:</b> {user.name} on {tab.date && formatDate(tab.date)}</p>
                </div>
                <div className="border-t border-gray-300 mt-4 mb-4"></div>
                
                {/* Video */}
                <div className="mb-4">
                    {tab.url && (
                        <YouTubeEmbed videoId={tab.url} />
                    )}
                </div>
                
                {/* Chords */}
                <div className="mb-4">
                    <h2 className={`${nunito.className} font-semibold text-xl`}>Chords</h2>
                    <div className="flex mt-4">
                    <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
                    {chords.map((chord) => (
                        <div key={chord.id} className="flex-shrink-0 mr-4">
                            {chord.semitone !== 'M' ? (
                                <h1 className="text-xl text-center mt-2 font-bold">
                                {chord.tone}
                                {chord.semitone}
                                </h1>
                            ) : (
                                <h1 className="text-xl text-center mt-2 font-bold">{chord.tone}</h1>
                            )}
                            <Image
                                src={chord.image_url.replaceAll("#", "%23")}
                                width={200}
                                height={200}
                                className="hidden md:block"
                                alt={`Acorde: ${chord.tone}${chord.semitone}`}
                            />
                            <Image
                                src={chord.image_url.replaceAll("#", "%23")}
                                width={150}
                                height={150}
                                className="block md:hidden"
                                alt={`Acorde: ${chord.tone}${chord.semitone}`}
                            />
                        </div>
                        ))}
                    </div>
                    </div>
                    <div className="border-t border-gray-300 mt-4"></div>
                </div>

                {/* Content */}
                <div className="h-full w-full">
                    <textarea
                        className="w-full h-full p-2.5 text-sm text-black bg-white rounded-md border border-white outline-2"
                        value={tab.content}
                        readOnly={true}
                        style={{ height: "auto", minHeight: "650px" }}
                    />
                </div>
            </div>
        </main>
    );
}