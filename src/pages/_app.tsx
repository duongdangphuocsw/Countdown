import "~/styles/globals.css";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import Sider from "~/components/Sider";

export default function App({ Component, pageProps }: any) {
  return (
    <div className="relative">
      <Sider />
      <Component {...pageProps} />
    </div>
  );
}
