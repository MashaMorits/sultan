import { categories } from './../data/products';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { brands, productsList } from '../data/products'
import {IProduct, IFilter, ICart} from '../models'

let products: IProduct[] = localStorage.products && JSON.parse(localStorage.products)


export const initialState = {
  products: products || productsList,
  minPrice: 0,
  maxPrice: 100000, 
  brands: brands,
  categories: categories,
  totalCount:  0,
  totalPrice: 0
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
     
      sort: (state, action: PayloadAction<IProduct[]>) => {
        
        let sortArr = {...state}
        sortArr.products = action.payload
        
        return state={...sortArr }

      },

      filter: (state, action: PayloadAction<IFilter>) => {
        
        let filtered = {...state}        

        filtered.brands = [...action.payload.brands]
        filtered.products = initialState.products
        filtered.minPrice = action.payload.minPrice
        filtered.maxPrice = action.payload.maxPrice
        filtered.categories =[ ...action.payload.categories]

        if ( !action.payload.categories.length ) {
          filtered.categories = [...initialState.categories]
        }        

        filtered.products = filtered.products.filter(product => {
          
            return (action.payload.brands.includes(product.brand) && +product.price < action.payload.maxPrice && +product.price > action.payload.minPrice)
                   
        })

        let filterProducts: IProduct[] = []

        filtered.categories.forEach( categorie => {
          filtered.products.forEach( product => {
            if (product.categories.includes(categorie) && filterProducts.indexOf(product)<0){
              filterProducts.push(product)
            }
          })
        })

        filtered.products=[...filterProducts]

        return state={...filtered}
      },

      setCart: (state, action: PayloadAction<ICart[]>) => {
        
        if (action.payload !== undefined && action.payload.length > 0) {

          let newCart = {...state}
          let count = 0
          let price = 0
          
          action.payload.forEach(el => {          
            let product = JSON.parse(el.product)          
            count += +el.count
            price += +product.price * +el.count
          })

          newCart.totalCount = count
          newCart.totalPrice = price

          return state = {...newCart}
        }
        
      }
     
    },
  })
  
  export const { sort, filter, setCart } = productsSlice.actions

  
  export default productsSlice.reducer


  
  