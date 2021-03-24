import { React, useContext, useEffect } from "react";
import { Row, Col, Button, Modal } from 'antd';
import {
  useHistory
} from "react-router-dom";
import FieldGroup from '../../components/field-group/field-group'
import Sidebar from '../../components/sidebar/sidebar'
import Chart from '../../components/chart/chart'
import { Context } from '../../components/store'
import { authEndpoint, clientId, redirectUri, scopes } from '../../utility/constants'
import { getHash } from '../../utility/'
const Build = () => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    if (window.localStorage.getItem('spotify_token')) {
      dispatch({type: 'ADD_TOKEN', payload: window.localStorage.getItem('spotify_token')});
    }
    let hash = getHash();
    if (hash.access_token) {
      window.localStorage.setItem('spotify_token', hash.access_token);

      dispatch({type: 'ADD_TOKEN', payload: hash.access_token});
      window.location.hash = '';
    }
    
  }, [])
  const handleOkClick = () => {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  }
  const history = useHistory();
  return (

    <div>
      <h1>Build your playlist</h1>
      {!state.token && (
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
          <p>In order to continue, login with your Spotify account. Click the button below to continue</p>
        </Modal>
        )
      )}

      <Row gutter={24}>
        <Col xs={24} md={4}>
          <h3>Miles</h3>
          <Sidebar />
        </Col>
        <Col xs={24} md={8}>
          <h3>Add a Mile</h3>
          <FieldGroup />
        </Col>
        <Col xs={24} md={12}>
          <Chart />
        </Col>
      </Row>
      <div style={{marginTop: '3rem'}}>
        <Button onClick={() => {history.push("/result")}} type="primary" disabled={ state.miles.length === 0 ? 'true' : false}>Generate Playlist</Button>
      </div>
    </div>
  );
}

export default Build