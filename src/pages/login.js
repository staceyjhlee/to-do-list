import AuthPage from "@/components/Auth";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/router";

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push({ pathname: "/" });
  }
  return <AuthPage />;
}
