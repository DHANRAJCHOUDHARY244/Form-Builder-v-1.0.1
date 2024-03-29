"use server"

import prisma from "@/lib/prisma"
import { FormSchemType, formSchema } from "@/schema/form"
import { currentUser } from "@clerk/nextjs"


class UserNotFoundErr extends Error {

}

export async function GetFormStats() {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundErr('')
    }
    const stats = prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })
    const visits = (await stats)._sum.visits || 0;
    const submissions = (await stats)._sum.submissions || 0;
    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = (submissionRate / visits) * 100;
    }
    const bouncerate = 100 - submissionRate;

    return {
        visits, submissions, submissionRate, bouncerate
    }

}
export async function CreateForm(data: FormSchemType) {
    const validation = formSchema.safeParse(data)
    if (!validation.success) {
        throw new Error("form not valid")
    }

    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr('');
    }
    const { name, description } = data;
    console.log(data);


    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })

    if (!form) {
        throw new Error("something went wrong")
    }

    return form.id

}

export async function GetForms(){
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr('');
    }
    return await prisma.form.findMany({
        where:{
            userId:user.id,
        },
        orderBy:{
            createdAt:'desc'
        }
    })
}

export async function GetFormById(id:number){
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr('');
    }
    return await prisma.form.findUnique({
        where:{
            userId:user.id,
            id
        }
    })
}