import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const APIContext = createContext({});

export const APIProvider = (props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState({ userAPIKey: "" });
  return (
    <APIContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </APIContext.Provider>
  );
};
