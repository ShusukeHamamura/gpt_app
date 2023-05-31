import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatGPT } from "../components/pages/ChatGPT";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { HeaderLayout } from "../components/template/HeaderLayout";
import { DallE } from "../components/pages/DallE";
import { APIKey } from "../components/pages/APIKey";
import { Footer } from "../components/template/FooterLayout";
import { SignUp } from "../components/pages/SignUp";

export const Router = memo(() => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/SignUp"} element={<SignUp />}></Route>
        <Route path={"/Home"} element={<Home />}></Route>
        <Route path={"/chatgpt"} element={<ChatGPT />}></Route>
        <Route path={"/dalle"} element={<DallE />}></Route>
        <Route path={"/apikey"} element={<APIKey />}></Route>
      </Routes>
    </>
  );
});
