import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'

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
    const node = <div>No Drag overlay</div>
    const isDesignerBtnElement=
    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    )
}

export default DragOverlayWrapper
