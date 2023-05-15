import Link from "next/link";
import React, { FC } from "react";
const FirstPost: FC = () => {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
};
export default FirstPost;
