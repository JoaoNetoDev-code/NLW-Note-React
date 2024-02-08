import * as Dialog from "@radix-ui/react-dialog"
import {X} from "lucide-react"
import { useState } from "react";
import {toast} from "sonner"

interface INewNoteCard {
  onNoteCreated: (noteContent: string) => void;
}

let speechRecognition: SpeechRecognition | null = null

const NewNoteCard = ({onNoteCreated}: INewNoteCard) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [noteContent, setNoteContent] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleClickStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleStartRecording = () => {
    toast.success("Gravando...")
    const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionSupported) {
      return toast.error("Speech recognition não é suportado neste navegador!")
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setNoteContent(transcription)

    }

    speechRecognition.onerror = (e) => {
      console.error(e)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
      speechRecognition = null; 
  }
}

  const handleSaveNote = () => {

    if (noteContent === '') return toast.error("Você precisa escrever algo antes de salvar sua nota!")
    
    onNoteCreated(noteContent)
    setNoteContent("")
    setShouldShowOnboarding(true)

    return toast.success("Nota salva com sucesso!")
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target.value
    if (!textArea.length) {
      setShouldShowOnboarding(true)
    }
    setNoteContent(textArea)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-200">
        Adicionar nota
      </span>
      <p className="text-sm leading-6 text-slate-400">
        grave uma nota em audio que sera convertida para texto automaticamente.
      </p>
    </Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2  md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
        <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
          <X className="size-5"/>
        </Dialog.Close>
          <form
            className="flex-1 flex flex-col"
            >
            <div className="flex flex-1 flex-col gap-3 p-5">
            <span
          className="text-sm font-medium text-slate-300">
          Adicionar nota
          </span>
            {shouldShowOnboarding ? (<p
              className="text-sm leading-6 text-slate-400">
                comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:text-lime-500 underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleClickStartEditor} className="font-medium text-lime-400 hover:text-lime-500 underline">utilize apenas texto</button>.
            </p>) : (
              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleChangeContent}
                value={noteContent}
                />
            )}
            </div>
            {
              isRecording ? (
                <button
              type="button"
              onClick={handleStopRecording}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100">
                <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                Gravando! (click p/ interromper)
            </button>
              ) : (
                <button
              type="button"
              onClick={handleSaveNote}
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
              Salvar nota
            </button>
              )
            }
          </form>
        </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
  );
}

export default NewNoteCard;