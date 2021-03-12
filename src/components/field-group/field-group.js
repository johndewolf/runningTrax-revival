import {useState, useContext} from 'react';
import { Form, Select, TimePicker, Slider, Button } from 'antd';
import {Context} from '../store'
import './field-group.css';
const { Option } = Select;

const FieldGroup = () => {
  const [state, dispatch] = useContext(Context);
  const [form] = Form.useForm();
  const tempoDefault = 122;
  const [valid, setValidity] = useState(false);
  
  const checkIfValid = () => {
    console.log('genre', form.getFieldValue('genre'));
    console.log('tempo', form.getFieldValue('tempo'));
    console.log('duration', form.getFieldValue('duration'));
    if (form.getFieldValue('genre') !== '' && form.getFieldValue('tempo') !== '' && form.getFieldValue('duration') !== '') {
      setValidity(true);
    }
  }
  const handleAddMile = () => {
    let val = form.getFieldValue('duration');
    let seconds = (val.minutes() * 60) + val.seconds();
    dispatch({type: 'ADD_MILE', payload: {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: seconds}});
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
        <Slider defaultValue={tempoDefault} min={120} max={220} onChange={checkIfValid} />
      </Form.Item>

      <Button disabled={valid ? false : true} onClick={handleAddMile}>Add Mile</Button>
    </Form>
  )
}
export default FieldGroup;