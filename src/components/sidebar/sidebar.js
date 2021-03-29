import { useContext } from 'react'
import { Button } from 'antd'
import { Context } from '../store'
import { formatTimeString } from '../../utility'
import { Timeline } from 'antd';

import './sidebar.css'
const SideBar = () => {

  const [state, dispatch] = useContext(Context);
  const handleMileClick = (el) => {
    el.stopPropagation();
    console.log(el.target);
    let mile = el.target.parentElement.parentElement.dataset.index;
    if (mile) {
      mile = Number(mile);
      dispatch({type: 'UPDATE_CURRENT_MILE', payload: mile});
    }
    
  }

  return(
    <div className={state.miles.length ? 'shadow-transition shadow-transition-in' : 'shadow-transition'}>
      <Timeline>
        {state.miles.map((mile, index) => (
          <div onClick={handleMileClick} key={`mile-${index}`} data-index={index}>
            <Timeline.Item color={index === state.editingMile ? 'blue' : 'green'}>{index + 1}</Timeline.Item>
          </div>
        ))}
      </Timeline>
    </div>
  )
}
export default SideBar;