import { FactCheck } from "@mui/icons-material";
import {
  Container,
  Icon,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function ExploreUI({ list }) {
  return (
    <Container sx={{ height: "100%" }}>
      <Typography variant='h3'>Explore Page</Typography>
      <List>
        {list.map(({ username, userId, items }) => {
          const text = `${username}'s ${items} Tasks`;
          return (
            <Link
              key={userId}
              style={{ width: "100%" }}
              href={`/tasks/${userId}`}
            >
              <ListItem
                divider
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemButton>
                  <FactCheck sx={{ marginRight: "1rem" }} />
                  {text}
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Container>
  );
}
