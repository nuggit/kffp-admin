import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import ConfirmationDialog from '../feedback/confirm';
import Search from '../search';
import SearchResults from '../search/searchResults';
import SongList from './songList';
import PlaylistTitleForm from './playlistTitle';
import {
    updatePlaylistDate,
    deletePlaylist
} from '../../actions/playlistActions';
import { confirmOpen } from '../../actions/feedbackActions';

moment.tz.setDefault('America/Los_Angeles');

const mapStateToProps = state => ({
    auth: state.auth,
    search: state.search,
    show: state.show,
    playlist: state.playlist,
    nowPlaying: state.nowPlaying,
    feedback: state.feedback
});

const shouldShowCurrentPlaylist = obj => (obj ? Object.keys(obj).length > 1 : false);

const handleDateChange = (u, { date, playlistId }, dispatch) =>
    dispatch(updatePlaylistDate(date, playlistId));

const PlaylistForm = (props) => {
    const { playlist, show, search, nowPlaying, dispatch, feedback, auth } = props;
    const { currentPlaylist } = playlist;
    const { searchResults, currentSearch } = search;
    const { currentShow: { slug = '' } } = show;
    const { scope } = auth.user;

    if (shouldShowCurrentPlaylist(currentPlaylist)) {
        const { playlistDate, playlistId, playlistTitle } = currentPlaylist;
        const dateObj = moment(playlistDate);
        const formattedDate = dateObj.format('MMMM Do, YYYY');

        return (
            <div className="playlist-wrapper row">
                <DatePicker
                    className="col col-md-12 flex-horizontal-center date-input"
                    id="playlist-date"
                    value={dateObj.toDate()}
                    formatDate={() => formattedDate}
                    onChange={(u, date) => handleDateChange(u, { date, playlistId }, dispatch)}
                />

                <div className="col col-md-12 flex-horizontal-center">
                    <PlaylistTitleForm
                        dispatch={dispatch}
                        playlistId={playlistId}
                        playlistTitle={playlistTitle}
                    />
                </div>
                <Search />

                {!!searchResults.length &&
                    <SearchResults
                        searchResults={searchResults}
                        playlistId={currentPlaylist.playlistId}
                        dispatch={dispatch}
                    />
                }

                {!searchResults.length &&
                    <SongList
                        currentPlaylist={currentPlaylist}
                        currentSearch={currentSearch}
                        nowPlaying={nowPlaying}
                        dispatch={dispatch}
                    />
                }

                {scope === 'admin' &&
                    <div className="col col-md-12 flex-horizontal-center">
                        <RaisedButton
                            label="Delete Playlist"
                            labelColor="white"
                            backgroundColor="red"
                            onClick={() => dispatch(confirmOpen(true, null))}
                        />
                    </div>
                }
                <ConfirmationDialog
                    title="Are you sure you want to delete this Playlist?"
                    open={feedback.confirmDialog.open}
                    cancelHandler={() => dispatch(confirmOpen(false, null))}
                    okHandler={() => dispatch(deletePlaylist(playlistId, slug))}
                />
            </div>
        );
    }

    return (
        <div className="col col-md-12 flex-horizontal-center">
            <h2 className="h2">No Currently Selected Playlist</h2>
        </div>
    );
};

PlaylistForm.propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    playlist: PropTypes.object,
    search: PropTypes.object,
    show: PropTypes.object,
    nowPlaying: PropTypes.object,
    feedback: PropTypes.object
};

export default connect(mapStateToProps)(PlaylistForm);
