import {useState, useEffect, useContext} from 'react';
import { Form, Select, InputNumber, Slider, Button } from 'antd';
import { Context } from '../store'
import { addSet } from '../../reducers/sets'
import { useSelector, useDispatch } from 'react-redux'
import { formatMinutes, formatSeconds } from '../../utility'
import { getGenreSeeds } from '../../api/spotify'
import FieldGroupFooter from '../field-group-footer/field-group-footer'
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
    if (state.editingMile >= state.miles.length) {
      console.log('reseting fields');
      form.resetFields();
      setValidity(false);
    }
    else if (typeof state.miles[state.editingMile] != 'undefined') {
      form.setFieldsValue({
        genre: mile.genre,
        tempo: mile.tempo,
        minutes: formatMinutes(mile.duration),
        seconds: formatSeconds(mile.duration)
      })
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
  const handleCopyClick = () => {
    console.log('firing copy');
    let seconds = form.getFieldValue('seconds') ? form.getFieldValue('seconds') : 0;
    let durationInSeconds = (form.getFieldValue('minutes') * 60) + seconds;
    dispatch({type: 'ADD_MILE', payload: {genre: form.getFieldValue('genre'), tempo: form.getFieldValue('tempo'), duration: durationInSeconds}});
  }

  const handleDeleteClick = () => {
    console.log('firing delete');
    dispatch({type: 'DELETE_MILE', payload: state.editingMile});
  }

  return(
    <Form className="field-group dropshadow bg-white" form={form} >

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
        <Form.Item name="minutes" label="Minutes">
            <InputNumber
            min={4}
            max={59}
            onChange={checkIfValid}
          />
        </Form.Item>
        <Form.Item name="seconds" label="Seconds">
          <InputNumber
            min={0}
            max={59}

            formatter={(value) => {
              if (!value) {
                return ``
              }
              if (value < 10) {
                return `0${value}`
              }
              return value;
            }}
            onChange={checkIfValid}
          />
        </Form.Item>
      </div>
      <legend>Tempo</legend>
      <Form.Item className="field-group-input" name="tempo" >
        <Slider min={120} max={220} onAfterChange={checkIfValid} />
      </Form.Item>
      <Button disabled={valid ? false : true} onClick={handleAddMile}>{state.editingMile < state.miles.length ? "Update" : "Add"} Set</Button>
      {state.editingMile < state.miles.length &&
        <FieldGroupFooter onCopyClick={handleCopyClick} onDeleteClick={handleDeleteClick} />
      }
    </Form>
  )
}
export default FieldGroup;