import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {notFound} from "next/navigation";

interface PageProgs {
    params: {
        fileid: string
    }
}

const Page = ({Params}: PageProps) => {
    // retrieve the file id
    const { fileid } = Params

    // make database call

    const {getUser} = getKindeServerSession()
    const user = getUser()

    const file = await db.file.findFirst({
        where: {
            id: fileid,
            userId: user.id,
        }
    })

    if(!file) { notFound() }


    if(!user || !user.id) redirect(`/auth-callback?origin=dashboard/{fileid`)

    return (
        <div className='fle-1 justify-between fle flex-col h-[calc(100vh-3.5rem)]'>{fileid}
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
            {/* left side*/}
                <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                    <PdfRenderer />
                </div>
            </div>


            <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg-l lg:border-t-0'>
               <ChatWrapper />
            </div>


        </div>)
}