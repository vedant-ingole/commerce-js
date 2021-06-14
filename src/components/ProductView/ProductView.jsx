import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import Spinner from '../Spinner/Spinner'
import './style.css';
import Product from '../Products/Product/Product';
import { ShoppingCart } from '@material-ui/icons';
import { commerce } from '../../lib/commerce';


const createMarkUp = (text) => {
    return { __html: text};
}

const ProductView = ({ onAddToCart }) => {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async ( id ) => {
        const response = await commerce.products.retrieve(id);
        const { name, price, media, quantity, description } = response;

        setProduct({
            id,
            name, 
            quantity, 
            description,
            src: media.source,
            price: price.formatted_with_symbol, 
        })
    } ; 

    useEffect(() => {
        const id = window.location.pathname.split('/');
        fetchProduct(id[2]); 
        
    }, [])

    const  handleQunatity = (param) => {
        if(param === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if(param === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        }
    } 

    return (
        <Container className="product-view" >
            <Grid container spacing={4} >
                <Grid item xs={12} md={7} className="image-wrapper" > 
                    <img 
                    onLoad={() => (
                        setLoading(false)
                    )}
                    src={product.src} 
                    alt={product.name} 
                    />
                </Grid>

                <Grid item xs={12} md={4} className="text" >
                    <Typography variant="h2" > {product.name}</Typography>
                    <Typography variant="p" dangerouslySetInnerHTML={createMarkUp(product.description)}/>
                    <Typography variant='h3' >  { product.price ? 'Price:' : ''  } {product.price}</Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <Button 
                                size="small"
                                variant="container"
                                className="increase-product-quantity"
                                onClick={() => {
                                    handleQunatity('increase')
                                }}
                             >
                                  { product.price ? '+' : ''  }
                             </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="quantity" variant="h3">
                            { product.price ? quantity : ''  }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                size="small"
                                variant="container"
                                color='secondary'
                                onClick={() => {
                                    handleQunatity('decrease')
                                }}
                             >
                               {/* { '-' ? loading : "" } */}
                               { product.price ? '-' : ''  }
                             </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <Button 
                                size="large"
                                className="custom-button"
                                onClick={() => {
                                    onAddToCart(product.id, quantity)
                                }}
                            >
                                 { product.price ? <ShoppingCart/>  : ''  }
                                 { product.price ? 'Add to Cart'  : ''  }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            { loading && <Spinner/>}
        </Container>
    )
}

export default ProductView;
