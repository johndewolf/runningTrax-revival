import { Line } from '@ant-design/charts';
import { useSelector } from 'react-redux'
  
const Chart = () => {
  const sets = useSelector(state => state.sets.list)
  const data = sets.map((mile, index) => {
    return { mile: index, tempo: mile.tempo, genre: mile.genre, duration: (mile.duration) }
  })
  const config = {
    data: data,
    xField: 'mile',
    yField: ['tempo'],
    padding: 'auto',
    smooth: true,
    tooltip: {
      fields: ['tempo', 'genre', 'duration' ],
    },
    showContent: true
  }
  return (
    <div className="dropshadow bg-white">
      <Line {...config} />
    </div>
  )
}

export default Chart;