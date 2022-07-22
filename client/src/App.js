import React from "react";
import Routes from "./Routes";
import Footer from "./core/Footer";
const App = () => {
  return (
    <div>
      <div className="main">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
