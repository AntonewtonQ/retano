import Header from "../header/Header";

const Banner: React.FC = () => {
  const back01: string =
    "https://images.unsplash.com/photo-1656378068262-055bffff5b87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="relative w-full min-h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${back01})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center min-h-[100vh]">
        <Header />
      </div>
    </div>
  );
};

export default Banner;
