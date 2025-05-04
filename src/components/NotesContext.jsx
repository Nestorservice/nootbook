import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    // Initialisation de notes avec un tableau vide comme valeur par défaut
    const [notes, setNotes] = useLocalStorage("notes", []);

    // Ajouter une nouvelle note
    const addNote = (newNote) => {
        setNotes(prevNotes => [...prevNotes, newNote]);
    };

    // Modifier une note existante
    const editNote = (index, updatedNote) => {
        setNotes(prevNotes => {
            const updated = [...prevNotes];
            updated[index] = updatedNote;
            return updated;
        });
    };

    // Supprimer une note
    const deleteNote = (index) => {
        setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
    };

    // S'assurer que 'notes' est toujours un tableau
    const safeNotes = Array.isArray(notes) ? notes : [];

    return (
        <NotesContext.Provider value={{
            notes: safeNotes,
            addNote,
            editNote,
            deleteNote
        }}>
            {children}
        </NotesContext.Provider>
    );
};
