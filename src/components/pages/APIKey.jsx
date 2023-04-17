import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";

export const APIKey = memo(() => {
  const { showMessage } = useMessage();
  const { userInfo, setUserInfo } = useContext(APIContext);
  const navigate = useNavigate();

  const onClickHome = () => {
    if (userInfo.userAPIKey == "") {
      showMessage({ title: "APIキーを入力してください", status: "error" });
    } else {
      showMessage({ title: "APIキーを設定しました", status: "success" });
      navigate("/");
    }
  };
  return (
    <>
      <Flex align="center" justify="center">
        <Box py={3} w={["80%", "70%", "60%", "50%"]}>
          <InputGroup>
            <Input
              px={2}
              type="password"
              placeholder="API KEYを入力してください"
              value={userInfo.userAPIKey}
              onChange={(e) => setUserInfo({ userAPIKey: e.target.value })}
            />
            <InputRightElement width="4.5rem"></InputRightElement>
          </InputGroup>
        </Box>
        <Button mx={2} align="center" justify="center" onClick={onClickHome}>
          設定
        </Button>
      </Flex>
    </>
  );
});
