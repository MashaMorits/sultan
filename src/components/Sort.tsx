import { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { sort } from '../store/productsSlice'
import { IProduct } from '../models'

function Sort() {


    let products: IProduct[] = useAppSelector(state => state.products.products)
    const dispatch = useAppDispatch();


    let sortHandler = (event: ChangeEvent<HTMLSelectElement>) => { // Сортировка товаров

        let target = event.target.value
        let sortedProduct: IProduct[] = [...products]

        if ( target === 'ASC' ) {
            sortedProduct.sort((x, y) => x.name.localeCompare(y.name))
            
        } else if ( target === 'DESC' ) {
            sortedProduct.sort((x, y) => y.name.localeCompare(x.name))
            
        } else if ( target === 'priceUp' ) {
            sortedProduct.sort((x, y) => +x.price - +y.price)
            
        } else if ( target === 'priceDown' ) {
            sortedProduct.sort((x, y) =>  +y.price - +x.price)
            
        }

        dispatch(sort(sortedProduct))
    }

    return ( 
        <div className="sort">
            <p>Сортировка:</p>
            <select 
                name="" 
                id=""
                onChange={(event: ChangeEvent<HTMLSelectElement>) => sortHandler(event)}
            >
                <option value="ASC">Название ↑</option>
                <option value="DESC">Название ↓</option>
                <option value="priceUp">Цена ↑</option>
                <option value="priceDown">Цена ↓</option>
            </select>
        </div>
     );
}

export default Sort;