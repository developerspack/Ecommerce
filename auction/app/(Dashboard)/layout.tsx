import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const AuctioneerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default AuctioneerLayout;
