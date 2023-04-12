import { useEffect, useState } from "react";
import Counter from "./Counter";
import bottle from '../images/bottle.svg'
import box from '../images/box.svg'
import del from '../images/del.svg'
import { useAppDispatch, useAppSelector } from "../hooks";
import { apdateCartState } from "../store/productsSlice";
import { ICartItem, IProduct } from "../models";


function CartItem(props: ICartItem) {
    

    let Cart = useAppSelector(state => state.products.cart)

    const [count, setCount] = useState(props.count)

    let product = props.product

    const dispatch = useAppDispatch()
    


    function delItem(){ // удаление товара из корзины и localStorage
        
        let newCart = Cart.filter(el=> el.product != product)
        dispatch(apdateCartState(newCart))
    }


    let apdateCount = (x: number) => { // изменение счётчика количества товара при добавлении в корзину
        if(count === 1 && x < 0) {
            setCount(1)
        }  else {
            setCount(prevstate => prevstate + x)
        }  
    }

  

    useEffect(() => {
        let item = {
            product: product,
            count: count
        }

        let newCart = Cart.map(el => {
            if ( el.product === product ){
                return item
            } else {
                return el
            }
        })

        dispatch(apdateCartState(newCart))

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
                <div className="del" 
                onClick={() => delItem()} 
                >                                
                    <img src={del} />
                </div>
            </div>
            
        </div>
     );
}

export default CartItem;