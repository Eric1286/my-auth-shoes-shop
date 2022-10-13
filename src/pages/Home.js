import BestSale from "../components/BestSale";
import Trending from "../components/Trending";
import Videobgr from "../components/Videobgr";

const Home = () => {
  return (
    <main className="my-16 lg:my-20">
      <Videobgr />
      <div className="container px-4 lg:px-8 mx-auto">
        <BestSale />
        <Trending />
      </div>
    </main>
  );
};
export default Home;
