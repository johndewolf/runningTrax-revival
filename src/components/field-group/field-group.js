import {useState, useEffect, useContext} from 'react';
import { Form, Select, TimePicker, Slider, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Context } from '../store'
import './field-group.css';
const { Option } = Select;

const FieldGroup = () => {
  const [state, dispatch] = useContext(Context);
  const [form] = Form.useForm();
  const [valid, setValidity] = useState(false);

  const checkIfValid = () => {
    if (form.getFieldValue('genre') !== '' && form.getFieldValue('tempo') !== '' && form.getFieldValue('duration') !== '') {
      setValidity(true);
    }
  }
  useEffect(() => {
    if (typeof state.miles[state.editingMile] != 'undefined') {
      form.setFieldsValue({genre: state.miles[state.editingMile].genre, tempo: state.miles[state.editingMile].tempo})
    }
    
  }, [state.editingMile, state.miles])

  const handleAddMile = () => {
    let val = form.getFieldValue('duration');
    let seconds = (val.minutes() * 60) + val.seconds();
    if (state.editingMile <= state.miles.length) {
      dispatch({type: 'UPDATE_MILE', payload: {index: state.editingMile, values : {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: seconds}}});
      
    }
    else {
      console.log('adding mile');
      dispatch({type: 'ADD_MILE', payload: {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: seconds}});
    }
    dispatch({type: 'UPDATE_CURRENT_MILE', payload: state.miles.length });
    setValidity(false);
    form.resetFields();
  }

  return(
    <Form className="field-group" form={form} >
      <Form.Item className="field-group-input" name="genre">
        <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Genre"
        optionFilterProp="children"
        onChange={checkIfValid}
        >
          <Option value="reggae">Reggae</Option>
          <Option value="Hip Hop">Hip Hop</Option>
          <Option value="Rock">Rock</Option>
        </Select>
      </Form.Item>
      <Form.Item className="field-group-input" name="duration">
        <TimePicker format='mm:ss' placeholder="Mile Duration" onChange={checkIfValid} />
      </Form.Item>
      <Form.Item className="field-group-input" name="tempo" label="Tempo" >
        <Slider initialValue={180} min={120} max={220} onAfterChange={checkIfValid} />
      </Form.Item>
      <Button disabled={valid ? false : true} onClick={handleAddMile}>Add Mile <PlusCircleOutlined /></Button>
    </Form>
  )
}
export default FieldGroup;