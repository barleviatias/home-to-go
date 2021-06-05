import { useState } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export function Loader() {
  let [loading ] = useState(true);
  let [color ] = useState("#FF385C");

  return (
    <div className="BeatLoader page">
      <BeatLoader color={color} loading={loading} css={override} size={20} />
    </div>
  );
}
