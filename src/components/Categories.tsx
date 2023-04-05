import { IFilter  } from '../models'
import { useAppDispatch } from '../hooks';
import { filter } from '../store/productsSlice'
import { categories } from '../data/products';
import store from '../store';
import { useEffect, useState } from 'react';


let catList: string[] = []

interface ICatProp {
    activeCat: string[]
} 

function Categories(props: ICatProp) {


    const [activeCatList, setActiveCatList] = useState<string[]>([])
    let currentStore = store.getState()

    const dispatch = useAppDispatch();

    function getActiveCategories(){
        if (props.activeCat.length < categories.length) {
            setActiveCatList(props.activeCat)
        }
    }    
    
    function filterCat(cat:string, event: React.MouseEvent<HTMLElement>) {
        

        if(event.currentTarget.classList.contains('active')){
            catList.splice(catList.indexOf(cat), 1)           
        } else {
            catList.push(cat)
        }

        event.currentTarget.classList.toggle('active')

        let filterObj: IFilter = {
            minPrice: currentStore.products.minPrice, 
            maxPrice: currentStore.products.maxPrice, 
            brands: currentStore.products.brands,
            categories: catList
           }

        setActiveCatList(catList)
   
       dispatch(filter(filterObj))
    }

    useEffect(() => {
        getActiveCategories()
    }, [props])

    return ( 
        <div className="categories">
        {
            categories.map((item: string, index) => {
                return (
                <p 
                    data-key={index}
                    key={index}
                    className={activeCatList.includes(item) ? 'active' : ''}
                    onClick={(event: React.MouseEvent<HTMLElement>) => filterCat( item, event ) }
                >
                    {item}
                </p>
                )
            })
        }
        </div>
     );
}

export default Categories;