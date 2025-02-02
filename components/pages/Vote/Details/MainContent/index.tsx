import React from 'react'
import { Description } from './Description'
import { DetailsAndStages } from './DetailsAndStages'

export const MainContent = () => {
  return (
    <div className="mt-[26px] justify-between md:flex">
      <Description />
      <DetailsAndStages />
    </div>
  )
}
