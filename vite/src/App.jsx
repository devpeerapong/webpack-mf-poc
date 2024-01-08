import Heading from "./Heading";
import { Heading as CRAHeading } from "cra/Heading";
import { Heading as NextHeading } from "nextjs/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";

function App() {
  return (
    <div>
      <Heading />
      <CRAHeading />
      <NextHeading />
      <WebpackHeading />
    </div>
  );
}

export default App;
