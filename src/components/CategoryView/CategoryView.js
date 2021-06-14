import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce'

const CategoryView = (  ) => {

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    const fetchCategory = async ( slug ) => {
        console.log(slug);

        const category = await commerce.categories.retrieve( slug, { type: 'slug' })
        
        console.log(category.id);
        const { id, name } = category ;

        setCategory({
            id,
            name,
            slug  }) }

    const fetchProducts = async ( slug ) => {
        const { data: productsData } = await commerce.products.list({ category_slug : slug}); 
        
        console.log( productsData );    }



    useEffect(() => {
        const slug = window.location.pathname.split('/');
        fetchCategory(slug[2]); 
        fetchProducts();
    }, [])
    
    
    return (
        <div>
            <h1 
            style={{marginTop:'70px'}}>Category: {category.name} 
            </h1>

            <div>
                  {  products.map((product) => (
                      <p>{product.name}</p>
                      ))
                    }
            </div>

        </div>
    )
}

export default CategoryView;

// const productInCategory = await productsData.filter((product) => {
    
    
//     return (       
//         product.categories.find((cat, i, arr) => { 
//                if(!category) return console.log('noooooo');
//                  return( cat.id === category.id )
//     })
// )},[]);

// console.log(productInCategory);


// setProducts(productInCategory);

// console.log(products);