import Heading from "./Heading";
import { Heading as ViteHeading } from "vite/Heading";
import { Heading as NextHeading } from "nextjs/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";
import { Heading as RsbuildHeading } from "rsbuildreact/Heading";

function App() {
  return (
    <div>
      <Heading />
      <ViteHeading />
      <NextHeading />
      <WebpackHeading />
      <RsbuildHeading />
    </div>
  );
}

export default App;
