

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IProduct } from "../models";
import show from '../images/show.svg'
import { apdateCartState } from "../store/productsSlice";
import arrow from '../images/arrow.svg'



function Product() {

    let products: IProduct[] = useAppSelector(state => state.products.products)  

    let Cart = useAppSelector(state => state.products.cart)

    const dispatch = useAppDispatch()
   
    const windowOuterWidth = window.outerWidth > 1199
    let navigate = useNavigate()
    const params = useParams()
    const current: number = Number(params.id) 

    const [count, setCount] = useState(1)
    const [product, setProduct] = useState<IProduct>()
    const [ showDescription, setShowDescription ] = useState(false)
    const [ showFeatures, setShowFeatures ] = useState(false)

    function getProduct(current: number) { // получаем информацию о товаре
        const currentProduct: IProduct = products.filter(product => {
            return product.barcode === current
        })[0] 
        setProduct(currentProduct)
    }

    function apdateCount(x: number){ // изменение счётчика количества товара при добавлении в корзину
        if(count === 1 && x < 0) {
            setCount(1)
        }  else {
            setCount(prevstate => prevstate+x)
        }  
    }


    let currentItem = Cart.find(el => el.product.barcode === product?.barcode)

    function isInCart() {// проверяем наличие данного товара в корзине

        if (currentItem) {
            let currentItem = Cart.find(el => el.product === product)
            setCount(currentItem!.count)    
        }

    }



    function addToCart(event: React.MouseEvent<HTMLElement>){ // функция добавления в корзину
        event?.preventDefault()         
       
        let newCart = [...Cart]

        let item = { 
            product: product!,
            count: count
        }    

        if (currentItem) {
            newCart = newCart.filter(el => el.product.barcode != product?.barcode)
        } 
        newCart.push(item)
        dispatch(apdateCartState(newCart))

        
    }

    useEffect(() => {
        getProduct(current)
    }, []);
    
    useEffect(() => {
        isInCart()
    }, [product]);
    

    return ( 

        <>
            {windowOuterWidth ? <div className="breadcrumbs">
                                    <p>Главная</p>
                                    <Link to="/sultan"
                                    className={"breadcrumb-active"}
                                    >
                                    Косметика и гигиена
                                    </Link>
                                    <p
                                    className={"breadcrumb-not-active"}
                                    >
                                        {product?.name}
                                    </p>            
                                </div>
            :   <div className="breadcrumbs">
                    <div className="goBack" onClick={() => navigate(-1)}>   
                        <div className="arrow">
                            <img src={arrow} alt="" />  
                        </div>                      
                        <span>Назад</span>
                    </div>
                </div>
            }

            <div className="product">
                
                <div className="product__img">
                    <img src={product?.img} alt="" />
                </div>
                <div className="product__info">
                    <p className="availability">В наличии</p>
                    <p className="product__title">{product?.name}</p>
                    <div className="size">                     
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.23" clip-path="url(#clip0_56_930)">
                            <path d="M13.303 7.99994C12.7749 7.99994 12.278 7.71869 12.0092 7.26869L9.99986 3.93743L7.99361 7.26869C7.72173 7.72181 7.22486 8.00306 6.69673 8.00306C6.55611 8.00306 6.41548 7.98431 6.28111 7.94369L1.99986 6.71868V12.2812C1.99986 12.7406 2.31236 13.1406 2.75611 13.2499L9.51236 14.9406C9.83111 15.0187 10.1655 15.0187 10.4811 14.9406L17.2436 13.2499C17.6874 13.1374 17.9999 12.7374 17.9999 12.2812V6.71868L13.7186 7.94056C13.5842 7.98119 13.4436 7.99994 13.303 7.99994ZM19.9467 4.49369L18.3374 1.28118C18.2405 1.08743 18.0311 0.974934 17.8155 1.00306L9.99986 1.99993L12.8655 6.75306C12.9842 6.94993 13.2217 7.04368 13.4436 6.98118L19.628 5.21556C19.9374 5.12493 20.0874 4.78118 19.9467 4.49369ZM1.66236 1.28118L0.0529828 4.49369C-0.0907672 4.78118 0.0623578 5.12493 0.368608 5.21243L6.55298 6.97806C6.77486 7.04056 7.01236 6.94681 7.13111 6.74993L9.99986 1.99993L2.18111 1.00306C1.96548 0.978059 1.75923 1.08743 1.66236 1.28118Z" fill="#3F4E65"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_56_930">
                            <rect width="20" height="16" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <p>{product?.size} {product?.type}</p>
                    </div>
                    <div className="row row-price">
                        <p className="price">{product?.price} ₸</p>
                        <div className="counter">
                            <button onClick={() => apdateCount(-1)}>-</button>
                            <p>{count}</p>
                            <button onClick={() => apdateCount(1)}>+</button>
                        </div>
                        <a href="" className="button" onClick={(event: React.MouseEvent<HTMLElement>) => addToCart(event)}>
                            <p>В корзину</p>
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M41.6514 13.7862C41.3916 13.4233 41.043 13.2418 40.6055 13.2418H12.7559L12 11.274C11.8086 10.6289 11.5488 10.0778 11.2207 9.6208C10.8926 9.16381 10.5439 8.84123 10.1748 8.65306C9.80566 8.46489 9.48438 8.3372 9.21094 8.27C8.9375 8.20279 8.66406 8.16919 8.39062 8.16919H2.77148C2.41602 8.16919 2.11523 8.29016 1.86914 8.53209C1.62305 8.77403 1.5 9.08317 1.5 9.45951C1.5 9.67457 1.55469 9.8829 1.66406 10.0845C1.77344 10.2861 1.93066 10.4407 2.13574 10.5482C2.34082 10.6557 2.55273 10.7095 2.77148 10.7095H8.39062C8.5 10.7095 8.60254 10.723 8.69824 10.7498C8.79395 10.7767 8.92383 10.891 9.08789 11.0926C9.25195 11.2942 9.38867 11.5966 9.49805 11.9998L15.3809 28.1531C15.4355 28.3144 15.5244 28.4689 15.6475 28.6168C15.7705 28.7646 15.9141 28.8789 16.0781 28.9595C16.2422 29.0402 16.4199 29.0805 16.6113 29.0805H34.3301C34.6035 29.0805 34.8564 28.9998 35.0889 28.8385C35.3213 28.6773 35.4785 28.4756 35.5605 28.2337L41.8359 14.9757C41.9727 14.5456 41.9111 14.1491 41.6514 13.7862ZM33.4277 26.4998H17.6367L13.4531 15.8225H38.7188L33.4277 26.4998ZM31.0625 30.4798C30.1602 30.4798 29.3877 30.7957 28.7451 31.4274C28.1025 32.0591 27.7812 32.8186 27.7812 33.7057C27.7812 34.5928 28.1025 35.3522 28.7451 35.9839C29.3877 36.6156 30.1602 36.9315 31.0625 36.9315C31.9648 36.9315 32.7373 36.6156 33.3799 35.9839C34.0225 35.3522 34.3438 34.5928 34.3438 33.7057C34.3438 32.8186 34.0225 32.0591 33.3799 31.4274C32.7373 30.7957 31.9648 30.4798 31.0625 30.4798ZM19.25 30.4798C18.6484 30.4798 18.0947 30.6277 17.5889 30.9234C17.083 31.2191 16.6865 31.6089 16.3994 32.0927C16.1123 32.5766 15.9688 33.1143 15.9688 33.7057C15.9688 34.5928 16.29 35.3522 16.9326 35.9839C17.5752 36.6156 18.3477 36.9315 19.25 36.9315C20.1523 36.9315 20.9248 36.6156 21.5674 35.9839C22.21 35.3522 22.5312 34.5928 22.5312 33.7057C22.5312 33.4906 22.5107 33.2755 22.4697 33.0605C22.4287 32.8454 22.3672 32.6438 22.2852 32.4557C22.2031 32.2675 22.1006 32.086 21.9775 31.9113C21.8545 31.7366 21.7178 31.5753 21.5674 31.4274C21.417 31.2796 21.2529 31.1452 21.0752 31.0242C20.8975 30.9032 20.7129 30.8024 20.5215 30.7218C20.3301 30.6411 20.125 30.5806 19.9062 30.5403C19.6875 30.5 19.4688 30.4798 19.25 30.4798Z" />
                            </svg>
                        </a>
                    </div>
                    <div className="row row-share">
                        <div className="share">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.00004 13.5C4.87469 13.4974 5.71626 13.1653 6.35704 12.57L12.617 16.147C12.4073 16.9666 12.4998 17.8343 12.8775 18.5913C13.2552 19.3483 13.893 19.9439 14.674 20.2692C15.455 20.5944 16.327 20.6274 17.1304 20.3623C17.9338 20.0971 18.6148 19.5515 19.0488 18.8252C19.4827 18.099 19.6406 17.2408 19.4935 16.4076C19.3464 15.5745 18.9042 14.8222 18.2478 14.2885C17.5914 13.7548 16.7647 13.4753 15.919 13.5013C15.0734 13.5273 14.2655 13.857 13.643 14.43L7.38304 10.853C7.44904 10.603 7.48504 10.344 7.49104 10.085L13.641 6.56996C14.2332 7.10874 14.9927 7.42747 15.792 7.47268C16.5913 7.51789 17.3818 7.28684 18.031 6.81828C18.6802 6.34972 19.1484 5.67217 19.3572 4.89929C19.5661 4.1264 19.5027 3.30522 19.1779 2.5735C18.853 1.84178 18.2864 1.24404 17.5731 0.88056C16.8597 0.517083 16.0431 0.409982 15.2602 0.577226C14.4772 0.744469 13.7756 1.17588 13.2731 1.79909C12.7705 2.42229 12.4976 3.19937 12.5 3.99996C12.504 4.28796 12.543 4.57497 12.617 4.85296L6.93304 8.09997C6.60341 7.59003 6.1468 7.17461 5.60805 6.89454C5.06931 6.61446 4.46697 6.47936 3.86021 6.50251C3.25346 6.52566 2.66316 6.70627 2.14732 7.02658C1.63148 7.34689 1.20785 7.79589 0.918041 8.32946C0.628232 8.86303 0.48222 9.46282 0.494351 10.0699C0.506482 10.677 0.676338 11.2704 0.98723 11.792C1.29812 12.3136 1.73936 12.7453 2.26758 13.0447C2.7958 13.3442 3.39284 13.5011 4.00004 13.5Z" fill="#FFC85E"/>
                            </svg>
                        </div>
                        
                        <p className="text">При покупке от <b>10 000 ₸</b> бесплатная доставка по Кокчетаву и области</p>
                        <a href="" className="button button__white">
                            <p>Прайс-лист</p>                        
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z" />
                            </svg>
                        </a>
                    </div>

                    <div className="features">
                        <div className="row">
                            <p className="features__name">Производитель:</p>
                            <p className="features__description">{product?.manufacturer}</p>
                        </div>
                        <div className="row">
                            <p className="features__name">Бренд:</p>
                            <p className="features__description">{product?.brand}</p>
                        </div>
                        <div className="row">
                            <p className="features__name">Артикул:</p>
                            <p className="features__description">460404</p>
                        </div>
                        <div className="row">
                            <p className="features__name">Штрихкод:</p>
                            <p className="features__description">{product?.barcode}</p>  
                        </div>          
                    </div>

                    <div className="description">
                        <div className="subtitle" onClick={() => setShowDescription(prev=> !prev)}>
                            <p>Описание</p>
                            <img src={show} alt="" />
                        </div>
                        {showDescription && <p>{product?.description}</p>}
                    </div>

                    <div className="features">
                        <div className="subtitle" onClick={() => setShowFeatures(prev=> !prev)}>
                            <p>Характеристики</p>
                            <img src={show} alt="" />
                        </div>
                        
                        {showFeatures && <div className="features__wrap">
                            <div className="row">
                                <p className="features__name">Назначение:</p>
                                <p className="features__description">{product?.manufacturer}</p>
                            </div>
                            <div className="row">
                                <p className="features__name">Тип:</p>
                                <p className="features__description">{product?.brand}</p>
                            </div>
                            <div className="row">
                                <p className="features__name">Производитель:</p>
                                <p className="features__description">{product?.manufacturer}</p>
                            </div>
                            <div className="row">
                                <p className="features__name">Бренд:</p>
                                <p className="features__description">{product?.barcode}</p> 
                            </div>
                            <div className="row">
                                <p className="features__name">Артикул:</p>
                                <p className="features__description">{product?.barcode}</p>
                            </div>
                            <div className="row">
                                <p className="features__name">Штрихкод::</p>
                                <p className="features__description">{product?.barcode}</p>
                            </div>
                            
                            <div className="row">
                                <p className="features__name">Вес:</p>
                                <p className="features__description">{product?.size} {product?.type}</p> 
                            </div>
                            <div className="row">
                                <p className="features__name">Объем:</p>
                                <p className="features__description">{product?.size} {product?.type}</p>
                            </div>
                            <div className="row">
                                <p className="features__name">Кол-во в коробке:</p>
                                <p className="features__description">{product?.size} {product?.type} </p> 
                            </div> 
                        </div>}
                          
                    </div>
                    
                </div>
            </div>
        </>
     );
}

export default Product;
