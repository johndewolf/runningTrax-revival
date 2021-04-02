import { Table } from 'antd'
import { formatArtistName } from '../../utility/index';

const Playlist = ({playlist}) => {
  let playlistData = [];
  playlist.forEach((setGroup, setIndex) => {
    setGroup.forEach((track, trackIndex) => {
      playlistData.push({
        name: track.name,
        artists: formatArtistName(track.artists),
        set: setIndex + 1
      })
    })
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Artists',
      dataIndex: 'artists',
      key: 'artists',
    },
    {
      title: 'Set',
      dataIndex: 'set',
      key: 'set',
    },
  ];
  return(
    <Table dataSource={playlistData} columns={columns} pagination={false} scroll={{y: 500}}/>
  )
}
export default Playlist;