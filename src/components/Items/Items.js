import React from 'react'
import Button from '../UI/Button'

const Items = props => {
    const price = `$${props.data.price}`
  return (
    <li>
        <div>
        <h1>{props.data.title}</h1>
            <img src={props.data.imageUrl} alt ="items images "/>
        </div>
        <div>
            <span>{price}</span>
            <Button />
        </div>
    </li>
  )
}

export default Items