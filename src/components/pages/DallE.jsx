import { memo, useContext, useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
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
  Textarea,
} from "@chakra-ui/react";

import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";
import { HeaderLayout } from "../template/HeaderLayout";

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
      // setInputText("");
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
    <div>
      <HeaderLayout />
      <Flex align="center" justify="center">
        <Stack spacing={6} my={4} mx={4} w={"80%"}>
          <InputGroup>
            <Textarea
              minH="unset"
              overflow="hidden"
              w="100%"
              resize="none"
              minRows={1}
              as={ResizeTextarea}
              px={2}
              h={"15rem"}
              type="text"
              placeholder="生成したい画像について入力してください"
              bgColor={"blackAlpha.800"}
              color={"white"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </InputGroup>
          <NumberInput
            w={"15%"}
            defaultValue={1}
            min={1}
            max={5}
            value={inputNum}
            onChange={(value) => setInputNum(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            mx={2}
            h="2rem"
            w="10rem"
            size="sm"
            color={"white"}
            bgColor={"green.400"}
            _hover={{ cursor: "pointer", bgColor: "green", opacity: 0.8 }}
            onClick={handleSubmit}
          >
            生成
          </Button>
        </Stack>
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
              <Text
                textAlign={"center"}
                as="b"
              >{`タイトル：「${showTitle}」`}</Text>
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
    </div>
  );
});
