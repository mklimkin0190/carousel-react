import React from 'react'
import ReactDOM from 'react-dom/client'
import _ from 'lodash'
import './index.css'
import Carousel from './App'
import reportWebVitals from './reportWebVitals'

const renderItems = () =>
  _.map([1, 2, 3, 4, 5, 6, 7, 8, 9], (n: number) => (
    <div
      style={{
        width: '100%',
        minWidth: '200px',
        backgroundColor: 'lightgray',
        display: 'inline-block',
      }}
    >
      {n}
    </div>
  ))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Carousel items={renderItems()} margin={8} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
