import HankoAuth from "../components/HankoAuth";
import HankoStarterInfo from "../hanko starter components/HankoStarterInfo";

export const loader = () => {
  return { hankoUrl: process.env.HANKO_API_URL }; 
};

export const meta = () => {
  return [
    { title: "Hanko Remix Starter" },
    { name: "description", content: "This is a starter repo with an implemention of Hanko in Remix" },
  ];
};

export default function Index() {
  return (
    <>
      <HankoAuth />
      <HankoStarterInfo />
    </>
  );
}
