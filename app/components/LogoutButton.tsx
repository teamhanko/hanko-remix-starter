import { useLoaderData, useNavigate } from "@remix-run/react";

import { useEffect, useState, } from "react";
import { type Hanko, } from "../utils/hanko.client";


export const loader = () => {
    return { hankoUrl: process.env.HANKO_API_URL };
};

const LogoutButton = () => {

    const data = useLoaderData<typeof loader>();
    const hankoUrl = data.hankoUrl || '';

    const navigate = useNavigate();
    const [hanko, setHanko] = useState<Hanko>();
  
    useEffect(() => {
      import("@teamhanko/hanko-elements").then(({ Hanko }) =>
        setHanko(new Hanko(hankoUrl ?? ""))
      );
    }, []);

    const logout = async () => {
        try {
            await hanko?.logout();

            navigate("/");//Path the user will be redirected to once logged out
            
            return;
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return <button onClick={logout}>Sign-Out</button>;
}
  
  export default LogoutButton;
  