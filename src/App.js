import Form from "./Components/Form";

function App() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative lg:flex h-full w-1/3 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce transition-all">
          <div className="py-20 px-12 justify-center items-center align">
            <p className=" text-white text-3xl font-bold">Deveazy</p>
          </div>
        </div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
      <div className="w-full px-3 py-5 lg:py-10 lg:px-20 flex items-center justify-center lg:w-2/3">
        <Form />
      </div>
    </div>
  );
}

export default App;
