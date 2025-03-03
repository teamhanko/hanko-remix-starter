import { useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, } from "react";
import { register } from "../utils/hanko.client";

import "./hanko-style.css"

export const loader = () => {
    return { hankoUrl: process.env.HANKO_API_URL };
};

const HankoProfile = () => {
    const data = useLoaderData<typeof loader>();
    const hankoUrl = data.hankoUrl || '';

    useEffect(() => {
        register(hankoUrl).catch((error) => {
            // handle error
            console.log(error);
          });
    });

    return(
        <Suspense fallback={"Loading..."}>
            <hanko-profile />
        </Suspense>
    )
}
  
  export default HankoProfile;
  