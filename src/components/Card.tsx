import { Link } from 'react-router-dom';
import { IProduct, ICartItem } from "../models";
import bottle from '../images/bottle.svg'
import cartW from '../images/cartW.svg'
import box from '../images/box.svg'
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { setCart } from '../store/productsSlice';


interface CardProps {
    product: IProduct
}

function Card({product}: CardProps) {

    let cart: ICartItem[] = localStorage.cart && JSON.parse( localStorage.cart )

    const dispatch = useAppDispatch()    

    const [inCart, setInCart] = useState(false)

    function isInCart() {// проверяем наличие данного товара в корзине

        if (cart !== undefined ) {
            let currentProd = cart.find(el => el.product === JSON.stringify(product)) 
            currentProd && setInCart(true)
        }

    }

    // localStorage.clear()

    function apdateCart() {

        let currentCart: ICartItem[] = localStorage.cart && JSON.parse( localStorage.cart )

        if(inCart){
            let newCart = currentCart.filter(el => {
                return el.product !== JSON.stringify(product)
            })
           
            localStorage.cart = JSON.stringify(newCart)
            
        } else {

           let item = {product: JSON.stringify(product), count: '1'}

           if (currentCart) {
                currentCart.push(item)
                localStorage.cart = JSON.stringify(currentCart)                
           } else {
                localStorage.cart = JSON.stringify([item])                
           }   
        }
        
        dispatch(setCart(JSON.parse(localStorage.cart)))
        setInCart(!inCart)
    }

    useEffect(() => {
        isInCart()
    }, [inCart])

    
   
    return ( 
        <div className="catalog__item">
                <img src={product.img} alt="" />
                <div className="row">
                        {
                            product.type === 'мл' ? <img src={bottle} alt="" /> : <img src={box} />
                        }

                        <p>{product.size} {product.type}</p>
                </div>
                <div className="info">
                    
                    <Link to={`/product/${product.barcode}`} className='name'><b>{product.brand}</b> {product.name}</Link>

                    <div className="features">
                        <div className="row">
                            <p className="features__name">Штрихкод:</p>
                            <p className="features__description">{product.barcode}</p>  
                        </div>
                        <div className="row">
                            <p className="features__name">Производитель:</p>
                            <p className="features__description">{product.manufacturer}</p>
                        </div>
                        <div className="row">
                            <p className="features__name">Бренд:</p>
                            <p className="features__description">{product.brand}</p>
                        </div>          
                    </div>

                    <div className="row row__price">
                        <p className='price'>{product.price} ₸</p>
                        <a className='button button__cart' onClick={() => apdateCart()}>
                            <p>{inCart ? 'УДАЛИТЬ' : 'В КОРЗИНУ'}</p> 
                            <img src={cartW} alt="" />                       
                        </a> 
                    </div>
                </div>
                
                
        </div>
     );
}

export default Card;