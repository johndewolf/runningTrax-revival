import { React, useContext } from "react";
import { Row, Col, Button } from 'antd';
import FieldGroup from '../../components/field-group/field-group'
import Sidebar from '../../components/sidebar/sidebar'
import Chart from '../../components/chart/chart'
import { Context } from '../../components/store'
const Build = () => {
  const [state] = useContext(Context);
  return (
    <div>
      <h1>Build your playlist</h1>
      <Row gutter={16}>
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