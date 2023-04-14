import { memo, useContext, useState } from "react";
import axios from "axios";
import {
  Input,
  Flex,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";

import { APIContext } from "../../providers/APIProvider";
import { useLocation } from "react-router-dom";

export const ChatGPT = memo(() => {
  const URL = "https://api.openai.com/v1/chat/completions";
  const { userInfo } = useContext(APIContext);
  const [inputText, setInputText] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setInputText("");
    const response = await getResponse(inputText);
  };

  const onClickEnd = () => {
    setMsg([]);
  };

  const getResponse = (message) => {
    setMsg((oldMsg) => [...oldMsg, { role: "user", content: message }]);
    try {
      const response = axios
        .post(
          URL,
          {
            model: "gpt-3.5-turbo",
            messages: [...msg, { role: "user", content: message }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.userAPIKey}`,
            },
          }
        )
        .then((res) => {
          let ans = res.data["choices"][0]["message"]["content"];
          setMsg((oldMsg) => [...oldMsg, { role: "assistant", content: ans }]);
          setLoading(false);
          if (res.data["usage"]["total_tokens"] > 3000) {
            msg.shift();
            msg.shift();
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        top={0}
        position="sticky"
        zIndex={"sticky"}
      >
        <Box py={3} w={["80%", "70%", "60%", "50%"]}>
          <InputGroup>
            <Input
              px={2}
              bg="white"
              type="text"
              placeholder="メッセージを入力"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSubmit}>
                送信
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Flex px={6} align="center" justify="center">
        <Stack spacing={6} py={4} px={4}>
          {msg.map((ms, index) => {
            let color = "";
            ms.role === "user" ? (color = "white") : (color = "gray.100");
            return (
              <Box bg={color} key={index}>
                {ms.content}
              </Box>
            );
          })}
          {loading && <SpinnerIcon></SpinnerIcon>}
          {msg.length === 0 || loading || (
            <Button onClick={onClickEnd} bg="gray.500" color="white">
              会話を終了する
            </Button>
          )}
        </Stack>
      </Flex>
    </>
  );
});
