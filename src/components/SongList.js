import React from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {
    renderList() {
        return this.props.songs.map((song) => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button className="ui button primary" onClick={()=>this.props.selectSong(song)}>Select</button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

// function that runs always, when data in store has changed
// and it returns updated props for component
const mapStateToProps = (state) => {
    return { songs: state.songs };
    // this.props = {songs : state.songs}
};


// (mapStateToProps, {selectSong : selectSong})
// same with
// (mapStateToProps, {selectSong})
// it is ES2015 syntax
export default connect(mapStateToProps, { selectSong })(SongList);