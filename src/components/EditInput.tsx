import { useState } from "react"
import { categories } from "../data/products"

interface IEditInput {
    value: string | string[],
    itemkey: string
    changeItem: (arg0: string, arg1: string | string[]) => void
}

function EditInput(props: IEditInput) {

    const [inputValue, setInputValue] = useState(props.value)
  
    let input

    if (props.itemkey === 'description') {

        input = <textarea 
                value={inputValue} 
                onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => changeHandle(event)} />

    } else if (props.itemkey === 'categories') {

        input = <select multiple onChange={(event: React.ChangeEvent<HTMLSelectElement>) => selectHandle(event)}>
                    {categories.map(item => {
                        let selected = props.value.includes(item)
                        return <option selected={selected} value={item}>{item}</option>
                    })}
                </select>
        
    } else {
        input = <input 
                type='text'
                value={inputValue} 
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => changeHandle(event)} />
    }
    
    


    function changeHandle(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        
        setInputValue(event.currentTarget.value)
        props.changeItem(props.itemkey, event.currentTarget.value)
       
    }

    function selectHandle(event:  React.ChangeEvent<HTMLSelectElement>) {
        
        const selectedOptions = event.currentTarget.selectedOptions
        let selected = []

        for (let i = 0; i < selectedOptions.length; i++) {
            selected.push(selectedOptions[i].value);
        }
        props.changeItem(props.itemkey, selected)
    }
    
    return (       
            <>{ input } </>    
     );
}

export default EditInput;

