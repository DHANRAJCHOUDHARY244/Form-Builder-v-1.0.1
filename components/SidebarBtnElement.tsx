import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '../lib/utils';

const SidebarBtnElement = ({ formElement }: {
    formElement: FormElement
}) => {
    const draggable=useDraggable({
        id:`designer-btn-${formElement.type}`,
        data:{
            type:formElement.type,
            isDesignerBtnElement:true
        }
    })
    const { label, icon: Icon } = formElement.designerBtnElement;
    return (
        <Button
        ref={draggable.setNodeRef}
        variant={'outline'}
        {...draggable.listeners}
        {...draggable.attributes}
        className={cn('flex flex-col gap-2 h-[120px] cursor-garb',
        draggable.isDragging && 'ring-2 ring-primary'
        )}>
            <Icon className='h-8 text-primary cursor-grab' />
            <p className="text-xs">
                {label}
            </p>
        </Button>
    )
}

export const SidebarBtnElementDragOverlay = ({ formElement }: {
    formElement: FormElement
}) => {
    const draggable=useDraggable({
        id:`designer-btn-${formElement.type}`,
        data:{
            type:formElement.type,
            isDesignerBtnElement:true
        }
    })
    const { label, icon: Icon } = formElement.designerBtnElement;
    return (
        <Button
        variant={'outline'}
        className={'flex flex-col gap-2 h-[120px] cursor-garb'}>
            <Icon className='h-8 text-primary cursor-grab' />
            <p className="text-xs">
                {label}
            </p>
        </Button>
    )
}

export default SidebarBtnElement
