
export interface IProduct {
    [key: string]: any,
    img: string,
    name: string,
    type:  string,
    size: number,
    barcode: number,
    manufacturer: string,
    brand: string,
    description: string,    
    price: string,
    categories: string[]
}

export interface IFilter {
    minPrice: number,
    maxPrice: number,
    brands: string[],
    categories: string[]
}

export interface ICartItem {
    product: IProduct,
    count: number,
}

export interface ProductState {
    products: IProduct[],
    minPrice: number,
    maxPrice: number, 
    brands: string[],
    categories: string[],
    totalCount:  number,
    totalPrice: number,
    cart: ICartItem[]
}

