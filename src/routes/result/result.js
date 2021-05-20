import { React, useEffect } from "react";
import { Row, Col, message, Skeleton } from 'antd';
import Playlist from '../../components/playlist/playlist'
import PlaylistCover from '../../components/playlist-cover/playlist-cover'
import { fetchPlaylistData } from '../../reducers/playlist'
import { useSelector, useDispatch } from 'react-redux'

const Result = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.profile.token)
  const sets = useSelector(state => state.sets.list)
  const playlist = useSelector(state => state.playlist.playlist)
  const inProgress = useSelector(state => state.playlist.inProgress)
  useEffect(() => {
    if (sets.length === 0) {
      message.error('No data to build playlist!');
    }
    else {
      console.log('fetching playlist data');
      dispatch(fetchPlaylistData({sets: sets, token: token}))
    }
  }, [dispatch, sets, token])
  return (

    <div>
      <h1>Your Playlist</h1>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          {inProgress && 
            <Skeleton active />
          }
          {!inProgress && 
            <Playlist playlist={playlist} />
          }
        </Col>
        <Col xs={24} md={12}>
          {!inProgress && 
            <PlaylistCover />
          }
        </Col>
      </Row>
    </div>
  );
}

export default Result