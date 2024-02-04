'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImSpinner2 } from "react-icons/im";
import { toast } from './ui/use-toast';
import { FormSchemType, formSchema } from '@/schema/form';
import { CreateForm } from '@/actions/form';
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { useRouter } from 'next/navigation';


const CreateFormBtn = () => {
  const router=useRouter()
    const form = useForm<FormSchemType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (values: FormSchemType) => {
        try {
            const formId = await CreateForm(values)
            toast({
                title: 'Success',
                description: "Form created successfully",
                variant: 'default'
            })
           router.push(`/builder/${formId}`)
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something went wrong, please try again later",
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                variant={'outline'}
                className='group border border-primary/20 h-[190px]
                 items-center justify-center flex flex-col hover:border-primary
                  hover:cursor-pointer border-dashed gap-4 '>
                    <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground 
                    group-hover:text-primary' />
                    <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>Create New Form</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create form
                    </DialogTitle>
                    <DialogDescription>
                        Create new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        >

                        </FormField>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        >
                        </FormField>
                    </form>
                    <DialogFooter>
                        <Button
                            onClick={
                                form.handleSubmit(onSubmit)
                            }
                            disabled={form.formState.isSubmitting}
                            className='w-full mt-4' >
                            {
                                !form.formState.isSubmitting && <span>Save</span>
                            }
                            {
                                form.formState.isSubmitting && (
                                    <ImSpinner2 className='animate-spin' />
                                )
                            }
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFormBtn