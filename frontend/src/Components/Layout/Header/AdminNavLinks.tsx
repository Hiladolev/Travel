import { Box } from "@mui/material";
import SingleNavLink from "./SingleNavLink";

const adminPages = ["Add", "Reports"];

function AdminNavLinks(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
      {adminPages.map((page) => (
        <SingleNavLink key={page} path={page} />
      ))}
    </Box>
  );
}
export default AdminNavLinks;
