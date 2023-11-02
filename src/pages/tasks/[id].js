import TasksUI from "@/components/TasksUI";
import { useAuth } from "@/contexts/auth";
import PublicTasks from "@/components/PublicTasks";

const TaskPage = ({ id, todos }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const isUserOwner = userId == id;

  return isUserOwner ? (
    <TasksUI id={id} todos={todos} />
  ) : (
    <PublicTasks todos={todos} />
  );
};

export const getServerSideProps = async ({ query, req } ) => {
  const { id } = query;

  const response = await fetch(`http://localhost:5001/todo-list/${id}`);

  if (response.ok) {
    const todos = await response.json();
    return { props: { id, todos } };
  } else {
    return { notFound: true };
  }
};

export default TaskPage;
