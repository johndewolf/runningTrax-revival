import { updateEditingSet } from '../../reducers/sets'
import { useSelector, useDispatch } from 'react-redux'
import { Timeline } from 'antd';

import './sidebar.css'
const SideBar = () => {
  const sets = useSelector(state => state.sets.list)
  const editingSet = useSelector(state => state.sets.editingSet)
  const dispatch = useDispatch();
  const handleMileClick = (el) => {
    el.stopPropagation();
    let set = el.target.parentElement.parentElement.dataset.index;
    if (set) {
      set = Number(set);
      dispatch(updateEditingSet(set))
    }
  }

  return(
    <div className={sets.length ? 'shadow-transition shadow-transition-in' : 'shadow-transition'}>
      <Timeline>
        {sets.map((mile, index) => (
          <div onClick={handleMileClick} key={`mile-${index}`} data-index={index}>
            <Timeline.Item color={index === editingSet ? 'blue' : 'green'}>{index + 1}</Timeline.Item>
          </div>
        ))}
      </Timeline>
    </div>
  )
}
export default SideBar;