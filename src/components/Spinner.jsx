import React, { Component } from 'react'
import Loading from './Load.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Loading} alt="loading..." style={{height: "100px"}} />
      </div>
    )
  }
}
