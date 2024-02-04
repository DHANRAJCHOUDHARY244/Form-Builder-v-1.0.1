import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div className="flex w-full flex-row justify-center  mx-auto">
      {children}
    </div>
  )
}
