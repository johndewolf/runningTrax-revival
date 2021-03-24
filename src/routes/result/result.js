import { React, useContext, useEffect } from "react";
import { Row, Col, Button, Modal, message } from 'antd';
import Sidebar from '../../components/sidebar/sidebar'
import { Context } from '../../components/store'
import { getPlaylistData } from '../../api/spotify'
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
        <Col xs={24} md={4}>
          <h3>Miles</h3>
          <Sidebar />
        </Col>
        <Col xs={24} md={8}>
        </Col>
        <Col xs={24} md={12}>
        </Col>
      </Row>
    </div>
  );
}

export default Build