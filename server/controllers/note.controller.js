import Note from '../models/note';
import uuid from 'uuid';
import Lane from '../models/lane';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    Lane.findOne({ id: req.body.laneId }).exec((err, lane) => {
      lane.notes = lane.notes.filter(item => req.params.noteId !== item.id);

      lane.save(err => {
        if (err) {
          res.status(500).send(err);
        }

        note.remove(() => {
          res.status(200).end();
        });
      });
    });
  });
}

export function editNote(req, res) {
  Note.findOneAndUpdate({ id: req.params.noteId }, { task: req.body.task }, (err, note) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).end();
  });
}
