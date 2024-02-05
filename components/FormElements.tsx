import { TextFieldFormElement } from './fields/TextField';

export type ElementType='TextField';

export type FormElement={
    type:ElementType;

    construct:(id:string)=>FormElementInstance;
    designerBtnElement:{
        icon:React.ElementType,
        label:string,       
    }

    designerComponent:React.FC;
    formComponent:React.FC;
    propertiesComponent:React.FC;
}

export type FormElementInstance={
    id:string,
    type:ElementType,
    extraAttributes?:Record<string, any>;

}
type FormElementType={
    [key in ElementType]:FormElement;
}

export const FormElement:FormElementType={
    TextField:TextFieldFormElement
};
