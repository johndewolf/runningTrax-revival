import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { formatArtistName, formatTimeString } from '../../utility/index';

const Playlist = ({playlist}) => {
  const inProgress = useSelector(state => state.playlist.inProgress)
  let playlistData = [];
  if (playlist) {
    playlist.forEach((setGroup, setIndex) => {
      setGroup.forEach((track) => {
        playlistData.push({
          name: track.name,
          artists: formatArtistName(track.artists),
          set: setIndex + 1,
          duration: formatTimeString(track.duration_ms / 1000),
          tracksInRow: setGroup.length,
          key: track.id
        })
      })
    })
  }
  const columns = [
    {
      title: 'Set',
      dataIndex: 'set',
      key: 'set',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        }
        if (index === 0 || playlistData[index].set !== playlistData[index - 1].set ) {
          obj.props.rowSpan = row.tracksInRow
        }
        
        else {
          obj.props.rowSpan = 0;
        }
        
        return obj;
      },
    },
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
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',

    },

  ];
  return(
    <Table
      dataSource={playlistData}
      columns={columns}
      pagination={false}
      scroll={{y: 500}}
      loading= {inProgress ? true : false}
    />
  )
}
export default Playlist;