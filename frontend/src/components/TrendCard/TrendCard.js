import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData'

const TrendCard = () => {
  return (
    <div className='TrendCard'>
        <h3>trends</h3>
        {TrendData.map((item, index) => {
            return (
                <div className="trend">
                        <span>#{item.name}</span>
                        <span>{item.shares}k shares</span>
                    </div>
            )
        })}        
    </div>
  )
}

export default TrendCard