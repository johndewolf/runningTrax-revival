import { React, useContext, useEffect } from "react";
import { Row, Col, Button, Modal, message } from 'antd';
import Sidebar from '../../components/sidebar/sidebar'
import { Context } from '../../components/store'
import { getPlaylistData } from '../../api/spotify'
import { formatTimeString, formatArtistName } from '../../utility/index'
const Build = () => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    if (state.miles.length === 0) {
      message.error('No data to build playlist!');
    }
    else {
      getPlaylistData(state.token, state.miles)
        .then((data) => {
          dispatch({
            type: 'ADD_PLAYLIST',
            payload: data 
          })
        })
    }
  }, [])

  return (

    <div>
      <h1>Your Playlist</h1>

      <Row gutter={24}>
        <Col xs={24} md={8}>
        </Col>
        <Col xs={24} md={12}>
          {state.playlist.length > 0 &&
            state.playlist.map((mileGroup, mileIndex) => {
              return (
              <div key={`result-mile-${mileIndex}`}>
                <div>{state.miles[mileIndex].genre} - {state.miles[mileIndex].tempo} - {formatTimeString(state.miles[mileIndex].duration)}</div>
                {mileGroup.map((track, trackIndex) => {
                  return (
                    <div key={`tr-${track.id}`}>
                      {trackIndex + 1}. {formatArtistName(track.artists)} - {track.name} {formatTimeString(track.duration_ms / 1000)}
                    </div>
                  )
                })}
              </div>
              )
            })
          
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

export default Build