import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles'
import { Link, useLocation, Route, BrowserRouter } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import Product from '../Products/Product/Product.js';
import { CategoryViews } from '..';


const Navbar = ({ totalItems, categories, onAddToCart }) => {

    const classes = useStyles();
    const location = useLocation();

    // console.log(categories);

     return (
        <>

                {/* <div>
                    { categories.map((category) => (
                        <Link to={`/category-view/${category.slug}`}>
                           {category.name }  
                        </Link>
                    ))}
                </div> */}
        
                <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color='inherit' >
                        <img 
                            src='data:image/png;base64,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' 
                            alt="product"height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    
                
                    <div className={classes.grow}/>

                            <div>
                                {/* <BrowserRouter> */}
                                { categories.map((category) => (
                                  
                                    <Link className={classes.links} key={category.id} to={`/category-view/${category.slug}`}>
                                       {category.name }  
                                    </Link>
                                ))}
                            </div>
        


                   
                   {location.pathname === '/' && ( 
                    <div className={classes.button}>
                    
                        <IconButton component={Link} to="/cart" aria-label="Show cart Items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;

