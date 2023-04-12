import { Link } from 'react-router-dom';
import { IProduct, ICartItem } from "../models";
import bottle from '../images/bottle.svg'
import cartW from '../images/cartW.svg'
import box from '../images/box.svg'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { apdateCartState } from '../store/productsSlice';
import Button from './Button';


interface CardProps {
    product: IProduct
}

function Card({product}: CardProps) {

    let Cart = useAppSelector(state => state.products.cart)

    const dispatch = useAppDispatch()    

    const [inCart, setInCart] = useState(false)

    function isInCart() {// проверяем наличие данного товара в корзине

        if (Cart.find(el => el.product === product)) {
            setInCart(true)
        }
    }


    function apdateCart() {

        let newCart = [...Cart]

        let item: ICartItem = {
            product: product,
            count: 1
        }

        if (inCart) {            
            newCart = newCart.filter(el => {
                return el.product !== item.product
            })
        } else {            
            newCart.push(item)
        }  

        dispatch(apdateCartState(newCart))

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
                     
                        <div className="burron__wrap" onClick={() => apdateCart()} >
                            <Button className='button__cart' icon={cartW} text={inCart ? 'УДАЛИТЬ' : 'В КОРЗИНУ'} />
                        </div>
                        
                    </div>
                </div>
        </div>
     );
}

export default Card;