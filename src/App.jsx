import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplexDetail from "./pages/ComplexDetail";
import ComplexList from "./pages/ComplexList";
import Header from "./components/common/Header";
import RentalCon from "./pages/RentalCon";
import RentalListCon from "./pages/RentalListCon";
import store from "./redux/store"
import { Provider } from "react-redux";
import LoginCom from "./components/login/LoginCom";
import ProtectedRoute from "./components/login/ProtectedRoute";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import MyPage from "./components/mypage/MyPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />

          <main className="appMain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/complexes" element={<ComplexList />} />
              <Route path="/complexes/:id" element={<ComplexDetail />} />
              <Route
                path="/rental"
                element={
                  <ProtectedRoute>
                    <RentalCon />
                  </ProtectedRoute>
                }
              />
              <Route path="/rentalList" element={<RentalListCon />} />
              <Route path="/login" element={<LoginCom />} />
              <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler />}
              />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
