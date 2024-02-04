'use client'
import { Form } from '@prisma/client'
import React from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'

const FormBuilder = ({form}:{
    form:Form
}) => {
  return (
    <main className="flex flex-col w-full" >
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className='truncate font-medium' >
                <span className='text-muted-foreground mr-2'>Form:</span>
                {form.name}
            </h2>
            <div className="flex items-center bgap-2">
                <PreviewDialogBtn/>
                {!form.published &&(
                    <>
                    <SaveFormBtn/>
                    <PublishFormBtn/>
                    </>
                )}
            </div>
        </nav>
        <div className=""></div>
    </main>
  )
}

export default FormBuilder