import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function SearchLayout() {
  return (
    <section className="search">
      <Navbar />
      <Outlet />
    </section>
  );
}

export default SearchLayout;
