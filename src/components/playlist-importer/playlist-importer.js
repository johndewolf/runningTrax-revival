
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { createPlaylist, addTracksToPlaylist } from '../../api/spotify'

import { Form, Input, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

const PlaylistImporter = () => {
  const playlist = useSelector(state => state.playlist.playlist)
  const userId = useSelector(state => state.profile.user_id)
  const token = useSelector(state => state.profile.token)
  const [imported, updateImported] = useState(false)
  const [playlistDetails, updatePlaylistDetails] = useState({name: '', url: ''})
  const [isImporting, updateIsImporting] = useState(false)
  const [form] = Form.useForm();
  let playlistInfo = {};
  async function handleFinish(e) {
    updateIsImporting(true);
    try {
      const playlistData = await createPlaylist(token, userId, e.title, e.description);
      const uris = playlist.flat().map((track) => track.uri)
      await addTracksToPlaylist(token, playlistData.data.id, uris);
      updateIsImporting(false);
      updateImported(true);
      updatePlaylistDetails({name: playlistData.data.name, url: playlistData.data.external_urls.spotify})
      playlistInfo = {...playlistData};
      console.log(playlistInfo);
    }
    catch (err) {
      console.log(err);
    }

  }
  return (
    <div>
      {!imported ? 
        <Form form={form} onFinish={handleFinish}>
          {!isImporting ? 
          <>
            <Form.Item className="field-group-input" name="title">
              <Input placeholder="Title"></Input>
            </Form.Item>
            <Form.Item className="field-group-input" name="description">
              <Input.TextArea placeholder="Description"></Input.TextArea>
            </Form.Item>
            <Button type="primary" icon={<ImportOutlined />} htmlType="submit">
              Get It!
            </Button>
          </>  
          : 
          <div>Importing!</div>

          }

        </Form>
        :
        <div><b>{playlistDetails.name}</b> successfully imported into {userId}'s account. <a href={playlistDetails.url} rel="noreferrer" target="_blank">Check it out</a>!</div>    
      }

    </div>
  );
}
export default PlaylistImporter