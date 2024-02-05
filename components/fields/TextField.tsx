'use client'

import { MdTextFields } from 'react-icons/md';
import { ElementType, FormElement } from '../FormElements'

const type: ElementType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,
    construct:(id:string)=>({ 
        id,
        type,
        extraAttributes:{
            label:'Text Field',
            helperText:"Helper Text",
            required:false,
            placeholder:'value here'
        }
    }),
    designerBtnElement:{
        icon: MdTextFields,
        label:'Text Field'
    },
    designerComponent: () => <div>Designer com</div>,
    formComponent: () => <div>formComponent</div>,
    propertiesComponent: () => <div>propertiesComponent</div>,
}