
import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css'



const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonBySlug ($slug : String) {
        lesson(where: {slug: $slug}) {
            title
            id
            description
            teacher {
                bio
                avatarURL
                name
            }
        }
    }
`
interface GetLessonBySlugResponse{
    lesson: {
        title: string;
        videoID: string;
        description: string;
        teacher: {
            bio: string;
            avatarURL: string;
            name: string;
        }
    }
}

interface PlayProps {
    lessonSlug: string;
}
// {!* {data?.lesson.videoID} *!}
export function Play(props : PlayProps) {

    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {variables:{slug: props.lessonSlug}, fetchPolicy:'no-cache'})


    if (!data) {
        return(
            <div className="flex-1">
                <p>Carregando...</p>
            </div>
        )
    }

    return(
        <div className="flex-1">
            <div className="bg-black flex justify-center"> 
                <div className="h-full w-full max-w-[900px ]max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId = {data.lesson.videoID} key={data.lesson.videoID} /> 
                        
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            {/*Container Abaixo do Video */}
            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex1">
                        <h1 className="text-2xl font-bold">{data?.lesson.title}</h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {data?.lesson.description}
                        </p>

                        {/*Container com o Logo, Nome do professor e descrição*/}
                        <div className=" flex items-center gap-4 mt-6">
                            <img src= {data?.lesson.teacher.avatarURL} className="h-16 w-16 rounded-full border-2"></img>
                            <div className="leading-relaxed">
                                <strong className="font-bold tetx-2xl block">Marco Pozzan</strong>
                                <span className="text-gray-200">{data?.lesson.teacher.name}</span>
                            </div>
                        </div>
                    </div>  
                    {/*Container dos dois Link, Discor e Desafio*/}
                    <div className="flex flex-col gap-4">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24}/>
                            COMUNIDADE DO DISCORD
                        </a>

                        <a href="#" className=" p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold gap-2 justify-center first-letter:hover:bg-blue-500 hover:text-gray-900 transition-colors;">
                            <Lightning size={24} />
                            ACESSE O DESAFIO
                        </a>

                    </div>
                </div>

                {/*Container com dois ancoras, Material Complementar e Wallpaper*/}
                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center"><FileArrowDown size={40}/></div>
                        <div className=" py-6 leading-relaxed">
                            <strong className="text-2xl">Material complementar</strong>
                            <p className="text-sm">Acesse o material complementar para acelerar o seu desenvolvimento</p>
                        </div>
                        <div className="h-full p-6 flex items-center"><CaretRight size={24}/></div>
                    </a>

                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center"><FileArrowDown size={40}/></div>
                        <div className=" py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpaper Exclusivo</strong>
                            <p className="text-sm">Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina</p>
                        </div>
                        <div className="h-full p-6 flex items-center"><CaretRight size={24}/></div>
                    </a>

                </div>

            </div>
        </div>
    )
}
