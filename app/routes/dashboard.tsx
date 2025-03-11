import HankoStarterInfo from "../hanko starter components/HankoStarterInfo";
import HankoStarterDashboard from "../hanko starter components/HankoStarterDashboard";
import HankoStarterHeader from "../hanko starter components/HankoStarterHeader";


import { type LoaderFunction, redirect } from "@remix-run/node";
import { ValidateCurrentSession } from "../lib/ValidateCurrentSession";

export const loader: LoaderFunction = async ({request}) => {
    const hankoUrl = process.env.HANKO_API_URL || "";
    const validated = await ValidateCurrentSession(request , hankoUrl);

    if(!validated){
      return redirect("/");//Path to redirect to if user is not authenticated
    }

    return { hankoUrl: hankoUrl }; 
};


const dashboardPage = () => {
  return (
    <>
      <HankoStarterInfo />
      <HankoStarterDashboard />
      <HankoStarterHeader />
    </>  )
}

export default dashboardPage