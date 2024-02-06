const NewNoteCard = () => {
  return (
    <div className="rounded-md bg-slate-700 p-5 space-y-3">
      <span className="text-sm font-medium text-slate-200">
        Adicionar nota
      </span>
      <p className="text-sm leading-6 text-slate-400">
        grave uma nota em audio que sera convertida para texto automaticamente.
      </p>
    </div>
  );
}

export default NewNoteCard;