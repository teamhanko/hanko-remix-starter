import { useNavigate, useLoaderData } from "@remix-run/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { register, type Hanko } from "../utils/hanko.client";

export const loader = () => {
    return { hankoUrl: process.env.HANKO_API_URL }; 
};

import "./hanko-style.css"

const HankoAuth = () => {
  const [hanko, setHanko] = useState<Hanko>();
  const navigate = useNavigate();

  const data = useLoaderData<typeof loader>();
  const hankoUrl = data.hankoUrl || '';

  const redirectAfterLogin = useCallback(() => {
      navigate("/dashboard");//Path user gets navigated to once they log in
  }, [navigate]);

  useEffect(() => {
      if (hanko) {
          hanko.onSessionCreated(() => {
              redirectAfterLogin();
          });
      }
  }, [hanko, redirectAfterLogin]);

  useEffect(() => {
      register(hankoUrl)
          .catch((error: Error) => {
              console.error(error.message);
          })
          .then((result) => {
              if (result) {
                  setHanko(result.hanko);
              }
          });
  }, [hankoUrl]);

  return (
      <div className="">
          <Suspense fallback={"Loading..."}>
              <hanko-auth />
          </Suspense>
      </div>
  );
};

export default HankoAuth;
