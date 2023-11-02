import Link from "next/link";
import View from "./style";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";

import { Groups, Checklist, Logout } from "@mui/icons-material";
import { useAuth } from "@/contexts/auth";

export default function Layout({ children }) {
  const router = useRouter();
  const { user, setUser } = useAuth();
  if (!user) {
    return <div>{children}</div>;
  }

  const handleRedirect = () => router.push("/login");

  const handleSignOut = () => {
    const fetchSignout = async () => {
      try {
        const response = await fetch(`/api/signout`, {
          method: "POST",
          credentials: "include",
        });

        const signedOut = await response.json();

        if (signedOut === "success") {
          handleRedirect();
          setUser();
        }
      } catch (err) {
        console.log("error in handleSignout");
      }
    };
    fetchSignout();
  };

  return (
    <View>
      <List>
        <Typography variant='h2'>Task Planner</Typography>
        <Link href='/'>
          <ListItemButton>
            <ListItemIcon>
              <Checklist />
            </ListItemIcon>
            Your Tasks
          </ListItemButton>
        </Link>
        <Link href='/explore'>
          <ListItemButton>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            Explore Page
          </ListItemButton>
        </Link>
        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Divider />
          <ListItemButton onClick={handleSignOut} sx={{ padding: "1rem" }}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Sign Out
          </ListItemButton>
        </div>
      </List>
      <Box className='layout--wrapper'>
        <Box className='layout--children-wrapper'>{children}</Box>
      </Box>
    </View>
  );
}
