
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import arrow from '../images/arrow.svg'

function Breadcrumbs() {
 

    const location = useLocation()
    const navigate = useNavigate()
    
    const windowOuterWidth = window.outerWidth

    let breadcrumbs = <><p>Главная</p>
                        <Link to="/"
                        className={"breadcrumb-not-active"}
                        >
                        Косметика и гигиена
                        </Link></>

    if (windowOuterWidth > 1199) {        

        if(location.pathname.includes('cart')){
            breadcrumbs = <><p>Главная</p>
                            <Link to="/"
                            className={"breadcrumb-active"}
                            >
                            Косметика и гигиена
                            </Link>
                            <Link to="/cart"
                            className={ "breadcrumb-not-active"}
                            >
                            Корзина
                            </Link></>
        }
    } else {
        breadcrumbs = <div className="goBack" onClick={() => navigate(-1)}>   
                            <div className="arrow">
                                <img src={arrow} alt="" />  
                            </div>                      
                            <span>Назад</span>
                        </div>
    }

    

    return ( 
        <div className="breadcrumbs">            
            {breadcrumbs}
        </div>
     );
}

export default Breadcrumbs;