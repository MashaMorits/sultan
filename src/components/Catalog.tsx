import { IProduct } from '../models'
import Card from "../components/Card";
import Filters from './Filters';
import { useState } from 'react';

interface CatalogProps {
    products: IProduct[]
}

function Catalog({products}: CatalogProps) {

    let cardCount = products.length
    let perPage = 15
    let pageCount = Math.ceil(cardCount/perPage)
    let pages: number[] = []
    
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)      
    }
    
    const [currentPage, setCurrentPage] = useState(1)

    function apdatePage(x: number) {
        
        if (currentPage === 1 && x < 0 || currentPage === pageCount && x > 0) {
            
        } else {
            setCurrentPage(currentPage + x)
        }
    }

   
    
    return ( 
        <div className="catalog">          

            <Filters />
            <div className="catalog__wrap">
                <div className="page">
                    {
                        products.map((product, index) => {
                            if( perPage*(currentPage - 1) <= index &&  index < perPage*currentPage ) {
                                return  <Card product={ product } key={ product.barcode } />
                            }})
                    }
                </div> 
                { pageCount>1 && <div className="pagination">
                    <div className='prev' onClick={() => apdatePage(-1)}>
                        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2.28571L3.375 8L9 13.7143L7.875 16L2.54292e-07 8L7.875 9.83506e-08L9 2.28571Z" fill="#FFC85E"/>
                        </svg>
                    </div>

                    {pages.map(page => {
                        return <div className={page===currentPage ? 'pagination__item current' : 'pagination__item'} onClick={() => setCurrentPage(page)}><span>{page}</span></div>
                    })}

                    <div className='next' onClick={() => apdatePage(1)}>                        
                        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13.7143L5.625 8L0 2.28571L1.125 0L9 8L1.125 16L0 13.7143Z" fill="#FFC85E"/>
                        </svg>
                    </div>
                </div>}
            </div>
            
        </div>
     );
}

export default Catalog;