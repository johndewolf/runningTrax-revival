import { useContext } from 'react';
import { CopyOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Context } from '../store'
import './field-group-footer.css';

const FieldGroupFooter = (props) => {
  const [state, dispatch] = useContext(Context);
  const handleUndoClick = () => {
    dispatch({type: 'UPDATE_CURRENT_MILE', payload: state.miles.length });
  }
  return(
      <div className="field-group-footer">
        <CopyOutlined onClick={props.onCopyClick} />
        <UndoOutlined onClick={handleUndoClick} />
        <DeleteOutlined onClick={props.onDeleteClick} />
      </div>
  )
}
export default FieldGroupFooter;