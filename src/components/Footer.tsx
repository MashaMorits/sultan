import whiteLogo from '../images/whiteLogo.png'
import mc from '../images/mc.png'
import Visa from '../images/Visa.png'
import wa from '../images/wa.svg'
import tg from '../images/tg.svg'
import Button from './Button'
import download from '../images/download.svg'
import Navigation from './NavigationMenu'

function Footer() {
    return ( 
        <footer className="footer">
            <div className="container">
                <div className="footer__wrap">
                    <div className="col col__logo">
                        <div className="row__logo">
                            <img className='logo' src={whiteLogo} alt="" />                            
                            <Button icon={download} text='Прайс-лист' className='' />
                        </div>
                        
                        <p className='description'>Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве и Акмолинской области</p>
                        <p className='sub'>Подпишись на скидки и акции</p>
                        <div className="search">
                            <input type="text" placeholder='Введите ваш E-mail'/>
                            <a href="javascript:void(0);">
                                <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 12.8571L5 7.5L0 2.14286L1 0L8 7.5L1 15L0 12.8571Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="footer__menu">
                        <div className="col cal__menu">
                            <p className="col__title">Меню сайта:</p>
                            <Navigation />
                        </div>
                        <div className="col col__cat">
                            <p className="col__title">Категории:</p>
                            <ul>
                                <li><a href="javascript:void(0);">Бытовая химия</a></li>
                                <li><a href="javascript:void(0);">Косметика и гигиена</a></li>
                                <li><a href="javascript:void(0);">Товары для дома</a></li>
                                <li><a href="javascript:void(0);">Товары для детей и мам</a></li>
                                <li><a href="javascript:void(0);">Посуда</a></li>
                            </ul>
                        </div>
                        <div className="col col__price">
                            <p className="col__title">Скачать прайс-лист:</p>                        
                            <Button className='' icon={download}  text='Прайс-лист' />
                            <p className='col__subtitle'>Связь в мессенджерах:</p>
                            <div className="message">
                                <a href="javascript:void(0);">
                                    <img src={wa} alt="" />
                                </a>
                                <a  href="javascript:void(0);">
                                    <img src={tg} alt="" />
                                </a>
                            </div>                            
                        </div>
                        <div className="col col__contacts">
                            <p className="col__title">Контакты:</p>
                            <div className="contact">
                                <a className='link' href="javascript:void(0);">+7 (777) 490-00-91</a>
                                <p>время работы: 9:00-20:00</p>
                                <a className='call' href="javascript:void(0);">Заказать звонок</a>
                            </div>
                            <div className="contact">
                                <a className='link' href="javascript:void(0);">opt.sultan@mail.ru</a>
                                <p>На связи в любое время</p>
                            </div> 
                            <div className="cards">
                                <img src={Visa} alt="" />
                                <img src={mc} alt="" />
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
     );
}

export default Footer;