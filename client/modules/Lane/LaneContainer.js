import { connect } from 'react-redux';
import Lane from './Lane';
import { createNoteRequest } from '../Note/NoteActions';
import { createLaneRequest, fetchLanes } from './LaneActions';

const mapStateToProps = (state, ownProps) => {
    return {
        laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
    };
};

const mapDispatchToProps = {
    addNote: createNoteRequest,
    createLane: createLaneRequest,
    editLane,
    deleteLane,
    updateLane,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lane);
