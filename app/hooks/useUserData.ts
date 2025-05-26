import { useState, useEffect } from "react";
import { Hanko } from "@teamhanko/hanko-elements";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
  return { hankoUrl: process.env.HANKO_API_URL }; 
};

interface HankoUser {
  id: string;
  email: string | undefined;
  loading: boolean;
  error: string | null;
}

export function useUserData(): HankoUser {
  const data = useLoaderData<typeof loader>();
  const hankoUrl = data.hankoUrl || '';

  const [hanko, setHanko] = useState<Hanko>();
  const [userState, setUserState] = useState<HankoUser>({
    id: "",
    email: "",
    loading: true,
    error: null,
  });

  useEffect(() => setHanko(new Hanko(hankoUrl)), []);

  useEffect(() => {
    hanko?.getUser().then((user) =>{
      setUserState({ 
        id: user.user_id ?? "Undefined", 
        email: user.emails?.[0].address ?? "Undefined",
        loading: false,
        error: null
      });
    }).catch((error) => {
      setUserState((prevState) => ({ ...prevState, loading: false, error }));
    })
    
  }, [hanko]);

  return userState;
}
