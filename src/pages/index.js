import { useAuth } from "@/contexts/auth";
import TasksUI from "../components/TasksUI";
import AuthPage from "@/components/Auth";

export default function Home() {
  const { user } = useAuth();

  return user && <TasksUI id={user.id} />;
}
