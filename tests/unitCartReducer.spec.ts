import { test, expect } from '@playwright/test'
import { cartReducer} from '../src/reducers/cart'

const fakeProduct = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
}

test.describe('unit tets for the cart reducer', () => {
    test('When add a product to cart the quantity must be aded', async () => {
        expect(cartReducer([], { 
            type: 'ADD_TO_CART', 
            payload: fakeProduct 
        })).toEqual([{ id: 1, quantity: 1 }])
    })
})

