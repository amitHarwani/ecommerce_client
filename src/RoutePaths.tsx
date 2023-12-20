import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";

const RoutePaths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<h1 className="flex justify-center items-center text-2xl">Home</h1>} />
          <Route path="contact" element={<h1 className="flex justify-center items-center text-2xl">Contact</h1>} />
          <Route path="about" element={<h1 className="flex justify-center items-center text-2xl">About</h1>} />
          <Route path="login" element={<h1 className="flex justify-center items-center text-2xl">Login</h1>} />
          <Route path="register" element={<h1 className="flex justify-center items-center text-2xl">Register</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePaths;
