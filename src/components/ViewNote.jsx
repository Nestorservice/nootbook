import React, { useContext } from 'react';
import { NotesContext } from './NotesContext';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/view.css';

export default function ViewNote() {
    const { id } = useParams();
    const { notes } = useContext(NotesContext);
    const navigate = useNavigate();

    // Vérifie que la note existe
    const note = notes[id];

    if (!note) {
        return (
            <div className='view-note'>
                <button onClick={() => navigate('/')}>Back</button>
                <div className='note-content'>
                    <p>Note not found!</p>
                </div>
            </div>
        );
    }

    // Formater la date (si elle existe)
    const formattedDate = note.createdAt
        ? new Date(note.createdAt).toLocaleString()
        : 'No date available';

    return (
        <div className='view-note'>
            <button onClick={() => navigate('/')}>Back</button>
            <div className='note-details'>
                <h2>{note.title}</h2>
                <p><strong>Date:</strong> {formattedDate}</p>
                <div className='note-content'>
                    <p>{note.content}</p>
                </div>
            </div>
        </div>
    );
}
