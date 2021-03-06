import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.id = uuid();
  newLane.notes = [];

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    const notesIds = lane.notes.map(note => note.id);

    Note.remove({ id: { $in: notesIds } }, (err) => {
      lane.remove(() => {
        res.status(200).end();
      });
    });
  });
}

export function editLane(req, res) {
  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: req.body.name }, (err, lane) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).end();
  });
}
