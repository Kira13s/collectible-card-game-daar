import React from 'react'
import ReactDOM from 'react-dom/client'
import { Booster } from './backend/Booster.tsx'

const node = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(node)
root.render(
  <React.StrictMode>
    <Booster />
  </React.StrictMode>
)
