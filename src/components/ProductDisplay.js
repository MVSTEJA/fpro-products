import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ProductDisplay({ productToDisplay, singleProductLoadingStatus }) {
  return (
    <Card variant="outlined">
      {singleProductLoadingStatus === "loading" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            flexFlow: "column",
          }}
        >
          <CircularProgress />
        </Box>
      ) : Object.keys(productToDisplay).length > 0 ? (
        <>
          {" "}
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={productToDisplay.name}
            subheader={`${productToDisplay.population} population`}
          />
          <Divider variant="middle" />
          <CardContent>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 4 }}
              rowSpacing={2}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Grid item spacing={{ xs: 1, sm: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Day length
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {productToDisplay.rotation_period}
                </Typography>
              </Grid>
              <Grid item spacing={{ xs: 1, sm: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Year length
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {productToDisplay.orbital_period}
                </Typography>
              </Grid>
              <Grid item spacing={{ xs: 1, sm: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Climate
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {productToDisplay.climate}
                </Typography>
              </Grid>
              <Grid item spacing={{ xs: 1, sm: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Gravity
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {productToDisplay.gravity}
                </Typography>
              </Grid>
              <Grid item spacing={{ xs: 1, sm: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Terrain
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {productToDisplay.terrain}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button variant="contained" size="small">
              Invite to Apply
            </Button>
          </CardActions>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flexStart",
            textAlign: "center",
            m: 5,
            height: "100%",
            flexFlow: "column",
          }}
        >
          No item selected
        </Box>
      )}
    </Card>
  );
}

export default ProductDisplay;
