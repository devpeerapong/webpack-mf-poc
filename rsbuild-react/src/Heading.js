import { useState } from "react";
import "./Heading.css";

export function Heading() {
  const [count, setCount] = useState(0);
  return (
    <h1 className="heading" onClick={() => setCount(count + 1)}>
      Rsbuild {count}
    </h1>
  );
}

export default Heading;
