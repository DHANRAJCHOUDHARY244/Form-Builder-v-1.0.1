import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementType, FormElement } from './FormElements'

const DragOverlayWrapper = () => {
    const [dragItem, setdragitem] = useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (e) => {
            setdragitem(e.active)
        },
        onDragCancel: (e) => {
            setdragitem(null)
        },
        onDragEnd: (e) => {
            setdragitem(null)
        },
    })
    if (!dragItem) return null;
    let node = <div>No Drag overlay</div>
    const isSidebarBtnElement = dragItem?.data?.current?.isDesignerBtnElement;
    if (isSidebarBtnElement) {
        const type= dragItem.data?.current?.type as ElementType;
        node = <SidebarBtnElementDragOverlay formElement={FormElement[type]}  />
    }
    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    )
}

export default DragOverlayWrapper
