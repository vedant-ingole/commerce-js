import React, { useState } from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import useStyles from './styles'
// import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import Product from './Product/Product';


// const products = [
//     {id:1, name:'Shoes', description:'running Shoes', price:'$50', image:"./images/shoes.jfif"},
//     {id:2, name:'Macbook', description:'Apple Macbook', price:'$1500', image:"./images/macbook.jfif"},
// ]


const Products = ({ categories, onAddToCart, cart }) => {

    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    // const fetchCategories = async () => {
    //     const { data: categoryData } = await
    // }
    // console.log(categories);
    

    return(
        <>

            <main className={classes.content}>
                <div className={classes.toolbar}/>
                
                {/*                         */}
                <div>
                    { categories.map((category) => (
                        <Link to={`/category-view/${category.slug}`}>
                           {category.name }  
                        </Link>
                    ))}
                </div>

                       {/*                    */}
                {
                    categories.map((category, index) => {
                        return (
                            <div 
                                style={{
                                    background: 
                                    index % 2 === 0 ?
                                    "linear-gradient(153deg, rgba(236,236,236,1) 0%, rgba(143,140,141,0.7860699771495347) 100%)"
                                    : "",
                                    marginBottom:"40px",
                                    borderRadius:'5px'
                                 }}
                            >
                                <Container id="products">
                                    <Typography className={classes.title} variant="h4" component="h2" >
                                        {category.name}
                                    </Typography>
                                    <Grid container justify="center" spacing={2}>     
                                        {
                                            category.productsData.map((product) => {
                                                return(
                                                    <>
                                                    <Grid item key={product.id} xs={10} sm={3} md={3} lg={3}>
                                                        <Product
                                                            product={product} 
                                                            onAddToCart={onAddToCart} />
                                                    </Grid> 
                                                    
                                                    </>
                                                )   
                                            })
                                        }
                                    </Grid>
                                </Container>
                        </div>
                        )
                    })
                }
                {/* { loading && <Spinner/>} */}
            </main>
    
        </> 
    )
          
    }

export default Products;