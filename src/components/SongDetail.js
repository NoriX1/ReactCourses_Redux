import React from 'react'
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
    if (!song) {
        return <div>Select a song</div>
    }
    return (
        <div>
            <h3>Details for: </h3>
            <div>Title: {song.title}</div>
            <div> Duration: {song.duration}</div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);