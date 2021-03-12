import React from "react";
import { Row, Col } from 'antd';
import FieldGroup from '../../components/field-group/field-group'
import Sidebar from '../../components/sidebar/sidebar'
function Build() {
  return (
    <div>
      <h1>Build your playlist</h1>
      <Row>
        <Col xs={24} md={4}>
          <h3>Miles</h3>
          <Sidebar />
        </Col>
        <Col xs={24} md={8}>
          <h3>Add a Mile</h3>
          <FieldGroup />
        </Col>
        <Col xs={24} md={12}>
          Graph goes here
        </Col>
      </Row>
    </div>
  );
}

export default Build