import React, { useEffect } from "react";
import ProductDisplay from "./ProductDisplay";

import { Box, CircularProgress, Grid } from "@mui/material";
import { fetchAllProductAsync, getAllProduct, getAllProductStatus } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ListOfProducts = () => {
  
  
  const dispatch = useDispatch();
  const loadingStatus = useSelector(getAllProductStatus);
  const allProducts = useSelector(getAllProduct);

  useEffect(() => {
    if(!allProducts || allProducts.length === 0) {
      dispatch(fetchAllProductAsync());
    }
    
    // const invokeProductsApi = async () => {
    //   try {
    //     setIsLoading(true);
    //     const products = await getAllProducts();
    //     setProducts(() => products);
    //     setIsLoading(false);
    //   } catch (error) {
    //     setProducts([]);
    //     setIsLoading(false);
    //   }
    // };
    // invokeProductsApi();
  }, [allProducts]);

  return (
    <>
      {console.log({loadingStatus})}
      {loadingStatus === 'loading' && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {allProducts.map((product) => (
        <Grid
          container
          item
          xs={10}
          sm={6}
          sx={{
            mx: "auto",
            mb: 2,
            "&:hover": {
              boxShadow: "0 0 0 3px #66B2FF",
              borderRadius: '12px'
            },
          }}
        >
          <ProductDisplay productToDisplay={product} />
        </Grid>
      ))}
    </>
  );
};

export default ListOfProducts;
