import React from 'react';
import { Container, Typography, Button, Grid }  from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

import useStyles from './styles';


const Cart = ({ cart, update, remove, empty, product }) => {

    const classes = useStyles();

    const EmptyCart = () => {
        return(
        <Typography variant="subtitle1">You Have no items in your cart
             <Link to="/" className={classes.link}> <br/> <strong>Start by adding some !!!</strong>  </Link>
        </Typography>
        )}

    const FilledCart = () => {
     return(
        <>
        <Grid container spacing={2}>
            {cart.line_items.map((item) => {
           return (
               
                    <Grid item xs={10} sm={3} key={item.id}>
                        <CartItem 
                            product={product}
                            item={item}
                            remove={remove} 
                            update={update}
                        />
                    </Grid>

                    )
                })}
                    <div className={classes.cardDetails}>
                        <Typography variant="h4" gutterBottom >Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                        <div>
                            <Button className={classes.emptyButton} size='large' type="button" variant="contained" color="secondary" onClick={ empty } > Empty Cart </Button>
                            <Button className={classes.checkoutButton} component={Link} to="/checkout" size='large' type="button" variant="contained" color="primary" > Checkout </Button>
                        </div>
                      </div>
               
            
        </Grid>
        </>
    )}

    if( !cart.line_items ) return 'Loading...'

    return (
        <Typography>
            <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3" gutterBottom >Your Shopping Cart </Typography>
                { !cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
            </Container>
        </Typography>
    )
}

export default Cart;
