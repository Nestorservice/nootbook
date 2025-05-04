import React, { useContext, useState } from 'react';
import '../css/home.css'; 
import { NotesContext } from './NotesContext';
import NoteMenu from './NoteMenu';

export default function Home() {
    const { notes } = useContext(NotesContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const pastelColors = [
        "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
        "#E6B3FF", "#B3FFEC", "#FFB3E6", "#FFD1B3", "#FFF0BA"
    ];

    const truncatedText = (text, maxLength = 15) => {
        if (!text || typeof text !== 'string') return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };

    const handleNoteClick = (e, index) => {
        setAnchorEl(e.currentTarget);
        setSelectedIndex(index);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className='home'>
                <div className='content'>
                    {(!notes || notes.length === 0) ? (
                        <>
                            <img src='Notes-bro.png' alt='illustration' className='illustration' />
                            <h5>Create your first note!</h5>
                        </>
                    ) : (
                        <div className='notes-list'>
                            {notes.map((note, index) => {
                                if (!note || typeof note !== 'object') return null;

                                const bgColor = pastelColors[index % pastelColors.length];
                                const title = truncatedText(note.title);
                                const content = truncatedText(note.content, 30);
                                const date = formatDate(note.date || note.createdAt); // support des deux clés

                                return (
                                    <div
                                        key={index}
                                        className='note-item'
                                        style={{ backgroundColor: bgColor }}
                                        onClick={(e) => handleNoteClick(e, index)}
                                    >
                                        <strong>{title}</strong>
                                        <p style={{ fontSize: '12px', marginTop: '4px' }}>
                                            {content}
                                        </p>
                                        <p style={{ fontSize: '10px', marginTop: '6px', fontStyle: 'italic' }}>
                                            {date}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <NoteMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                index={selectedIndex}
            />
        </>
    );
}
