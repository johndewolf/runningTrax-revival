import { useContext } from 'react'
import { Button } from 'antd'
import { Context } from '../store'

const SideBar = () => {

  const [state, dispatch] = useContext(Context);
  const handleMileClick = (el) => {
    let mile = Number(el.target.parentElement.value);
    dispatch({type: 'UPDATE_CURRENT_MILE', payload: mile});
  }
  return(
    <ul>
      {state.miles.map((mile, index) => (
        <li key={index}><Button type="text" onClick={handleMileClick} value={index}>{mile.genre} - {mile.tempo} - {mile.duration}</Button>
        </li>
      ))}
    </ul>
  )
}
export default SideBar;