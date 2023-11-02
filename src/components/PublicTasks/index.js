import {
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { Container, Divider, List, ListItem, Typography } from "@mui/material";

export default function PublicTasks({ todos }) {
  const { username } = todos?.[0];
  const header = `${username}'s Todo List`;
  return (
    <Container
      sx={{
        flexDirection: "column",
        overflowY: "scroll",
        display: "flex",
        gap: "1rem",
        height: "100%",
      }}
    >
      <Typography variant='h4'>{header}</Typography>
      <List>
        {todos.map(({ todo, id, completed }, index) => {
          const isLast = index === todos.length - 1;

          const Component = completed ? CheckBox : CheckBoxOutlineBlank;
          return (
            <>
              <ListItem key={id}>
                {<Component sx={{ marginRight: "1rem" }} />}
                {todo}
              </ListItem>
              {!isLast && <Divider />}
            </>
          );
        })}
      </List>
    </Container>
  );
}
