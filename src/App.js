import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout, ProductView, CategoryView } from './components';

const App = () => {

    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    
    const fetchProducts = async () => {
        const { data: products } = await commerce.products.list({ limit: 8}); 

        //Category
        const { data: categoriesData } =  await commerce.categories.list();
        // console.log(categoriesData);
        
        // const category = await commerce.categories.retrieve("cat_QG375vMaLorMOg");
        // console.log(category.slug);
        // console.log(category.description);
        
        const productsPerCatergory = categoriesData.reduce((acc, category) => {

            return [
                ...acc,
                {
                    ...category,
                    productsData: products.filter((product) =>
                    product.categories.find((cat) => cat.id === category.id
                )),
             }
            ]
        },[])
        // console.log(productsPerCatergory);
        

        setCategories(productsPerCatergory);
    }

    const fetchCart = async () => {

        setCart(await commerce.cart.retrieve());
        
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder =  await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            // setErrorMessage(error.data.error.message)
            console.log(error);
        }
    }

    const handelUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId,{quantity})

        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    // console.log(products);
    // console.log(cart);

    return (

        <BrowserRouter>

         <Navbar totalItems={cart.total_items}/>
         <Switch>

             <Route exact path="/">
                <Products categories={categories} onAddToCart={handleAddToCart} />
             </Route>
             <Route exact path="/cart">
                <Cart
                    cart={cart}
                    update ={handelUpdateCartQty}
                    remove ={handleRemoveFromCart}
                    empty ={handleEmptyCart} 
                    />
             </Route>
             <Route exact path="/checkout">
                <Checkout 
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage} />
             </Route>
             <Route exact path="/product-view/:id">
                 <ProductView onAddToCart={handleAddToCart} />
             </Route>
             <Route exact path="/category-view/:slug">
                 <CategoryView onAddToCart={handleAddToCart} />
             </Route>

         </Switch>
         </BrowserRouter>
        
    )
}

export default App;
