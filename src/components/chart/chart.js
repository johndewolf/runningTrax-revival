import { useContext } from 'react'
import { Line } from '@ant-design/charts';
import { Context } from '../store'
const Chart = () => {
  const [ state ] = useContext(Context);
  const data = state.miles.map((mile, index) => {
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