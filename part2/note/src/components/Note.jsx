const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'

    return (
        <li className="note">
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

// last line exports the declared module, tha variable Note
export default Note;