import {useContext} from 'react'
import {Context} from '../store'

const SideBar = () => {
  const [state, dispatch] = useContext(Context);
  console.log(state)
  return(
    <ul>
      {state.miles.map((mile, index) => (
        <li key={index}>{mile.genre} - {mile.tempo} - {mile.duration}</li>
      ))}
    </ul>
  )
}
export default SideBar;