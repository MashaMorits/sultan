import geo from '../images/geo.svg'
import callS from '../images/call.svg'
import mail from '../images/mail.svg'
import call from '../images/call.png'

function MobileMenu() {
    return ( 
            <div className="mobile"> 
                <div className="mobile__wrap">
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
                    <div className="header__contacts-item">
                        <img src={callS} alt="" className='icon' />                              
                        <div className="info">
                            <p>Отдел продаж</p>
                            <span>+7 (777) 490-00-91</span>
                            <span>время работы: 9:00-20:00</span>                        
                        </div>
                    </div>
                    <div className="call">
                        <img src={call} alt="" />
                        <p>Заказать звонок</p>
                    </div>
                    
                    <div className="mobile__menu">
                        <p className='mobile__menu-title'>Меню сайта:</p>
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
                    </div>
                    <a href="" className='button'>
                        <p>Прайс-лист</p>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z" fill="white"/>
                        </svg>
                    </a>
                </div>                
            </div>
     );
}

export default MobileMenu;