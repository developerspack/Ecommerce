import Head from "next/head";

import FetchCollection from "@/Hooks/FetchCollection";
import {
  Banner,
  Brand,
  CategoryHeader,
  ContactHeader,
  FooterHeader,
  MainHeader,
} from "@/components";

export default function Home() {
  const { data: banner } = FetchCollection("banner");
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
        {banner.map((item) => (
          <div key={item.id}>
            <Banner {...item} />
          </div>
        ))}
        <Brand />
        <FooterHeader />
      </div>
    </div>
  );
}
