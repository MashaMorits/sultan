import { useState } from "react";
import { IProduct } from "../models";
import EditInput from "./EditInput";

interface IEditBloc {
    item: IProduct
    remove: (arg0: IProduct) => void
    apdate: (arg0: IProduct, arg1: IProduct) => void
}

function EditBlock(props: IEditBloc) {
   
    const [item, setItem] = useState({...props.item})

    let itemArr = Object.entries(item)


    function changeItem(itemkey: string, value: string | string[] ) {
               
        let newItem = {...item}

        for (let key of Object.keys(newItem)){
            
            if(key === itemkey){
                newItem[key] = value
            }
        }

        setItem({...newItem})

        props.apdate(props.item, newItem)        
    }

   

    // console.log(item)

    return ( 
        <div className="edit__item">
           
            {
                itemArr.map(el => {                    
                        return (
                            <div className="edit__block">
                                <p>{el[0]}</p>
                                <EditInput 
                                    itemkey={el[0]}
                                    value={el[1]} 
                                    changeItem = {changeItem}
                                />
                            </div>
                    )
                })
            }
            
            
            <div className="button"
                onClick={() => props.remove(item)}
            >                                
                <p>Удалить товар</p>
            </div>
        </div>  
     );
}

export default EditBlock;