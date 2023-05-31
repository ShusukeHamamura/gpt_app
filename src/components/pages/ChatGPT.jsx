import { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  CircularProgress,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";

import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";
import { _Modal } from "../molecules/_Modal";
import { HeaderLayout } from "../template/HeaderLayout";

export const ChatGPT = memo(() => {
  const URL = "https://api.openai.com/v1/chat/completions";
  const { userInfo, language, rate, pitch } = useContext(APIContext);
  const { showMessage } = useMessage();
  const [inputText, setInputText] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const [isInputVoice, setIsInputVoice] = useState(true);

  const uttr = new SpeechSynthesisUtterance();
  uttr.lang = language;
  uttr.rate = 10 * (rate * 0.01);
  uttr.pitch = 2 * (pitch * 0.01);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
      if (language === "ja-JP") uttr.text = "音声をオンにしました";
      else if (language === "en-US") uttr.text = "Voice turned on";
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

  const startListening = () => {
    setIsInputVoice(!isInputVoice);
    if (isInputVoice) {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
    } else {
      SpeechRecognition.stopListening();
      setInputText(transcript);
    }
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
      <HeaderLayout />
      <Flex
        align="center"
        justify="center"
        top={0}
        position="sticky"
        zIndex={"sticky"}
        mt={5}
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
          {isInputVoice ? (
            <InputGroup>
              <Input
                px={2}
                bg="white"
                type="text"
                placeholder="メッセージを入力"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </InputGroup>
          ) : (
            <Progress px={2} size="xs" isIndeterminate />
          )}
        </Box>
        {isInputVoice ? (
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Call Sage"
            size="sm"
            fontSize="10px"
            mx={4}
            as={AiOutlineAudio}
            onClick={startListening}
          />
        ) : (
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Call Sage"
            size="sm"
            fontSize="10px"
            mx={4}
            as={AiOutlineAudioMuted}
            onClick={startListening}
          />
        )}

        <Button h="2rem" size="sm" onClick={handleSubmit}>
          送信
        </Button>
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
