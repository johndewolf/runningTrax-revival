import { useState } from 'react';
import { addSetsFromPreset } from '../../reducers/sets'
import { useDispatch } from 'react-redux'
import { Tag } from 'antd';
import { presets } from '../../utility/'
const PresetSelector = () => {
  const [selectedTag, updateSelectedTag] = useState('')
  const dispatch = useDispatch()
  const { CheckableTag } = Tag;
  
  function handleChange(tag, checked) {
    if (checked) {
      updateSelectedTag(tag)
      dispatch(addSetsFromPreset(presets[tag]))
    }
  }

  return(
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{fontSize: '14px', marginRight: '14px'}}>Preset Playlists:</div>
      {
        Array.from(Object.keys(presets).map(preset => {
          return (
            <CheckableTag
            key={preset}
            checked={selectedTag === preset ? true : false}
            onChange={checked => handleChange(preset, checked)}
            >
              {preset}
            </CheckableTag>
          )
        }))
      }

    </div>
  )
}
export default PresetSelector;