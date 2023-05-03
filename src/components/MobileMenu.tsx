import geo from '../images/geo.svg'
import callS from '../images/call.svg'
import mail from '../images/mail.svg'
import download from '../images/download.svg'
import call from '../images/call.png'
import Button from '../UI/Button'
import Navigation from './NavigationMenu'

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
                            <Navigation />
                        </nav>
                    </div>
                    <Button className='' icon={download}  text='Прайс-лист' />
                </div>                
            </div>
     );
}

export default MobileMenu;