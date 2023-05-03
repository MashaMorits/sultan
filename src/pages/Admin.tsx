
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import EditBlock from "../components/EditBlock";
import { useAppSelector } from "../hooks";
import { IProduct } from "../models";

function Admin() {

    let Initialproducts = [...useAppSelector(state => state.products.products)]
    // console.log(products)

    const [products, setProducts] = useState<IProduct[]>([])    

    let newProduct = {
        "name": "Название",
        "img": "Ссылка на изображение",
        "type": "Тип размера",
        "size": 42,
        "barcode": 5566,
        "manufacturer": "Производитель",
        "brand": "VICHY",
        "description": "Описание",
        "price": "7000",
        "categories": ['Уход за телом']
    }
    

    function removeItem(item: IProduct) {
        let productList = [...products]
        console.log(item)
        let newProductsList = productList.filter(el => {
           return el.barcode !== item.barcode
        })

        console.log(newProductsList)

        setProducts(newProductsList)        
    }

    function apdateProducts(item: IProduct, newItem: IProduct){
        console.log('item', item)
        console.log('newItem', newItem)
        let productList = [...products]
        let currentItem = productList.map(el => {
            if (JSON.stringify(el) ===  JSON.stringify(item)){
                return {...newItem}
            } else {
                return el
            }
            
        })
      
        setProducts(currentItem)
    }

    function saveProducts() {
        console.log(products)
        localStorage.products = JSON.stringify(products)
        console.log(localStorage)
        localStorage.removeItem('cart')
    }

    useEffect(() => {
        setProducts(Initialproducts)
    }, [])



    console.log('products', products)
    return (   
        <>    
            <Breadcrumbs />
            <div className="edit">
                <h1>Admin</h1>

                {                
                    products.map(item=> {
                        return (
                                <EditBlock item={item} remove={removeItem} apdate={apdateProducts} key={item.barcode}/> 
                        )
                    })
                }

                <div className="row">
                    <div className="button" onClick={() => setProducts([...products, newProduct])}><p>Создать новый товар</p></div>
                    <div className="button" onClick={() => saveProducts()} ><p>Сохранить</p></div>
                </div>
                
            </div>
        </>  
     );
}

export default Admin;