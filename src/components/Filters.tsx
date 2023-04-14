import Categories from "../components/Categories";
import { ChangeEvent, useEffect, useState } from 'react';
import { IFilter } from '../models'
import { useAppDispatch, useAppSelector } from '../hooks';
import { filter } from '../store/productsSlice'
import { brands } from '../data/products'
import store from '../store';
import Sort from "./Sort";
import arrow from '../images/arrow.svg'



let min: number = 0
let max: number = 100000




function Filters() {

    const dispatch = useAppDispatch()
    const [ activeBrands, setActiveBrands ] = useState(useAppSelector(state => state.products.brands))
    const [ brandList, setBrandList] = useState([...brands]) 
    const [ minPrice, setMinPrice ] = useState(useAppSelector(state => state.products.minPrice))
    const [ maxPrice, setMaxPrice ] = useState(useAppSelector(state => state.products.maxPrice))
    const [ show, setShow ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)
   

    // let activeBrands = useAppSelector(state => state.products.brands)
    
    let filterBrands: string[] = [...activeBrands]

    const windowOuterWidth = window.outerWidth

    function checkHandle(newBrand: string, event: ChangeEvent<HTMLInputElement>) { // параметры фильтрации
        
        event.target.checked ? filterBrands.push(newBrand) : filterBrands = filterBrands.filter(brand =>  brand !== newBrand)
        setActiveBrands(filterBrands)
    }

    function filterPrice(minPrice: number, maxPrice: number, filterBrands: string[]){ // Фильтрация товаров
       
        if (filterBrands.length == 0) {
            filterBrands= [...brands]
        }

        let filterObj: IFilter = {
             minPrice: minPrice, 
             maxPrice: maxPrice, 
             brands: filterBrands,
             categories: [...store.getState().products.categories]
            }

    
        dispatch(filter(filterObj))
    }

    function removeFilters() {
        setMinPrice(min)
        setMaxPrice(max)
        setActiveBrands([])
        setBrandList([...brands])

        let filterObj: IFilter = {
            minPrice: min, 
            maxPrice: max, 
            brands: [],
            categories: []
           }

   
       dispatch(filter(filterObj))
    }

    

    function searchBrand(value: string) { // поиск бренда из списка
        
        if ( value.trim().length > 0 ) {

            let searchBrands = brands.filter((brand) =>{ 
                return brand.toLowerCase().includes(value.toLowerCase())
            })
            
            setBrandList(searchBrands)

        } else {
            setBrandList([...brands])
        } 


    }

    useEffect(() => {
        if(windowOuterWidth > 1199) {
            setIsOpen(true)
        }
    }, [])

  

    return ( 
        <div className="filters">
            <h2>Подбор по параметрам</h2>
            <div className="clickable" onClick={() => setIsOpen(prev=> !prev)} >
                <p>Подбор по параметрам</p>
                <div className={isOpen ? 'arrow active' : "arrow"}>
                    <img src={arrow} alt="" />
                </div>
            </div>
            {isOpen && <div className="filters__wrap">
                <p>Цена <b>₸</b></p>
                <div className="filters__price">
                    <input 
                        type="text" 
                        id="min" 
                        placeholder="0"
                        value={minPrice}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setMinPrice(+event.target.value)}
                        onInput={(event: ChangeEvent<HTMLInputElement>) => event.target.value = event.target.value.replace(/[^\d.]/g, '')}
                    />
                    <p>-</p>
                    <input 
                        type="text" 
                        id="max" 
                        value={maxPrice}
                        placeholder="10000"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>  setMaxPrice(+event.target.value)}
                        onInput={(event: ChangeEvent<HTMLInputElement>) => event.target.value = event.target.value.replace(/[^\d.]/g, '')}
                    />
                    
                </div>
                
                <div className="filters__brand">
                    <p className="filters__title">Производитель</p>

                    <div className="search">
                        <input type="text" placeholder='Поиск...' onChange={(e) => searchBrand(e.target.value) } />
                        <a href="">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5294 15.5294L12.0989 12.0928L15.5294 15.5294ZM14 7.5C14 9.22391 13.3152 10.8772 12.0962 12.0962C10.8772 13.3152 9.22391 14 7.5 14C5.77609 14 4.12279 13.3152 2.90381 12.0962C1.68482 10.8772 1 9.22391 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5V7.5Z" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
                            </svg>
                        </a>
                    </div>
                
                    
                    <div className="brandList">
                        {                        
                            brandList.map((brand, index) => {
                                if(show === false && index < 4 || show) {
                                    return (
                                        <label key={brand + index}>
                                            <input 
                                                type="checkbox"
                                                checked= {activeBrands.includes(brand) ? true : false}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => checkHandle(brand, event)}
                                            />
                                            { brand }
                                        </label>
                                    )
                                }                   
                            })
                        }
                    
                        <div className="show" onClick={() => setShow(prev => !prev)}>Показать все</div>                  
                        
                    </div>         
        
                </div>

                <div className="row">
                    <div className="button" data-testid='showBtn' 
                            onClick={(event: React.MouseEvent<HTMLElement>) => filterPrice( minPrice, maxPrice, filterBrands) }
                        >
                            <p>Показать</p>
                    </div>
                    <div className="del" data-testid='del'
                        onClick={() => removeFilters()}
                    >                                
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.625 6.25H20.3125C20.5197 6.25 20.7184 6.33231 20.8649 6.47882C21.0114 6.62534 21.0938 6.82405 21.0938 7.03125C21.0938 7.23845 21.0114 7.43716 20.8649 7.58368C20.7184 7.73019 20.5197 7.8125 20.3125 7.8125H19.4484L18.2734 18.4C18.1673 19.3555 17.7125 20.2384 16.9961 20.8795C16.2797 21.5207 15.352 21.8751 14.3906 21.875H10.6094C9.64797 21.8751 8.72029 21.5207 8.00389 20.8795C7.28749 20.2384 6.8327 19.3555 6.72656 18.4L5.55 7.8125H4.6875C4.4803 7.8125 4.28159 7.73019 4.13507 7.58368C3.98856 7.43716 3.90625 7.23845 3.90625 7.03125C3.90625 6.82405 3.98856 6.62534 4.13507 6.47882C4.28159 6.33231 4.4803 6.25 4.6875 6.25H9.375C9.375 5.4212 9.70424 4.62634 10.2903 4.04029C10.8763 3.45424 11.6712 3.125 12.5 3.125C13.3288 3.125 14.1237 3.45424 14.7097 4.04029C15.2958 4.62634 15.625 5.4212 15.625 6.25ZM12.5 4.6875C12.0856 4.6875 11.6882 4.85212 11.3951 5.14515C11.1021 5.43817 10.9375 5.8356 10.9375 6.25H14.0625C14.0625 5.8356 13.8979 5.43817 13.6049 5.14515C13.3118 4.85212 12.9144 4.6875 12.5 4.6875ZM10.1562 10.9375V17.1875C10.1562 17.3947 10.2386 17.5934 10.3851 17.7399C10.5316 17.8864 10.7303 17.9688 10.9375 17.9688C11.1447 17.9688 11.3434 17.8864 11.4899 17.7399C11.6364 17.5934 11.7188 17.3947 11.7188 17.1875V10.9375C11.7188 10.7303 11.6364 10.5316 11.4899 10.3851C11.3434 10.2386 11.1447 10.1562 10.9375 10.1562C10.7303 10.1562 10.5316 10.2386 10.3851 10.3851C10.2386 10.5316 10.1562 10.7303 10.1562 10.9375ZM14.0625 10.1562C13.8553 10.1562 13.6566 10.2386 13.5101 10.3851C13.3636 10.5316 13.2812 10.7303 13.2812 10.9375V17.1875C13.2812 17.3947 13.3636 17.5934 13.5101 17.7399C13.6566 17.8864 13.8553 17.9688 14.0625 17.9688C14.2697 17.9688 14.4684 17.8864 14.6149 17.7399C14.7614 17.5934 14.8438 17.3947 14.8438 17.1875V10.9375C14.8438 10.7303 14.7614 10.5316 14.6149 10.3851C14.4684 10.2386 14.2697 10.1562 14.0625 10.1562Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>}            
            
            <Categories />
            <Sort />
        </div>
     );
}

export default Filters;