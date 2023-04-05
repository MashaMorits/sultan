import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import manager from '../images/manager.png'
import geo from '../images/geo.svg'
import mail from '../images/mail.svg'
import catalog from '../images/catalog.png'
import loop from '../images/loop.png'
import { useAppSelector } from '../hooks';
import { ICartItem } from '../models';
import { useAppDispatch } from '../hooks';
import { setCart } from '../store/productsSlice';
import MobileMenu from './MobileMenu';





function Header() {

    const [ isOpen, setIsOpen] = useState(false)
    let state = useAppSelector(state => state.products)
    let cart: ICartItem[] = localStorage.cart && JSON.parse( localStorage.cart )
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCart(cart))
    }, [])

   

    return ( 
        <header className="header">
            {isOpen && <MobileMenu />}
            <div className="header__top">
                <div className="container">
                    <div className="header__top-wrap">
                        <div className="header__contacts">
                            <div className="header__contacts-item">
                                <img src={geo} alt="" className='icon' />
                                <div className="info">
                                    <p>г. Кокчетав, ул. Ж. Ташенова 129Б </p>
                                    <span>(Рынок Восточный)</span>
                                </div>
                            </div>
                            <div className="header__contacts-item">
                                <img src={mail} alt="" className='icon' />
                                <div className="info">
                                    <p>opt.sultan@mail.ru</p>
                                    <span>На связи в любое время</span>
                                </div>
                            </div>
                        </div>
                        <nav className='header__nav'>
                            <ul>
                                <li>
                                    <a href="">О компании</a>
                                </li>
                                <li>
                                    <a href="">Доставка и оплата</a>
                                </li>
                                <li>
                                    <a href="">Возврат</a>
                                </li>
                                <li>
                                    <a href="">Контакты</a>
                                </li>
                            </ul>
                        </nav>
                        <a href="" className='button'>
                            <p>Прайс-лист</p>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z" fill="white"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header__bottom">
                <div className="container">
                    
                    <div className="header__bottom-wrap">
                        <div className={isOpen ? 'open__mobile active' : "open__mobile"} onClick={() => setIsOpen(prev=> !prev) }>
                                <span></span>
                        </div>
                        <img src={logo} className="logo" alt="logo" />
                        <a href="" className='button'>
                            <p>Каталог</p>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V6C6.5 6.27614 6.27614 6.5 6 6.5H1C0.723858 6.5 0.5 6.27614 0.5 6V2Z" stroke="white"/>
                                <path d="M8.5 1C8.5 0.723858 8.72386 0.5 9 0.5H13C13.8284 0.5 14.5 1.17157 14.5 2V6C14.5 6.27614 14.2761 6.5 14 6.5H9C8.72386 6.5 8.5 6.27614 8.5 6V1Z" stroke="white"/>
                                <path d="M8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H14C14.2761 8.5 14.5 8.72386 14.5 9V13C14.5 13.8284 13.8284 14.5 13 14.5H9C8.72386 14.5 8.5 14.2761 8.5 14V9Z" stroke="white"/>
                                <path d="M0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H6C6.27614 8.5 6.5 8.72386 6.5 9V14C6.5 14.2761 6.27614 14.5 6 14.5H2C1.17157 14.5 0.5 13.8284 0.5 13V9Z" stroke="white"/>
                            </svg>
                        </a>
                        <div className="search">
                            <input type="text" placeholder='Поиск' />
                            <a href="">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5294 15.5294L12.0989 12.0928L15.5294 15.5294ZM14 7.5C14 9.22391 13.3152 10.8772 12.0962 12.0962C10.8772 13.3152 9.22391 14 7.5 14C5.77609 14 4.12279 13.3152 2.90381 12.0962C1.68482 10.8772 1 9.22391 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5V7.5Z" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
                                </svg>
                            </a>
                        </div>

                        <div className="header__contacts">
                            <div className="header__contacts-item">                               
                                <div className="info">
                                    <p>+7 (777) 490-00-91</p>
                                    <span>время работы: 9:00-20:00</span>
                                    <a href="">Заказать звонок</a>
                                </div>
                            </div>
                            <img src={manager} alt="" />
                        </div>
                        
                        <Link to='/admin' className='button'>
                            <p>Админка</p>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z" fill="white"/>
                            </svg>
                        </Link>

                        <Link to='/cart'>
                            <div className="cart">
                                <div className="cart__icon">
                                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.6514 13.7862C41.3916 13.4233 41.043 13.2418 40.6055 13.2418H12.7559L12 11.274C11.8086 10.6289 11.5488 10.0778 11.2207 9.6208C10.8926 9.16381 10.5439 8.84123 10.1748 8.65306C9.80566 8.46489 9.48438 8.3372 9.21094 8.27C8.9375 8.20279 8.66406 8.16919 8.39062 8.16919H2.77148C2.41602 8.16919 2.11523 8.29016 1.86914 8.53209C1.62305 8.77403 1.5 9.08317 1.5 9.45951C1.5 9.67457 1.55469 9.8829 1.66406 10.0845C1.77344 10.2861 1.93066 10.4407 2.13574 10.5482C2.34082 10.6557 2.55273 10.7095 2.77148 10.7095H8.39062C8.5 10.7095 8.60254 10.723 8.69824 10.7498C8.79395 10.7767 8.92383 10.891 9.08789 11.0926C9.25195 11.2942 9.38867 11.5966 9.49805 11.9998L15.3809 28.1531C15.4355 28.3144 15.5244 28.4689 15.6475 28.6168C15.7705 28.7646 15.9141 28.8789 16.0781 28.9595C16.2422 29.0402 16.4199 29.0805 16.6113 29.0805H34.3301C34.6035 29.0805 34.8564 28.9998 35.0889 28.8385C35.3213 28.6773 35.4785 28.4756 35.5605 28.2337L41.8359 14.9757C41.9727 14.5456 41.9111 14.1491 41.6514 13.7862ZM33.4277 26.4998H17.6367L13.4531 15.8225H38.7188L33.4277 26.4998ZM31.0625 30.4798C30.1602 30.4798 29.3877 30.7957 28.7451 31.4274C28.1025 32.0591 27.7812 32.8186 27.7812 33.7057C27.7812 34.5928 28.1025 35.3522 28.7451 35.9839C29.3877 36.6156 30.1602 36.9315 31.0625 36.9315C31.9648 36.9315 32.7373 36.6156 33.3799 35.9839C34.0225 35.3522 34.3438 34.5928 34.3438 33.7057C34.3438 32.8186 34.0225 32.0591 33.3799 31.4274C32.7373 30.7957 31.9648 30.4798 31.0625 30.4798ZM19.25 30.4798C18.6484 30.4798 18.0947 30.6277 17.5889 30.9234C17.083 31.2191 16.6865 31.6089 16.3994 32.0927C16.1123 32.5766 15.9688 33.1143 15.9688 33.7057C15.9688 34.5928 16.29 35.3522 16.9326 35.9839C17.5752 36.6156 18.3477 36.9315 19.25 36.9315C20.1523 36.9315 20.9248 36.6156 21.5674 35.9839C22.21 35.3522 22.5312 34.5928 22.5312 33.7057C22.5312 33.4906 22.5107 33.2755 22.4697 33.0605C22.4287 32.8454 22.3672 32.6438 22.2852 32.4557C22.2031 32.2675 22.1006 32.086 21.9775 31.9113C21.8545 31.7366 21.7178 31.5753 21.5674 31.4274C21.417 31.2796 21.2529 31.1452 21.0752 31.0242C20.8975 30.9032 20.7129 30.8024 20.5215 30.7218C20.3301 30.6411 20.125 30.5806 19.9062 30.5403C19.6875 30.5 19.4688 30.4798 19.25 30.4798Z" fill="#3F4E65"/>
                                    </svg>
                                    <p className='cart__count'>{state.totalCount || 0}</p>
                                </div>
                                <div className="cart__info">
                                    <p>Корзина</p>
                                    <span>{state.totalPrice || 0} ₸ </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                </div>
            </div>
            <div className="header__mobile">
                <div className="button__white">
                    <img src={catalog} alt="" />
                    <p>Каталог</p>
                </div>
                <div className="button__white">
                    <img src={loop} alt="" />
                    <p>Поиск</p>
                </div>
            </div>
        </header>
     );
}

export default Header;