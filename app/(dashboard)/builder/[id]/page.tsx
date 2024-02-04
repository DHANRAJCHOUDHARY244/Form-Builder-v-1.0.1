import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react'

export default async function BuilderPage({ params }: {
    params: {
        id: string
    }
}) 
{
    const {id}=params;
    const form = await GetFormById(Number(id));
    if(!form){
        throw new Error("form Not Found");
    }
    return (
        <FormBuilder form={form} />
    )
}
