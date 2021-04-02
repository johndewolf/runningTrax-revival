import {useState, useEffect} from 'react';
import { Form, Select, InputNumber, Slider, Button } from 'antd';
import { addSet, updateSet, deleteSet, updateEditingSet } from '../../reducers/sets'
import { useSelector, useDispatch } from 'react-redux'
import { formatMinutes, formatSeconds } from '../../utility'
import { getGenreSeeds } from '../../api/spotify'
import FieldGroupFooter from '../field-group-footer/field-group-footer'
import './field-group.css';
const { Option } = Select;

const FieldGroup = () => {
  const token = useSelector(state => state.profile.token)
  const sets = useSelector(state => state.sets.list)
  const editingSet = useSelector(state => state.sets.editingSet)
  const [form] = Form.useForm();
  const [valid, setValidity] = useState(false);
  const dispatch = useDispatch()
  const [genres, setGenres] = useState(['rock', 'rap', 'jazz'])
  
  const checkIfValid = () => {
    if (
      form.getFieldValue('genre') &&
      form.getFieldValue('tempo') &&
      form.getFieldValue('minutes')
    ) {
      setValidity(true);
    }
  }
  
  useEffect(() => {
    if (editingSet >= sets.length) {
      form.resetFields();
      setValidity(false);
    }
    else if (typeof sets[editingSet] != 'undefined') {
      const set = sets[editingSet]
      form.setFieldsValue({
        genre: set.genre,
        tempo: set.tempo,
        minutes: formatMinutes(set.duration),
        seconds: formatSeconds(set.duration)
      })
    }
  }, [editingSet, sets, form])

  useEffect(() => {
    if (token) {
      getGenreSeeds(token)
        .then(result => setGenres(result.data.genres))
        .catch(error => console.log(error))
    }
  }, [token])

  const handleAddMile = () => {
    let seconds = form.getFieldValue('seconds') ? form.getFieldValue('seconds') : 0;
    let durationInSeconds = (form.getFieldValue('minutes') * 60) + seconds;

    if (editingSet <= sets.length) {
      dispatch(updateSet(
        {
          index: editingSet,
          fieldValues: {
            genre: form.getFieldValue('genre'),
            tempo: form.getFieldValue('tempo'),
            duration: durationInSeconds,
            editing: false
          },
          
        }
      ))
    }
    else {
      dispatch(addSet(
        {
          genre: form.getFieldValue('genre'),
          tempo: form.getFieldValue('tempo'),
          duration: durationInSeconds,
          editing: false
        }
      ))
    }

    setValidity(false);
    form.resetFields();
  }
  const handleCopyClick = () => {
    let seconds = form.getFieldValue('seconds') ? form.getFieldValue('seconds') : 0;
    let durationInSeconds = (form.getFieldValue('minutes') * 60) + seconds;
    dispatch(addSet(
      {
        genre: form.getFieldValue('genre'),
        tempo: form.getFieldValue('tempo'),
        duration: durationInSeconds,
        editing: false
      }
    ))
  }
  const handleUndoClick = () => {
    dispatch(updateEditingSet(sets.length));
  }

  const handleDeleteClick = () => {
    dispatch(deleteSet(editingSet));
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
      <Button disabled={valid ? false : true} onClick={handleAddMile}>{editingSet < sets.length ? "Update" : "Add"} Set</Button>
      {editingSet < sets.length &&
        <FieldGroupFooter onCopyClick={handleCopyClick} onDeleteClick={handleDeleteClick} onUndoClick={handleUndoClick} />
      }
    </Form>
  )
}
export default FieldGroup;