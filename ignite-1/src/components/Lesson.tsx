import {CheckCircle, Lock } from 'phosphor-react'
import {isPast, format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live'|'class'; 
}

export function Lesson(props: LessonProps) {
    
    const lesson_state = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt,"EEEE ' • ' d' de 'MMMM' • 'k'h'mm",{ locale: ptBR},)

    return(
        <a href="#">
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className="rounded border border-green-500 p-4 mt-2">
                <header className="flex items-center justify-between">
                    {lesson_state ?(
                        <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                            <CheckCircle size={20}/>
                            Conteudo Liberado
                        </span>
                    ): (
                        <span className="text-sm text-yellow-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em breve
                        </span>
                    )
                    }
                    <span className="text-xs rounded py-[0125.rem] px-2 border border-green-300 ">
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className="block mt-5">
                    {props.title}
                </strong>
            </div>

        </a>
    )
}