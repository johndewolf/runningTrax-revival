import { Table } from 'antd'
import { formatArtistName } from '../../utility/index';

const Playlist = ({playlist}) => {
  let playlistData = [];
  if (playlist) {
    playlist.forEach((setGroup, setIndex) => {
      setGroup.forEach((track, trackIndex) => {
        playlistData.push({
          name: track.name,
          artists: formatArtistName(track.artists),
          set: setIndex + 1,
          duration: track.duration_ms
        })
      })
    })
  }
  
  const columns = [
    {
      title: 'Artists',
      dataIndex: 'artists',
      key: 'artists',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Set',
      dataIndex: 'set',
      key: 'set',

    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',

    },
  ];
  return(
    <Table dataSource={playlistData} columns={columns} pagination={false} scroll={{y: 500}}/>
  )
}
export default Playlist;