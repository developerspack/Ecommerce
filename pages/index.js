import Head from "next/head";

import {
  CategoryHeader,
  ContactHeader,
  FooterHeader,
  MainHeader,
} from "@/components";

export default function Home() {
  return (
    <div className="text-white">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <ContactHeader />
        <MainHeader />
        <CategoryHeader />
        <FooterHeader />
      </div>
    </div>
  );
}
