
import HankoStarterInfo from "../hanko starter components/HankoStarterInfo";
import HankoStarterHeader from "../hanko starter components/HankoStarterHeader";
import HankoProfile from "../components/HankoProfile";

import { type LoaderFunction, redirect } from "@remix-run/node";
import { ValidateCurrentSession } from "../services/auth.server";

export const loader: LoaderFunction = async ({request}) => {
    const hankoUrl = process.env.HANKO_API_URL || "";
    const validated = await ValidateCurrentSession(request , hankoUrl);

    if(!validated){
      return redirect("/");//Path to redirect to if user is not authenticated
    }

    return { hankoUrl: hankoUrl }; 
};

const ProfilePage = () => {
  return (
    <>
      <HankoProfile />
      <HankoStarterInfo />
      <HankoStarterHeader />
    </>  
    )
}

export default ProfilePage