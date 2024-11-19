import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload
            const ExistsItem = state.cart.find((item) => item.id == product.id)
            if (ExistsItem) {
                state.cart[ExistsItem] += action.payload.quantity
            } else {
                state.cart.push(product)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeItem: (state, action) => {
            const product = action.payload
            state.cart = state.cart.filter((item) => item.id != product.id)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeAll: (state, action) => {
            state.cart = []
            localStorage.removeItem('cart')
        }
    }
})

export const { addItem, removeItem, removeAll } = cartSlice.actions

export default cartSlice.reducer