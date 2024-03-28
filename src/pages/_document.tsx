import { Html, Head, Main, NextScript } from "next/document";
import Setting from "~/components/Setting";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Setting className="text-2xl absolute bg-red-500" />
        <NextScript />
      </body>
    </Html>
  );
}
