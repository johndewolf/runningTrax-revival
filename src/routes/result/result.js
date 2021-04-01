import { React, useEffect } from "react";
import { Row, Col, message } from 'antd';
import Sidebar from '../../components/sidebar/sidebar'
import { fetchPlaylistData } from '../../reducers/playlist'
import { useSelector, useDispatch } from 'react-redux'

import { formatTimeString, formatArtistName } from '../../utility/index'
const Result = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.profile.token)
  const sets = useSelector(state => state.sets.list)
  const playlist = useSelector(state => state.playlist.playlist)
  useEffect(() => {
    if (sets.length === 0) {
      message.error('No data to build playlist!');
    }
    else {
      dispatch(fetchPlaylistData({sets: sets, token: token}))
    }
  }, [sets, token, dispatch])

  return (

    <div>
      <h1>Your Playlist</h1>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          {playlist.length > 0 && 
            playlist.map((setGroup, setIndex) => {
              return (
              <div>
              {setIndex + 1} - {sets[setIndex].genre} - {formatTimeString(sets[setIndex].duration)}
              <div style={{marginBottom: '1rem'}} key={`set-${setIndex}`}>
              {setGroup.map((track, trackIndex) => {
                return <div key={`track-${trackIndex}`}>{formatArtistName(track.artists)} - {track.name} - {formatTimeString(track.duration_ms / 1000)}</div>
              })}
              </div>
              </div> 
            )})
          }
        </Col>
        <Col xs={24} md={4}>
          <h3>Miles</h3>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
}

export default Result