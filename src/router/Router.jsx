import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatGPT } from "../components/pages/ChatGPT";
import { Home } from "../components/pages/Home";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { DallE } from "../components/pages/DallE";
import { APIKey } from "../components/pages/APIKey";

export const Router = memo(() => {
  return (
    <HeaderLayout>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/chatgpt"} element={<ChatGPT />}></Route>
        <Route path={"/dalle"} element={<DallE />}></Route>
        <Route path={"/apikey"} element={<APIKey />}></Route>
      </Routes>
    </HeaderLayout>
  );
});
