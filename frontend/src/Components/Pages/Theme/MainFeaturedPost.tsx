import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";

const color = blue[700];

interface MainFeaturedPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: color,
        color: "#fff",
        mb: 3,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundImage: `url(${post.image})`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              marginInlineStart: "45px",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ fontFamily: "Open Sans" }}
            >
              {post.title}
            </Typography>
            <Typography
              color="inherit"
              paragraph
              sx={{ fontFamily: "sans-serif" }}
            >
              {post.description}
            </Typography>
            <Link
              variant="subtitle1"
              color="inherit"
              href="https://github.com/Hiladolev"
            >
              {post.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
