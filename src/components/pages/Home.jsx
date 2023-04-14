import { memo, useState } from "react";
import axios from "axios";
import {
  Input,
  Flex,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ArrowForwardIcon, SpinnerIcon } from "@chakra-ui/icons";

export const Home = memo(() => {
  const URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = "";
  const [inputText, setInputText] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setInputText("");
    const response = await getResponse(inputText);
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
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        )
        .then((res) => {
          let ans = res.data["choices"][0]["message"]["content"];
          setMsg((oldMsg) => [...oldMsg, { role: "assistant", content: ans }]);
          setLoading(false);
          //   if (res.data["usage"]["total_tokens"] > 3000) {
          //     msg.shift();
          //   }
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Flex align="center" justify="center">
        <Box py={3} w={["80%", "70%", "60%", "50%"]}>
          <InputGroup>
            <Input
              px={2}
              type="text"
              placeholder="send a message ..."
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
        </Stack>
      </Flex>
    </>
  );
});
