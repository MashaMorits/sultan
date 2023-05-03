
import Categories from "../components/Categories";
import Catalog from "../components/Catalog";
import Sort from "../components/Sort";
import Breadcrumbs from "../components/breadcrumbs";


function CatalogPage() {
        
    return ( 
        
        <>
            <Breadcrumbs />  
            <div className="pageCatalog">
                <div className="row">
                    <h1>Косметика и гигиена</h1>               
                    <Sort />
                </div>     
                
                <Categories />
                <Catalog/>
            </div>
        </>
        
     );
}

export default CatalogPage;