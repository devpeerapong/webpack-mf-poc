import { Heading } from "./Heading";
import { Heading as CRAHeading } from "cra/Heading";
import { Heading as ViteHeading } from "vite/Heading";
import { Heading as NextHeading } from "nextjs/Heading";

export function App() {
  return (
    <div>
      <Heading />
      <CRAHeading />
      <ViteHeading />
      <NextHeading />
    </div>
  );
}
