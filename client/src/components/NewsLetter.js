import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box sx={{ py: "10rem" }}>
      <Container>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Typography
              variant="h3"
              component="h3"
              sx={{ fontWeight: "semi-bold", mb: 3 }}
            >
              Join Our Newsletter!
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="text.secondary"
              lineHeight="2"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus, voluptatum quas eos, rem beatae veritatis voluptatem
              nam eum similique ducimus ad possimus? Deserunt non corrupti sed
              facilis numquam, consequuntur similique?
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ alignItems: "center", display: "flex" }}>
            <form
              style={{
                display: "flex",
                width: "100%",
              }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextField
                size="small"
                placeholder="example@gmail.com"
                sx={{ flexGrow: 1 }}
              ></TextField>
              <Button variant="contained" color="primary" disableElevation>
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
    // <Wrapper className="cenetent-center">
    //   <h1>Join Our NewsLetter!</h1>
    //   <div>
    //     <p>
    //       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
    //       voluptatum quas eos, rem beatae veritatis voluptatem nam eum similique
    //       ducimus ad possimus? Deserunt non corrupti sed facilis numquam,
    //       consequuntur similique?
    //     </p>

    //     <form onSubmit={(e) => handleSubmit(e)}>
    //       <input type="text" placeholder={"example@gmail.com"} />
    //       <button>Subscribe</button>
    //     </form>
    //   </div>
    // </Wrapper>
  );
};

export default NewsLetter;
