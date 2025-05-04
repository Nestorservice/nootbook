import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Save, Undo2, Redo2, Eraser, ScanText, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/editor.css';
import Tesseract from 'tesseract.js';

export default function Editor() {
    const [note, setNote] = useState('');
    const [showDrawing, setShowDrawing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const canvasRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useNavigate(); // Pour redirection

    // Initialisation reconnaissance vocale
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'fr-FR';

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    transcript += event.results[i][0].transcript;
                }
                setNote(prevNote => prevNote + ' ' + transcript);
            };

            recognition.onend = () => {
                if (isListening) {
                    recognition.start();
                }
            };

            recognitionRef.current = recognition;
        } else {
            alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
        }
    }, [isListening]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSave = () => {
        if (note.trim()) {
            // Récupérer les anciennes notes du localStorage
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

            // Ajouter la nouvelle note
            const updatedNotes = [...existingNotes, {
                id: Date.now(),
                content: note.trim(),
                createdAt: new Date().toISOString()
            }];

            // Enregistrer dans le localStorage
            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            // Vider le champ et rediriger
            setNote('');
            navigate('/'); // Redirection vers l'accueil
        } else {
            alert('Aucune note à sauvegarder.');
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const img = canvas.toDataURL();
        setPaths(prev => [...prev, img]);
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const undo = () => {
        if (paths.length === 0) return;
        const newPaths = [...paths];
        const last = newPaths.pop();
        setRedoStack([...redoStack, last]);
        redraw(newPaths);
        setPaths(newPaths);
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const last = redoStack.pop();
        const img = new Image();
        img.src = last;
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        setPaths(prev => [...prev, last]);
    };

    const redraw = (paths) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (paths.length > 0) {
            const img = new Image();
            img.src = paths[paths.length - 1];
            img.onload = () => ctx.drawImage(img, 0, 0);
        }
    };

    const handleOCR = async () => {
        const canvas = canvasRef.current;
        const imageDataUrl = canvas.toDataURL();

        const { data: { text } } = await Tesseract.recognize(
            imageDataUrl,
            'fra',
            { logger: m => console.log(m) }
        );

        if (text.trim()) {
            setNote(prev => prev + '\n' + text);
            alert('Texte extrait du dessin !');
        } else {
            alert('Aucun texte détecté.');
        }
    };

    return (
        <div className={`editor-wrapper ${isListening ? 'recording' : ''}`}>
            <header className="editor-header">
                <h1>📝 Mon Éditeur</h1>
                <div className="editor-actions">
                    <button className="icon-btn" onClick={toggleListening} title="Activer la dictée vocale">
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <button className="icon-btn" onClick={() => setShowDrawing(!showDrawing)} title="Mode dessin">
                        <Pencil size={20} />
                    </button>
                    <button className="icon-btn" onClick={handleSave} title="Sauvegarder la note">
                        <Save size={20} />
                    </button>
                </div>
            </header>

            <div className={`editor-container ${showDrawing ? 'show-draw' : 'show-note'}`}>
                <div className="note-panel">
                    <textarea
                        className="note-editor"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Saisissez vos notes ici ou dictez-les..."
                    />
                </div>

                {showDrawing && (
                    <div className="draw-panel">
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={400}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                        />
                        <div className="draw-tools">
                            <button onClick={clearCanvas} title="Effacer tout"><Eraser size={16} /></button>
                            <button onClick={undo} title="Annuler"><Undo2 size={16} /></button>
                            <button onClick={redo} title="Rétablir"><Redo2 size={16} /></button>
                            <button onClick={handleOCR} title="Reconnaître texte"><ScanText size={16} /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
