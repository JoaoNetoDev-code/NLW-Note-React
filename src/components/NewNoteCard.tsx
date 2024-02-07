import * as Dialog from "@radix-ui/react-dialog"
import {X} from "lucide-react"
import { FormEvent, useState } from "react";
import {toast} from "sonner"

const NewNoteCard = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [noteContent, setNoteContent] = useState("")

  const handleClickStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target.value
    if (textArea.length === 0) {
      setShouldShowOnboarding(true)
    }
  }

  const handleSaveNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShouldShowOnboarding(true)

    if (!shouldShowOnboarding) {
      toast.success("Nota salva com sucesso!")
    }

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
        <Dialog.Content className="fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
        <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
          <X className="size-5"/>
        </Dialog.Close>
          <form
            onSubmit={handleSaveNote}
            className="flex-1 flex flex-col"
            >
            <div className="flex flex-1 flex-col gap-3 p-5">
            <span
          className="text-sm font-medium text-slate-300">
          Adicionar nota
          </span>
            {shouldShowOnboarding ? (<p
              className="text-sm leading-6 text-slate-400">
                comece <button onClick={handleClickStartEditor} className="font-medium text-lime-400 hover:text-lime-500 underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleClickStartEditor} className="font-medium text-lime-400 hover:text-lime-500 underline">utilize apenas texto</button>.
            </p>) : (
              <textarea
                autoFocus
                className="texts-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleChangeContent}
                />
            )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
  );
}

export default NewNoteCard;