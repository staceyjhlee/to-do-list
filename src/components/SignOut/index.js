import { useRouter } from "next/router";

const SignOutButton = () => {
  const router = useRouter();
  const handleRedirect = () => {
    "redirecting";
    router.push("/");
  };

  const handleSignOut = () => {
    const fetchSignout = async () => {
      try {
        const response = await fetch(`/api/signout`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          const signedOut = await response.json();

          if (signedOut === "success") {
            handleRedirect();
          }
        }
      } catch (err) {
        console.log("error in handleSignout");
      }
    };
    fetchSignout();
  };
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
