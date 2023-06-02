import { useCallback, useState } from "react";
import { useContext } from "react";

import { useMessage } from "./useMessage";
import { APIContext } from "../../providers/APIProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

export const useUserSetting = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { userInfo, setUserInfo } = useContext(APIContext);

  const changeUserId = useCallback((oldUserId, newUserId) => {
    axios.get("http://localhost:3001/db/UserData/userdata").then((res) => {
      const target_db = res.data.map((user) => {
        if (user.userid === oldUserId) {
          user.userid = newUserId;
        }
        return user;
      });
      console.log(target_db);
    });
    // axios.post("http://localhost:3001/db/UserData/userdata", new_user_db);
  }, []);
  return { changeUserId };
};
