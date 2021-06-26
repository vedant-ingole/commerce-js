import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import './styles.js';
import { Typography, Button, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Product from "../Products/Product/Product";
import { withRouter } from 'react-router';

import Spinner from '../Spinner/Spinner.jsx';

// import useStyles from './styles';

const CategoryView = ( props,{onAddToCart} ) => {

    // const classes = useStyles();

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    const [slug, setSlug] = useState(0);

    // const [loading, setLoading] = useState(false);

    const fetchCategory = async ( slug ) => {

        const category = await commerce.categories.retrieve( slug, { type: 'slug' });
        const { id, name } = category ;

        setCategory({
            id,
            name
        }) 
     
        const { data: productsData } = await commerce.products.list({ category_slug : [slug] });   
    
        setProducts(productsData);
    }



    useEffect(() => {
        // const slug = window.location.pathname.split('/');
        const catSlug = props.match.params.slug;
        console.log(catSlug);

        fetchCategory(catSlug); 
        // setSlug(catSlug);
    }, [slug] );

        console.log(slug);
        console.log(props.match.params.slug);

    
    return (

        <>
            <CssBaseline/>     
            {/* <AppBar> */}
            
           
                    
            <main>
                <div >
                    <Typography variant="h3" align="center" gutterBottom style={{marginTop:'70px'}}  > 
                            {category.name}
                    </Typography>
                    
                </div>
                    <Grid container spacing={2} justify="center">
                    {  products.map((product) => (

                                <Grid item key={product.id} xs={10} sm={3} md={3} lg={3}> 
                                         
                                         <Product
                                            product={product} 
                                            onAddToCart={onAddToCart} 
                                            />
                                 </Grid>
                        ))}
                        
                    </Grid>
               {/* { loading && <Spinner/> } */}
            </main>

            <button onClick={() => setSlug(slug+1)} >Click {slug} </button>
        </>
    )
}

export default withRouter(CategoryView);
