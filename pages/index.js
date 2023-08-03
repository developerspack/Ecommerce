import Head from "next/head";

import {
  Banner,
  Brand,
  CategoryHeader,
  ContactHeader,
  FeaturedProducts,
  Footer,
  FooterHeader,
  MainHeader,
  NewArrivals,
} from "@/components";
import FetchCollection from "@/Hooks/FetchCollection";

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
        <NewArrivals />
        <FeaturedProducts />
        <Footer />
        <FooterHeader />
      </div>
    </div>
  );
}
