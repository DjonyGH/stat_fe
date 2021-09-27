import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import { TTrade } from '../store/reducers/trades/types'
import { prepareDate } from '../utils/prepareDate'

interface IProps {
  rawData: TTrade[]
  leadersOf: 'growth' | 'fall'
  date: string
}

const LeaderChart: FC<IProps> = ({ rawData, leadersOf, date }) => {
  const data = {
    labels: rawData.map((item) => item.name),
    datasets: [
      {
        // label: leadersOf === 'growth' ? 'Лидеры роста (16.10.2021), % 16.10.2021' : 'Лидеры падения, %',
        data: rawData.map((item) => Math.abs(((item.close - item.open) / item.open) * 100)),
        backgroundColor:
          leadersOf === 'growth'
            ? [
                'rgba(75, 192, 192, 1)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(75, 192, 192, 0.2)'
              ]
            : [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 99, 132, 1)'
              ],
        borderColor: leadersOf === 'growth' ? ['rgba(75, 192, 192, 1)'] : ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  }

  const max = (index: 0 | 4) => {
    return Math.ceil(Math.abs(((rawData[index].close - rawData[index].open) / rawData[index].open) * 110))
  }

  const options = {
    scales: {
      y: {
        min: 0,
        max: leadersOf === 'growth' ? max(0) : max(4)
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Лидеры ${leadersOf === 'growth' ? 'роста' : 'падения'} (${prepareDate(date)}), %`
      }
    }
  }

  return <Bar data={data} options={options} />
}

export default LeaderChart
