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
} from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";

import { APIContext } from "../../providers/APIProvider";
import { useLocation } from "react-router-dom";

export const DallE = memo(() => {
  const URL = "https://api.openai.com/v1/images/generations";
  const { userInfo } = useContext(APIContext);
  const [inputText, setInputText] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [imgURL, setImgURL] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setShowTitle(inputText);
    setInputText("");
    setImgURL([]);
    const response = await getResponse(inputText);
  };

  const getResponse = (message) => {
    try {
      const response = axios
        .post(
          URL,
          {
            prompt: message,
            n: 1,
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
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSubmit}>
                生成
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Flex px={6} align="center" justify="center">
        <Stack spacing={6} py={4} px={4}>
          {loading ? (
            <Text as="b">{`「${showTitle}」についての画像を生成中...`}</Text>
          ) : (
            imgURL.length === 0 || (
              <Text as="b">{`タイトル：「${showTitle}」`}</Text>
            )
          )}
          {imgURL.map((url, index) => {
            return (
              <Box key={index}>
                <Image src={url.url} />
              </Box>
            );
          })}
        </Stack>
      </Flex>
    </>
  );
});
