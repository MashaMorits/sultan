

import Card from "../components/Card";
import Filters from './Filters';
import { useState } from 'react';
import { useAppSelector } from '../hooks';
import Pagination from "../UI/Pagination";



function Catalog() {

    let products = useAppSelector(state => state.products.products)
    let cardCount = products.length
    let perPage = 15
    let pageCount = Math.ceil(cardCount/perPage)
    let pages: number[] = []
    
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)      
    }
    
    const [currentPage, setCurrentPage] = useState(1)

    function apdatePage(x: number, type: string) {
        if (type === 'arrow') {
             if (currentPage === 1 && x < 0 || currentPage === pageCount && x > 0) {
                
            } else {
                setCurrentPage(currentPage + x)
            }
        } else {
            setCurrentPage(x)
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
                { pageCount>1 && <Pagination apdatePage={apdatePage} currentPage={currentPage} pages={pages} />}
            </div>
            
        </div>
     );
}

export default Catalog;