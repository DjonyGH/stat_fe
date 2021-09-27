import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import { TTrade } from '../store/reducers/trades/types'
import { ranges } from '../utils/defineRange'
import { prepareDate } from '../utils/prepareDate'

interface IProps {
  data: number[]
}

const StatChart: FC<IProps> = ({ data }) => {
  const dataForBar = {
    labels: ranges.map((item) => {
      if (item[0] === 100) return '< -3%'
      if (item[1] === 100) return '> 3%'
      return `${item[0]}..${item[1]}%`
    }),
    datasets: [
      {
        // label: leadersOf === 'growth' ? 'Лидеры роста (16.10.2021), % 16.10.2021' : 'Лидеры падения, %',
        data: data,
        backgroundColor: ['rgba(75, 192, 192, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Статистика, %`
      }
    }
  }

  return <Bar data={dataForBar} options={options} />
}

export default StatChart
