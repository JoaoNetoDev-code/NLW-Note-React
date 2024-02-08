import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo.svg'
import NewNoteCard from './components/NewNoteCard'
import NoteCard from './components/NoteCard'

interface INote {
  id: string,
  date: Date,
  content: string,
}

export function App() {
  const [notes, setNotes] = useState<INote[]>(() => {
    const notes = localStorage.getItem('notes')

    if (notes) {
      return JSON.parse(notes)
    }

    return [] 
  })
  const [search, setSearch] = useState('')

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const allNodes = [newNote, ...notes]

    setNotes(allNodes)

    localStorage.setItem('notes', JSON.stringify(allNodes))
  }

  const onNoteDelete = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)
  }

  const filteredNotes = notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW - Expert" width={200} height={200} />
        <form className="w-full">
        <input
          type="text"
          placeholder="busque por suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleChangeSearch}
          />
        </form>

        <div className="h-px bg-slate-700"/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]" >
          <NewNoteCard onNoteCreated={onNoteCreated} />
          {
            filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onNoteDelete={onNoteDelete}/>
            ))
          }
        </div>
    </div>
  )
}