import Banner from "./components/banner/Banner";
import Totals from "./components/totals/Totals";

const App = () => {
  return (
    <>
      <div className="relative w-full min-h-[100vh]">
        <Banner />
      </div>
      <div className="p-6">
        <Totals />
      </div>
    </>
  );
};

export default App;
