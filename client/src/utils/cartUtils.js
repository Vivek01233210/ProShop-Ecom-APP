export const addDecimals = (num) =>{
    return (Math.round(num * 100)/ 100).toFixed(2);
}

export const updateCart = (state)=>{
    // Calculate price of all the items in the cart and save it in a variable in the state.
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    state.itemsPrice = itemsPrice;
    
    // Calculate shipping price (if order > ₹5000 --> shipping free, else ₹60 shipping fee)
    const shippingPrice = itemsPrice > 5000 ? 0 : 60;
    state.shippingPrice = shippingPrice;

    // Calculate tax price (15% tax)
    const taxPrice = Number(Math.round(0.15 * state.itemsPrice));
    state.taxPrice = taxPrice;


    // Calculate total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    state.totalPrice = totalPrice;

    // save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}