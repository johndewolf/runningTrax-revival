import { Column } from '@ant-design/charts';
import { roundToTwoPlaces } from '../../utility/index'
  
const ChartResult = ({playlist, sets}) => {
  const actualDurations = playlist.map((trackGroup, index) => {
    const obj = {
      mile: index + 1,
      name: 'Playlist Duration'
    }
    obj.duration = trackGroup.reduce((sum, track) => { return roundToTwoPlaces(sum + (track.duration_ms / 1000)) }, 0);
    return obj;
  })
  const data = sets.map((mile, index) => {
    const obj = {
      mile: index + 1,
      name: 'Target Duration'
    }
    obj.duration = mile.duration;
    return obj;
  })


  const config = {
    data: [...data, ...actualDurations],
    isGroup: true,
    seriesField: 'name',
    xField: 'mile',
    yField: 'duration',
    height: 200,
  }
  return (
    <>
      <h3>Target Duration vs the duration of the sets in the playlists (in seconds):</h3>
      <Column {...config} />
    </>
  )
}

export default ChartResult;