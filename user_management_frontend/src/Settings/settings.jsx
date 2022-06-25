import React from 'react'
import {ParticlesBackground} from '../particles/ParticlesBack'

const liStyle = {color : 'blue', fontSize:'23px'}

function Settings() {
  return (
    <>
          <ParticlesBackground />
          <h1 style={liStyle}>This is a setting page</h1>
    </>
  )
}

export default Settings
