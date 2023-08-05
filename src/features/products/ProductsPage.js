import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductAsync,
  fetchProductAsync,
  getAllProduct,
  getAllProductStatus,
  getDisplayProduct,
  getSingleProductStatus,
} from "./productSlice";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import ProductDisplay from "../../components/ProductDisplay";

function ProductItem({ item, fetchItem }) {
  return (
    <ListItem disablePadding disableGutters>
      <ListItemButton
        onClick={(evt) => {
          evt.preventDefault();
          fetchItem(item.url);
        }}
      >
        <span>{item.name}</span>
      </ListItemButton>
    </ListItem>
  );
}

function Products({ productList, fetchItem, isLoading }) {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component={Paper}
        variant="outlined"
        aria-label="contacts"
        dense
      >
        <Typography sx={{ mx: 2, my: 1 }} variant="h5" component="div">
          Product list
        </Typography>
        <Divider variant="middle" sx={{ mb: 2 }} />
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {productList?.map((productItem) => (
          <ProductItem
            key={productItem.url}
            fetchItem={fetchItem}
            item={productItem}
          />
        ))}
      </List>
    </>
  );
}

function ProductsPage() {
  const dispatch = useDispatch();
  const productToDisplay = useSelector(getDisplayProduct);
  const allProducts = useSelector(getAllProduct);

  const loadingStatus = useSelector(getAllProductStatus);

  const singleProductLoadingStatus = useSelector(getSingleProductStatus);

  const fetchItem = async (productURL) => {
    dispatch(fetchProductAsync(productURL));
  };

  console.log({ allProducts });

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(fetchAllProductAsync());
    }
  }, [allProducts]);

  return (
    <Grid
      container
      component="main"
      sx={{ mx: "auto", justifyContent: "space-between" }}
      display="flex"
    >
      <Grid item xs={4} sm={4}>
        <Products
          fetchItem={fetchItem}
          productList={allProducts}
          isLoading={loadingStatus === "loading"}
        />
      </Grid>
      <Grid item xs={7} sm={7}>
        {productToDisplay && (
          <ProductDisplay
            productToDisplay={productToDisplay}
            singleProductLoadingStatus={singleProductLoadingStatus}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default ProductsPage;
