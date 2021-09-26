import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import { TTrade } from '../store/reducers/trades/types'

interface IProps {
  rawData: TTrade[]
  leadersOf: 'growth' | 'fall'
}

const VerticalBars: FC<IProps> = ({ rawData, leadersOf }) => {
  const data = {
    labels: rawData.map((item) => item.name),
    datasets: [
      {
        label: leadersOf === 'growth' ? 'Лидеры роста' : 'Лидеры падения',
        data: rawData.map((item) => Math.abs(((item.close - item.open) / item.open) * 100)),
        backgroundColor:
          leadersOf === 'growth'
            ? [
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(75, 192, 192, 1)'
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

  return (
    <>
      <Bar data={data} />
    </>
  )
}

export default VerticalBars
