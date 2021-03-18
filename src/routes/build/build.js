import { React, useContext, useEffect } from "react";
import { Row, Col, Button } from 'antd';
import FieldGroup from '../../components/field-group/field-group'
import Sidebar from '../../components/sidebar/sidebar'
import Chart from '../../components/chart/chart'
import { Context } from '../../components/store'
import { authEndpoint, clientId, redirectUri, scopes } from '../../utility/constants'
import { getHash } from '../../utility/'
import { getProfileName } from '../../api/spotify'
const Build = () => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    let hash = getHash();
    if (hash.access_token) {
      dispatch({type: 'ADD_TOKEN', payload: hash.access_token});
      window.location.hash = '';
      fetch(' https://api.spotify.com/v1/me', { headers:
        {
          Authorization: `Bearer ${hash.access_token}`
        }
      })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
    }
    
  }, [])
  return (
    <div>
      <h1>Build your playlist</h1>
      {!state.token && (
        (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
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
        <Button type="primary" disabled={ state.miles.length === 0 ? 'true' : false}>Generate Playlist</Button>
      </div>
    </div>
  );
}

export default Build