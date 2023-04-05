import { useEffect, useState } from "react";
import Counter from "./Counter";
import bottle from '../images/bottle.svg'
import box from '../images/box.svg'
import del from '../images/del.svg'

interface ICartItem {
    item: string,
    count: number,
    getSum: (arg0: ICartStorage) => void
}

interface ICartStorage {
    product: string,
    count: number
}


function CartItem(props: ICartItem) {

    let cart: ICartStorage[] = localStorage.cart && JSON.parse( localStorage.cart )

    const [count, setCount] = useState(props.count)

    let product = JSON.parse(props.item)


    function delItem(){ // удаление товара из корзины и localStorage
        cart = cart.filter(el => {
            return el.product !== props.item
        })
        localStorage.cart = JSON.stringify(cart)
    }


    let apdateCount = (x: number) => { // изменение счётчика количества товара при добавлении в корзину
        if(count === 1 && x < 0) {
            setCount(1)
        }  else {
            setCount(prevstate => prevstate + x)
        }  
    }

  

    useEffect(() => {
        props.getSum({product : product.barcode, count : count } )
    }, [count])


    return ( 
        <div className="cartPage__item">
            <div className="image">
                <img src={product.img} alt="" />  
            </div>            
            <div className="info">
                <div className="row">
                        {product.type === 'мл' ? <img src={bottle} alt="" /> : <img src={box} />}
                        <p>{product.size} {product.type}</p>
                </div>                         
                <p className="name">{product.name}</p>
            </div>
            <div className="row__price">
                <Counter count={count} apdate={apdateCount} />
                <p className="price">{+product.price * count} ₸</p>
                <a href="" className="del" onClick={() => delItem()} >                                
                    <img src={del} />
                </a>
            </div>
            
        </div>
     );
}

export default CartItem;