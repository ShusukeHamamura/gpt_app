import { createContext, useState } from "react";

export const APIContext = createContext({});

export const APIProvider = (props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState({
    id: "",
    userID: "",
    password: "",
    userAPIKey: "",
  });
  const [language, setLanguage] = useState("ja-JP");
  const [rate, setRate] = useState(30);
  const [pitch, setPitch] = useState(75);
  return (
    <APIContext.Provider
      value={{
        userInfo,
        setUserInfo,
        language,
        setLanguage,
        rate,
        setRate,
        pitch,
        setPitch,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
