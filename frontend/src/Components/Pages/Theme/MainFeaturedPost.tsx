import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { useTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme() as Theme;
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const variant = isXs ? "h4" : "h3";
  const textAlignCenter = isXs ? "center" : "start";

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
        borderRadius: 0,
        boxShadow: "none",
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
        <Grid sx={{ paddingInline: { xl: "11.5%" } }}>
          <Box
            sx={{
              p: { md: 1 },
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingBlockStart: { xs: 4 },
              position: "relative",
              display: isXs && "flex",
              flexDirection: isXs && "column",
              alignItems: isXs && "center",
            }}
          >
            <Typography
              component="h1"
              variant={variant}
              color="inherit"
              gutterBottom
              sx={{ fontFamily: "Open Sans" }}
            >
              {post.title}
            </Typography>
            <Typography
              color="inherit"
              paragraph
              sx={{
                fontFamily: "sans-serif",
                textAlign: textAlignCenter,
              }}
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
