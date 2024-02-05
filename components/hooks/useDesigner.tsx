'use client'
import React, { useContext } from 'react'
import { DesignerContext } from '../context/DesignerContext'

const useDesigner = () => {
    const context = useContext(DesignerContext);
    if(!context){
        throw new Error('UseDesigner must be used withing a designer context')
    }
    return (
        context
    )
}

export default useDesigner