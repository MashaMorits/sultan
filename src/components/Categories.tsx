import { IFilter  } from '../models'
import { useAppDispatch, useAppSelector } from '../hooks';
import { filter } from '../store/productsSlice'
import { categories } from '../data/products';
import { useEffect, useState } from 'react';



function Categories() {


    const [activeCatList, setActiveCatList] = useState<string[]>([])
    let currentStore = useAppSelector(state => state.products)

    const dispatch = useAppDispatch();

    function getActiveCategories(){        
        setActiveCatList(currentStore.categories)
    }    
    

    function filterByCat(cat:string, event: React.MouseEvent<HTMLElement>) {
        let newList = [...activeCatList]

        if(newList.includes(cat)) {
            newList = newList.filter(item => item !== cat)
        } else {
            newList.push(cat)
        }

        let filterObj: IFilter = {
                    minPrice: currentStore.minPrice, 
                    maxPrice: currentStore.maxPrice, 
                    brands: currentStore.brands,
                    categories: newList
                   }

        dispatch(filter(filterObj))
    }

    useEffect(() => {
        getActiveCategories()
    }, [currentStore])
    

    return ( 
        <div className="categories">
        {
            categories.map((item: string, index) => {
                return (
                <p 
                    data-key={index}
                    key={index}
                    className={activeCatList.includes(item) ? 'active' : ''}
                    onClick={(event: React.MouseEvent<HTMLElement>) => filterByCat( item, event ) }
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