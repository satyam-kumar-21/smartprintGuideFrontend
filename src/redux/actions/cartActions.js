
import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

// Sync cart from backend after login
export const fetchCartFromBackend = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    if (!userInfo) return;
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        data.forEach(item => {
            dispatch({
                type: CART_ADD_ITEM,
                payload: item,
            });
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (e) {
        // ignore
    }
};

// Save cart to backend after add/remove
const syncCartToBackend = async (cartItems, userInfo) => {
    if (!userInfo) return;
    try {
        // Replace all items in backend cart
        await axios.delete(`${import.meta.env.VITE_API_URL}/cart`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        for (const item of cartItems) {
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
                product: item.product,
                qty: item.qty,
            }, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        }
    } catch (e) {
        // ignore
    }
};


export const addToCart = (idOrSlug, qty) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${idOrSlug}`);

    const item = {
        product: data._id,
        title: data.title,
        image: data.images && data.images.length > 0 ? data.images[0] : '',
        price: data.price,
        countInStock: data.countInStock,
        slug: data.slug,
        qty,
    };

    dispatch({
        type: CART_ADD_ITEM,
        payload: item,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    // Sync to backend
    await syncCartToBackend(getState().cart.cartItems, userInfo);
};


export const removeFromCart = (id) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    // Sync to backend
    await syncCartToBackend(getState().cart.cartItems, userInfo);
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });


    localStorage.setItem('paymentMethod', JSON.stringify(data));
};


export const clearCart = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    localStorage.removeItem('cartItems');
    dispatch({ type: CART_CLEAR_ITEMS });
    if (userInfo) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cart`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        } catch (e) {}
    }
};
