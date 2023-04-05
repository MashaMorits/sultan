
import Categories from "../components/Categories";
import { IProduct } from '../models'
import { useAppSelector } from '../hooks';
import Catalog from "../components/Catalog";
import Sort from "../components/Sort";
import Breadcrumbs from "../components/breadcrumbs";


function CatalogPage() {
    
    let products: IProduct[] = useAppSelector(state => state.products.products)
    let activeCat = [...useAppSelector(state => state.products.categories)]
    
    
    
    return ( 
        
        <>
            <Breadcrumbs />  
            <div className="pageCatalog">
                <div className="row">
                    <h1>Косметика и гигиена</h1>               
                    <Sort />
                </div>
                

                
                <Categories activeCat={ activeCat }/>
                <Catalog products={products} />
            </div>
        </>
        
     );
}

export default CatalogPage;