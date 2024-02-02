import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/' className='font-bold text-3xl bg-gradient-to-r from-indigo-400 hover:cursor-pointer to-cyan-400 bg-clip-text text-transparent'>
      Page Form
    </Link>
  )
}

export default Logo