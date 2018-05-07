import React, { PropTypes } from "react";
import Note from "./Note";
import styles from "./Notes.css";
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote }) => {
  return (
    <ul className="notes">
      {notes.map(note => (
        <Note id={note.id} key={note.id} editing={note.editing}>
          <Edit
            editing={note.editing}
            value={note.task}
            onValueClick={() => editNote(note.id)}
            onUpdate={task =>
              updateNote({
                ...note,
                task,
                editing: false
              })
            }
            onDelete={() => deleteNote(note.id, laneId)}
          />
        </Note>
      ))}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  updateNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default Notes;
