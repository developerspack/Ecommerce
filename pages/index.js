import Head from "next/head";

import {
  Banner,
  Brand,
  CategoryHeader,
  ContactHeader,
  FeaturedProducts,
  Footer,
  FooterHeader,
  Loader,
  MainHeader,
  NewArrivals,
} from "@/components";
import FetchCollection from "@/Hooks/FetchCollection";
import FetchProductsReviews from "@/Hooks/FetchProductsReviews";

export default function Home() {
  const { data: banner } = FetchCollection("banner");
  const { loading } = FetchProductsReviews("products");
  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <main>
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
        </main>
      )}
    </div>
  );
}
