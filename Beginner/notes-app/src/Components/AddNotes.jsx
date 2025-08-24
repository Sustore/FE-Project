import React, { useEffect, useState } from 'react';
import { faEdit, faNoteSticky, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddNotes = () => {
    const [noteStatus, setNoteStatus] = useState(false);
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(()=>{
        if(notes.length===0 && note.length===0){
            setNoteStatus(false);
        }
    },[notes])

    const AddNote = () => {
        const input = note.trim();
        if (input.length > 0) {
            setNotes([...notes, input]);
            setNote("");
        }
    };

    const EditSelectedNote = () => {
        const input = note.trim();
        if (input.length > 0) {
            if (notes.length > 0) {
                const updatedNotes = notes.map((item, index) => {
                    if (index === editIndex) {
                        return input;
                    }
                    return item;
                });
                setNotes(updatedNotes);
            }
            else {
                setNotes([input]);
            }
            setNote("");
        }
        setEditMode(false);
        setEditIndex(null);
    };

    const renderAllNotes = () => {
        console.log("Z=RENDER TRIGGERED");
    }

    const deleteNote = (event) => {
        const id = event.currentTarget.id;
        const updatedNotes = notes.filter((_, index) => index !== parseInt(id));
        setNotes(updatedNotes);
    }

    const editNote = (event) => {
        const id = event.currentTarget.id;
        const editNotes = notes.find((_, index) => index === parseInt(id));
        setNote(editNotes);
        setEditMode(true);
        setEditIndex(parseInt(id));
    }

    return (
        <>
            {
                noteStatus ?
                    <>
                        <div className='write-notes'>
                            <input placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
                            <button 
                            className='add-note-btn'
                            onClick={!editMode ? AddNote : EditSelectedNote} 
                            disabled={note?.trim()?.length > 0 ? false : true}>
                               {!editMode ? 'Add Note' :  'Edit Note'}
                            </button>
                            {
                                notes?.map((note, index) => (
                                    <div key={index} className="note-item">
                                        <div className="note-pointer">
                                            <FontAwesomeIcon icon={faSquareCheck} style={{color: "black"}} />
                                        </div>
                                        <div className="note-context">
                                            <h4 className="note-text">{note}</h4>
                                        </div>
                                        <div className="note-actions">
                                            <button className='delete-note-btn' onClick={deleteNote} id={index}>
                                                <span className='tooltip-container'>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    <span className="tooltip-text action">Delete Note</span>
                                                </span>
                                            </button>
                                            <button className='edit-note-btn' onClick={editNote} id={index}>
                                                <span className='tooltip-container'>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <span className="tooltip-text action">Edit Note</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )
                                )}
                        </div>
                    </>
                    :
                    <div 
                    className="add-notes tooltip-container"
                    data-tooltip="Add Notes"
                    onClick={() => setNoteStatus(true)}>
                          <FontAwesomeIcon icon={faNoteSticky} style={{color: "#63E6BE",}} size="2xl" />
                          <span className="tooltip-text">Add Notes</span>
                    </div>
                    
            }
        </>

    )
}

export default AddNotes;