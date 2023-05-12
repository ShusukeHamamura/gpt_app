import { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import Speech from "speak-tts";
import {
  Input,
  Flex,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";

import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";
import { _Modal } from "../molecules/_Modal";

export const ChatGPT = memo(() => {
  const URL = "https://api.openai.com/v1/chat/completions";
  const { userInfo } = useContext(APIContext);
  const { showMessage } = useMessage();
  const [inputText, setInputText] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoice, setIsVoice] = useState(false);

  // const speech = new Speech();
  // speech
  //   .init({
  //     volume: 1,
  //     lang: "ja-JP",
  //     rate: 2,
  //     pitch: 1,
  //     // voice: "'Fiona'",
  //     splitSentences: true,
  //     listeners: {
  //       onvoiceschanged: (voices) => {
  //         console.log("Event voiceschanged", voices);
  //       },
  //     },
  //   })
  //   .then((data) => {
  //     console.log("Speech is ready, voices are available", data);
  //   })
  //   .catch((e) => {
  //     console.error("An error occured while initializing : ", e);
  //   });
  // speechSynthesis.cancel();
  const uttr = new SpeechSynthesisUtterance();
  uttr.lang = "ja-JP";
  uttr.rate = 1;
  uttr.pitch = 1.5;

  const handleSubmit = async () => {
    if (userInfo.userAPIKey === "") {
      showMessage({ title: "APIキーを設定してください", status: "error" });
    } else {
      setLoading(true);
      setInputText("");
      const response = await getResponse(inputText);
    }
  };

  const onClickOnVoice = () => {
    setIsVoice(!isVoice);
    if (!isVoice) {
      uttr.text = "音声をオンにしました";
      window.speechSynthesis.speak(uttr);
    }
  };
  const onClickOffVoice = () => {
    setIsVoice(!isVoice);
    speechSynthesis.cancel();
  };

  const onClickEnd = () => {
    setIsOpen(true);
  };

  const ResetTalk = () => {
    setMsg([]);
    setIsOpen(false);
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
          // speech
          //   .speak({
          //     text: ans,
          //   })
          //   .then(() => {
          //     alert("OK");
          //   })
          //   .catch((e) => {
          //     alert("NO");
          //   });
          if (isVoice) {
            uttr.text = ans;
            window.speechSynthesis.speak(uttr);
          }
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
        {isVoice ? (
          <Button
            h="1.75rem"
            size="xs"
            mx={4}
            bgColor={"red"}
            color={"white"}
            _hover={{ fontWeight: "bold" }}
            onClick={onClickOffVoice}
          >
            音声ON
          </Button>
        ) : (
          <Button
            h="1.75rem"
            size="xs"
            mx={4}
            bgColor={"blue"}
            color={"white"}
            _hover={{ fontWeight: "bold" }}
            onClick={onClickOnVoice}
          >
            音声OFF
          </Button>
        )}
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
              <Box bg={color} key={index} style={{ whiteSpace: "pre-wrap" }}>
                {ms.content}
              </Box>
            );
          })}
          {loading && (
            <Progress size="sm" isIndeterminate colorScheme="green" />
          )}
          {msg.length === 0 || loading || (
            <>
              <Button
                onClick={async () => {
                  onClickEnd();
                }}
                bg="gray.500"
                color="white"
                _hover={{ cursor: "pointer", opacity: 0.8, color: "red" }}
              >
                会話を終了する
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <_Modal isOpen={isOpen} setIsOpen={setIsOpen} option={ResetTalk} />
    </>
  );
});
