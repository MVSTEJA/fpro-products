import * as React from "react";
import Container from "@mui/material/Container";

import ProductsPage from "./features/products/ProductsPage";
import NavBar from "./components/NavBar";
import ListOfProducts from "./components/ListOfProducts";

export default function App() {
  const [page, setPage] = React.useState('selectProduct');

  const handleChange = (event, newpage) => {
    setPage(newpage);
  };

  const appPages = {
    'selectProduct': <ProductsPage />,
    'productCards': <ListOfProducts /> 
  }
  return (
    <>
      <NavBar page={page} handleChange={handleChange} />
      <Container
        disableGutters
        fixed
        maxWidth="md"
        sx={{ mx: "auto", my: 2, p: 2 }}
      >
        {appPages[page]}
      </Container>
    </>
  );
}
