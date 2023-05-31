import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Stack,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  UnorderedList,
  ListItem,
  List,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";
import { HeaderLayout } from "../template/HeaderLayout";

export const APIKey = memo(() => {
  const { showMessage } = useMessage();
  const {
    userInfo,
    setUserInfo,
    language,
    setLanguage,
    rate,
    setRate,
    pitch,
    setPitch,
  } = useContext(APIContext);
  const navigate = useNavigate();

  const onClickAPIKey = () => {
    if (userInfo.userAPIKey == "") {
      showMessage({ title: "APIキーを入力してください", status: "error" });
    } else {
      showMessage({ title: "APIキーを設定しました", status: "success" });
    }
  };

  const onClickVoice = () => {
    showMessage({
      title: "音声設定を保存しました",
      status: "success",
    });
  };
  return (
    <>
      <HeaderLayout />
      <Tabs px={4} py={4}>
        <TabList>
          <Tab>APIキーの設定</Tab>
          <Tab>音声設定</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex align="center" justify="center">
              <Box py={3} w={["80%", "70%", "60%", "50%"]}>
                <InputGroup>
                  <Input
                    px={2}
                    type="password"
                    placeholder="API KEYを入力してください"
                    value={userInfo.userAPIKey}
                    onChange={(e) =>
                      setUserInfo({
                        userID: userInfo.userID,
                        userAPIKey: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width="4.5rem"></InputRightElement>
                </InputGroup>
              </Box>
              <Button
                mx={2}
                align="center"
                justify="center"
                onClick={onClickAPIKey}
              >
                設定
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <UnorderedList>
              <Stack spacing={4}>
                <ListItem>
                  言語
                  <Select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  >
                    <option value="ja-JP">ja-JP</option>
                    <option value="en-US">en-US</option>
                  </Select>
                </ListItem>
                <ListItem>
                  速度
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={rate}
                    min={1}
                    max={100}
                    step={1}
                    onChange={(val) => setRate(val)}
                    mt={7}
                  >
                    {" "}
                    <SliderMark
                      value={rate}
                      textAlign="center"
                      bg="blue.500"
                      color="white"
                      mt="-8"
                      ml="-5"
                      w="10"
                    >
                      {rate}%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </ListItem>
                <ListItem>
                  ピッチ
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={pitch}
                    min={1}
                    max={100}
                    step={1}
                    onChange={(val) => setPitch(val)}
                    mt={7}
                  >
                    {" "}
                    <SliderMark
                      value={pitch}
                      textAlign="center"
                      bg="blue.500"
                      color="white"
                      mt="-8"
                      ml="-5"
                      w="10"
                    >
                      {pitch}%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </ListItem>
              </Stack>
            </UnorderedList>
            <Button
              my={4}
              align="center"
              justify="center"
              onClick={onClickVoice}
            >
              保存
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
});
