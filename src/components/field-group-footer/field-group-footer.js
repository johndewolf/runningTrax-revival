import { CopyOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import './field-group-footer.css';

const FieldGroupFooter = (props) => {
  return(
      <div className="field-group-footer">
        <CopyOutlined onClick={props.onCopyClick} />
        <UndoOutlined onClick={props.onUndoClick} />
        <DeleteOutlined onClick={props.onDeleteClick} />
      </div>
  )
}
export default FieldGroupFooter;