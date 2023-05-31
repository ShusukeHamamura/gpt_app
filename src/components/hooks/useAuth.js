import { useCallback, useState } from "react";
import { useContext } from "react";

import { useMessage } from "./useMessage";
import { APIContext } from "../../providers/APIProvider";
import UserData from "../../UserData.json";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { userInfo, setUserInfo } = useContext(APIContext);

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id, password) => {
      const user = UserData.find((user) => user.userid === id);
      if (user !== undefined) {
        if (user["password"] === password) {
          setUserInfo({ userID: user["userid"] });
          navigate("/home");
          showMessage({ title: "ログインしました", status: "success" });
        } else {
          showMessage({ title: "パスワードが違います", status: "error" });
        }
      } else {
        showMessage({ title: "ユーザーIDが違います", status: "error" });
      }
      setLoading(true);
    },
    [showMessage]
  );
  return { login, loading };
};
