import Header from "./Header";
import "./Home.scss";
import Footer from "./Footer";
import MainBody from "./MainBody";

export default function Home() {
  return (
    <div className="main-container">
      <Header />
      <MainBody />
      <Footer />
    </div>
  );
}
