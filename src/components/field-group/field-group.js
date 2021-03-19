import {useState, useEffect, useContext} from 'react';
import { Form, Select, InputNumber, Slider, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Context } from '../store'
import { formatMinutes, formatSeconds } from '../../utility'
import { getGenreSeeds } from '../../api/spotify'
import './field-group.css';
const { Option } = Select;

const FieldGroup = () => {
  const [state, dispatch] = useContext(Context);
  const [form] = Form.useForm();
  const [valid, setValidity] = useState(false);
  const [genres, setGenres] = useState(['rock', 'rap', 'jazz'])
  const checkIfValid = () => {
    //redo this;
    if (
      form.getFieldValue('genre') &&
      form.getFieldValue('tempo') &&
      form.getFieldValue('minutes')
    ) {
      setValidity(true);
    }
  }
  const mile = state.miles[state.editingMile]
  useEffect(() => {
    if (typeof state.miles[state.editingMile] != 'undefined') {
      form.setFieldsValue({
        genre: mile.genre,
        tempo: mile.tempo,
        minutes: formatMinutes(mile.duration),
        seconds: formatSeconds(mile.duration)
      })
      setValidity(true);
    }
    
  }, [state.editingMile, state.miles])
  useEffect(() => {
    if (state.token) {
      getGenreSeeds(state.token)
        .then(result => setGenres(result.data.genres))
        .catch(error => console.log(error))
    }
  }, [state.token])
  const handleAddMile = () => {
    let seconds = form.getFieldValue('seconds') ? form.getFieldValue('seconds') : 0;
    let durationInSeconds = (form.getFieldValue('minutes') * 60) + seconds;

    if (state.editingMile <= state.miles.length) {
      dispatch({type: 'UPDATE_MILE', payload: {index: state.editingMile, values : {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: durationInSeconds}}});
      
    }
    else {
      dispatch({type: 'ADD_MILE', payload: {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: durationInSeconds}});
    }
    dispatch({type: 'UPDATE_CURRENT_MILE', payload: state.miles.length });
    setValidity(false);
    form.resetFields();
  }

  const handleCancelClick = () => {
    dispatch({type: 'UPDATE_CURRENT_MILE', payload: state.miles.length });
    setValidity(false);
    form.resetFields();
  }

  return(
    <Form className="field-group" form={form} >

      <legend>Genre</legend>
      <Form.Item className="field-group-input" name="genre">
        <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Pick a genre"
        optionFilterProp="children"
        onChange={checkIfValid}
        >
          {genres.map(genre => (<Option key={genre} value={genre}>{genre}</Option>  ))}
        </Select>
      </Form.Item>
      <div className="field-group-input time-input">
        <legend>Duration</legend>
        <Form.Item name="minutes">
            <InputNumber
            initialvalues={8}
            min={4}
            max={59}
            formatter={value => `${value} min`}
            parser={value => value.replace(' %', '')}
          />
        </Form.Item>
        <Form.Item name="seconds">
          <InputNumber
            initialvalues={0}
            min={0}
            max={59}
            formatter={value => {
                if (value < 10) {
                  return `0${value} sec`;
                }
                return `${value} sec`;
            }}
            parser={value => value.replace(' %', '')}
          />
        </Form.Item>
      </div>
      <legend>Tempo</legend>
      <Form.Item className="field-group-input" name="tempo" >
        <Slider min={120} max={220} onAfterChange={checkIfValid} />
      </Form.Item>
      <Button disabled={valid ? false : true} onClick={handleAddMile}>{state.editingMile < state.miles.length ? "Update" : "Add"} Mile <PlusCircleOutlined /></Button>
      {state.editingMile < state.miles.length ? <Button type="text" onClick={handleCancelClick}>Cancel</Button> : null}
    </Form>
  )
}
export default FieldGroup;