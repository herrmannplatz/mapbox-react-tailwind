import React from 'react'

export default ({ children, className }) => (
  <div className={['w-full h-full flex', className].join(' ')}>
    { children}
  </div>
)