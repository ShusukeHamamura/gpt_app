import axios from "axios";
import { memo, useEffect } from "react";

export const SignUp = memo(() => {
  //   axios.post("http://localhost:3001/db/UserData/userdata", {
  //     id: 2,
  //     userid: "ube",
  //     password: "5678",
  //   });
  useEffect(() => {
    axios.get("http://localhost:3001/db/UserData/userdata").then((res) => {
      console.log(res.data[res.data.length - 1].id); //最後のidを取得
      const useridList = res.data.map((val) => {
        return val.userid;
      });
      console.log(useridList); //useridのリストを取得
    });
  }, []);

  return <>test page</>;
});
