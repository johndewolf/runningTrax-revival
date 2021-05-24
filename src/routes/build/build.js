import { React, useEffect } from "react";
import { Row, Col, Button, Modal } from 'antd';
import {
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import FieldGroup from '../../components/field-group/field-group'
import Sidebar from '../../components/sidebar/sidebar'
import Chart from '../../components/chart/chart'
import PresetSelector from "../../components/preset-selector/preset-selector";
import { updateToken } from '../../reducers/profile'
import { authEndpoint, clientId, redirectUri, scopes } from '../../utility/constants'
import { getHash } from '../../utility/'

const Build = () => {
  const token = useSelector(state => state.profile.token)
  const sets = useSelector(state => state.sets.list)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (window.localStorage.getItem('spotify_token') && !token) {
      try {
        dispatch(updateToken( window.localStorage.getItem('spotify_token') ))
      }
      catch {
        window.localStorage.removeItem('spotify_token')
      }
      
    }
    let hash = getHash();
    if (hash.access_token) {
      window.localStorage.setItem('spotify_token', hash.access_token);
      dispatch(updateToken( hash.access_token ))
      window.location.hash = '';
    }
    
  }, [token, dispatch]);

  const handleOkClick = () => {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  }

  const history = useHistory();
  return (
    <div>
      {!token && (
        (
          <Modal 
          visible={true}
          title="Login to Continue"
          onCancel={()=>history.push("/")}
          maskClosable={false}
          closable={false}
          okText="Login"
          onOk={handleOkClick}
        >
          <p>In order to continue, login with your Spotify account.</p>
        </Modal>
        )
      )}
      <Row  gutter={ 32 }>
        <Col xs={24} lg={12}>
          <h1>Build a Playlist</h1>
        </Col>
        <Col xs={24} lg={12}>
          <PresetSelector />
        </Col>
      </Row>
      
      <Row gutter={ 32 }>
        <Col xs={24} lg={8}>
          <FieldGroup />
          <div style={{marginTop: '2rem'}}>
            <Button onClick={() => {history.push("/result")}} type="primary" disabled={ sets.length === 0 ? true : false}>Generate Playlist</Button>
          </div>
        </Col>
        <Col xs={24} lg={13}>
          <Chart />
        </Col>
        <Col xs={24} lg={3}>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
}

export default Build