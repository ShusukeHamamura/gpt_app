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
      console.log(res.data);
    });
  }, []);

  return <>test page</>;
});
