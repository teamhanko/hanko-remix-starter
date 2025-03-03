
import HankoStarterInfo from "../hanko starter components/HankoStarterInfo";
import HankoStarterHeader from "../hanko starter components/HankoStarterHeader";
import HankoProfile from "../components/HankoProfile";

import { type LoaderFunction, redirect } from "@remix-run/node";
import { ValidateCurrentSession } from "../test/ValidateCurrentSession";

export const loader: LoaderFunction = async ({request}) => {
    const hankoUrl = process.env.HANKO_API_URL || "";
    const validated = await ValidateCurrentSession(request , hankoUrl);

    if(!validated){
      return redirect("/");
    }

    return { hankoUrl: hankoUrl }; 
};

const profilePage = () => {
  return (
    <>
      <HankoProfile />
      <HankoStarterInfo />
      <HankoStarterHeader />
    </>  
    )
}

export default profilePage