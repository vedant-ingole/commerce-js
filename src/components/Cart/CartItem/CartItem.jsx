import React from 'react';
import { Typography, Button, Card, CardActions, CardMedia, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles'

const CartItem = ({ item, remove, update, product }) => {

    const classes = useStyles();



    return (
        <Card className={classes.fullcard}>
            <Link className={classes.link}
                // to={`product-view/${product.id}`} 
             >
            <CardMedia   image={item.media.source} alt={item.name} className={classes.media}/>          
            </Link>
            <CardContent  className={classes.cardContent} >
                <Typography  vairant="h4"> {item.name} </Typography>
                <Typography vairant="h5"> {item.line_total.formatted_with_symbol} </Typography>
            </CardContent>
            <CardActions className={classes.cartActions} >
                <div className={classes.buttons} >
                    <Button type="button" size="size" onClick={() => update( item.id, item.quantity - 1)} > - </Button>
                    <Typography> {item.quantity} </Typography>
                    <Button type="button" size="size" onClick={() => update( item.id, item.quantity + 1)} > + </Button>
                </div>
                <Button variant="contained" type="button" color='secondary' onClick={() => remove(item.id)} > Remove </Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
