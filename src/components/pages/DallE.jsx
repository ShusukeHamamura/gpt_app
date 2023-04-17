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
  Text,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Wrap,
  WrapItem,
  CircularProgress,
} from "@chakra-ui/react";

import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";

export const DallE = memo(() => {
  const URL = "https://api.openai.com/v1/images/generations";
  const { userInfo } = useContext(APIContext);
  const { showMessage } = useMessage();
  const [inputText, setInputText] = useState("");
  const [inputNum, setInputNum] = useState(1);
  const [showTitle, setShowTitle] = useState("");
  const [imgURL, setImgURL] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (userInfo.userAPIKey === "") {
      showMessage({ title: "APIキーを設定してください", status: "error" });
    } else {
      setLoading(true);
      setShowTitle(inputText);
      setInputText("");
      setImgURL([]);
      const response = await getResponse(inputText);
    }
  };

  const getResponse = (message) => {
    try {
      const response = axios
        .post(
          URL,
          {
            prompt: message,
            n: Number(inputNum),
            size: "1024x1024",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.userAPIKey}`,
            },
          }
        )
        .then((res) => {
          let ans = res.data["data"];
          setImgURL(ans);
          setLoading(false);
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
              placeholder="生成したい画像について入力してください"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <InputRightElement width="4rem">
              <NumberInput
                defaultValue={1}
                min={1}
                max={4}
                value={inputNum}
                onChange={(value) => setInputNum(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button mx={2} h="2rem" size="sm" onClick={handleSubmit}>
          生成
        </Button>
      </Flex>
      <Flex px={6} align="center" justify="center">
        <Stack spacing={6} py={4} px={4}>
          {loading ? (
            <>
              <Text as="b">{`「${showTitle}」についての画像を生成中...`}</Text>
              <CircularProgress
                isIndeterminate
                color="green.300"
                align="center"
                size="120px"
              />
            </>
          ) : (
            imgURL.length === 0 || (
              <Text as="b">{`タイトル：「${showTitle}」`}</Text>
            )
          )}
          return (
          <>
            <Wrap p={{ base: 4, md: 10 }} align="center" justify="center">
              {imgURL.map((url, index) => (
                <WrapItem mx="auto" key={index}>
                  <Box m="auto" maxW="sm" borderWidth="1px" overflow="hidden">
                    <Image src={url.url} />
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </>
          )
        </Stack>
      </Flex>
    </>
  );
});
