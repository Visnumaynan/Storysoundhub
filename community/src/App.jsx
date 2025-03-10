import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BookClubProfile from "./pages/bookClubProfile/BookClubProfile";
import BookClubs from "./pages/bookClubs/BookClubs";
import "./style.scss";
import { UserProvider } from "./context/UserContext";

function App() {
  const Layout = ({ children }) => {
    return (
      <div className={"theme-light"}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/profile/:id" element={
              <Layout>
                <Profile />
              </Layout>
            } />
            <Route path="/book-club/:id" element={
              <Layout>
                <BookClubProfile />
              </Layout>
            } />
            <Route path="/book-clubs" element={
              <Layout>
                <BookClubs />
              </Layout>
            } />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;