import { useCallback, useState } from "react";
import { useContext } from "react";

import { useMessage } from "./useMessage";
import { APIContext } from "../../providers/APIProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setUserInfo } = useContext(APIContext);

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id, password) => {
      axios
        .post("http://localhost:3001/api", {
          userid: id,
          password: password,
        })
        .then((res) => {
          const isUser = res.data;
          console.log(isUser);
          if (isUser === "not user") {
            showMessage({ title: "ユーザーIDが違います", status: "error" });
          } else if (isUser === "not password") {
            showMessage({ title: "パスワードが違います", status: "error" });
          } else {
            setUserInfo({
              userID: id,
              password: password,
            });
            navigate("/home");
            showMessage({ title: "ログインしました", status: "success" });
          }
        });
      setLoading(true);
    },
    [showMessage, setUserInfo, navigate]
  );
  return { login, loading };
};
