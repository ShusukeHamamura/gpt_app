import { useCallback, useState } from "react";
import { useContext } from "react";

import { useMessage } from "./useMessage";
import { APIContext } from "../../providers/APIProvider";
import UserData from "../../UserData.json";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { userInfo, setUserInfo } = useContext(APIContext);

  const [loading, setLoading] = useState(false);

  const is_json_server = false;

  useEffect(() => {
    if (is_json_server) {
      axios.get("http://localhost:3001/db/UserData/userdata").then((res) => {
        UserData = res.data;
      });
    }
  }, []);

  const login = useCallback(
    (id, password) => {
      const user = UserData.find((user) => user.userid === id);
      if (user !== undefined) {
        if (user["password"] === password) {
          setUserInfo({
            id: user["id"],
            userID: user["userid"],
            password: user["password"],
          });
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
