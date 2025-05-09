import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceInfo } from "./utils/deviceInfoSlice.js";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Shared/Signup";
import Registration from "./components/Registration";
import Regform from "./components/Regform";

import Browse from "./pages/Browse";
import ManageProfiles from "./pages/ManageProfiles";
import BrowseShared from "./pages/Shared/BrowseShared";

import Logout from "./pages/Logout.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import GenreMovies from "./pages/GenreMovies.jsx";
import GenreTV from "./pages/GenreTV.jsx";
import Search from "./pages/Search.jsx";
import Mylist from "./pages/Mylist.jsx";
import Error from "./pages/Error.jsx";

function App() {
  const [editClick, setEditClick] = useState(false);
  const [accountClick, setAccountClick] = useState(false);
  const [accountLoader, setAccountLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [addProfile, setAddProfile] = useState(false);
  const [navView, setNavView] = useState(false);

  const dispatch = useDispatch();

  const handleEvent = () => {
    dispatch(
      setDeviceInfo({
        width: window.innerWidth,
        height: Math.max(
          window.innerHeight,
          document.body.offsetHeight,
          document.body.clientHeight
        ),
      })
    );
  };

  useEffect(() => {
    window.addEventListener("load", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("load", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup setEmail={setEmail} />}>
        <Route index element={<Registration />} />
        <Route path="regform" element={<Regform email={email} />} />
      </Route>

      <Route path="logout" element={<Logout />} />

      {/* 🔓 Acceso directo sin login */}
      <Route
        path="browse"
        element={
          <BrowseShared
            navView={navView}
            setNavView={setNavView}
            setAccountLoader={setAccountLoader}
            setAccountClick={setAccountClick}
          />
        }
      >
        <Route
          index
          element={
            <Browse
              accountClick={accountClick}
              setNavView={setNavView}
              setAccountClick={setAccountClick}
              accountLoader={accountLoader}
              setAccountLoader={setAccountLoader}
              setEditClick={setEditClick}
              loaded={loaded}
              addProfile={addProfile}
              setAddProfile={setAddProfile}
            />
          }
        />
        <Route
          path=":id"
          element={
            <MovieDetail
              setAccountClick={setAccountClick}
              setNavView={setNavView}
            />
          }
        />
        <Route
          path="genre/movies"
          element={
            <GenreMovies
              setNavView={setNavView}
              setAccountClick={setAccountClick}
            />
          }
        />
        <Route
          path="genre/tv_shows"
          element={
            <GenreTV
              setNavView={setNavView}
              setAccountClick={setAccountClick}
            />
          }
        />
        <Route
          path="search"
          element={
            <Search
              setNavView={setNavView}
              setAccountClick={setAccountClick}
            />
          }
        />
        <Route
          path="mylist"
          element={
            <Mylist
              setNavView={setNavView}
              setAccountClick={setAccountClick}
            />
          }
        />
      </Route>

      <Route
        path="ManageProfiles"
        element={
          <ManageProfiles
            editClick={editClick}
            setEditClick={setEditClick}
            setAccountClick={setAccountClick}
            loaded={loaded}
          />
        }
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;

