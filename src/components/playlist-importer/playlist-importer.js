
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createPlaylist } from '../../api/spotify'

import { Form, Input, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

const PlaylistImporter = () => {
  const playlist = useSelector(state => state.playlist.playlist)
  const userId = useSelector(state => state.profile.user_id)
  const token = useSelector(state => state.profile.token)
  const [form] = Form.useForm();

  useEffect(() => {

  }, [])
  function handleFinish(e) {
    createPlaylist(token, userId, e.title, e.description)
      .then((data) => console.log(data));
  }

  return (
    <div>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item className="field-group-input" name="title">
          <Input placeholder="Title"></Input>
        </Form.Item>
        <Form.Item className="field-group-input" name="description">
          <Input.TextArea placeholder="Description"></Input.TextArea>
        </Form.Item>
        <Button type="primary" icon={<ImportOutlined />} htmlType="submit">
          Get It!
        </Button>
      </Form>
    </div>
  );
}
export default PlaylistImporter