
import { categories, brands } from './../data/products';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { productsList } from '../data/products'
import {IProduct, IFilter, ProductState, ICartItem} from '../models'

let products: IProduct[] = localStorage.products && JSON.parse(localStorage.products)


export const initialState: ProductState = {
  products: products || productsList,
  minPrice: 0,
  maxPrice: 100000, 
  brands:  [],
  categories: [],
  totalCount:  0,
  totalPrice: 0,
  cart: []
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
          filtered.categories = [...categories]
        }   
        
        if ( !action.payload.brands.length ) {
          filtered.brands = [...brands]
        } 

        filtered.products = filtered.products.filter(product => {
          
            return (filtered.brands.includes(product.brand) && +product.price < action.payload.maxPrice && +product.price > action.payload.minPrice)
                   
        })

        let filterProducts: IProduct[] = []

        filtered.categories.forEach( categorie => {
          filtered.products.forEach( product => {
            if (product.categories.includes(categorie) && filterProducts.indexOf(product)<0){
              filterProducts.push(product)
            }
          })
        })

        filtered.categories =[ ...action.payload.categories]
        filtered.brands = [...action.payload.brands]
        filtered.products=[...filterProducts]

        return state={...filtered}
      },

   

      apdateCartState: (state, action: PayloadAction<ICartItem[]>) => {
        console.log(action.payload)

        let newCart = {...state}
        let count = 0
        let price = 0

        newCart.cart = [...action.payload]

        action.payload.forEach(el => {          
          let product = el.product          
          count += el.count
          price += +product.price * el.count
        })

        newCart.totalCount = count
        newCart.totalPrice = price

        return state = {...newCart}
      }           
    },
  })
  
  export const { sort, filter, apdateCartState } = productsSlice.actions

  
  export default productsSlice.reducer


  
  