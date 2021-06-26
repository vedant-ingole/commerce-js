import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
// import Spinner from '../../Spinner/Spinner.jsx';

import useStyles from './styles'


const Product = ({ product, onAddToCart, cart }) => {

    const classes = useStyles();

    return (
        <>
        <Card className={classes.root}>
            <Link className={classes.link} to={`product-view/${product.id}`} >
                <CardMedia 
                className={classes.media} 
                image={product.media.source}
                title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" >
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                <Typography variant="h3" className={classes.view} >View</Typography>
                        <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color='textSecondary' />
                </CardContent>
            </Link>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart/>
                    </IconButton>
                </CardActions>
        </Card>
        </>
    )
}

export default Product;
