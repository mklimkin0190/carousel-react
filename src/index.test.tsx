import React from 'react'
import _ from 'lodash'
import renderer from 'react-test-renderer'

import Carousel from './Carousel'

const renderItems = () =>
  _.map([1,2,3], (n: number) => <div>{n}</div>)

describe('carousel', () => {
  it('is rendered', () => {
    const component = renderer.create(<Carousel margin={0} items={renderItems()} />)
    expect(component.toJSON()).toBeDefined()
  })
})

