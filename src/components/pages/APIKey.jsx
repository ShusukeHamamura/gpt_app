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
  UnorderedList,
  ListItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIContext } from "../../providers/APIProvider";
import { useMessage } from "../hooks/useMessage";
import { HeaderLayout } from "../template/HeaderLayout";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useUserSetting } from "../hooks/useUserSetting";

export const APIKey = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [apikey, setApikey] = useState(userInfo.userAPIKey);
  const [newUserId, setNewUserId] = useState("");
  const { changeUserId } = useUserSetting();
  const navigate = useNavigate();

  const onClickAPIKey = () => {
    if (apikey === "") {
      showMessage({ title: "APIキーを入力してください", status: "error" });
    } else {
      setUserInfo({ ...userInfo, userAPIKey: apikey });
      showMessage({ title: "APIキーを設定しました", status: "success" });
    }
  };

  const onClickVoice = () => {
    showMessage({
      title: "音声設定を保存しました",
      status: "success",
    });
  };

  const onClickChangeUserId = () => {
    changeUserId(userInfo.userID, newUserId);
    onClose();
    setNewUserId("");
  };

  const onClickLogout = () => {
    navigate("/");
  };
  return (
    <>
      <HeaderLayout />
      <Tabs px={4} py={4}>
        <TabList>
          <Tab>APIキーの設定</Tab>
          <Tab>音声設定</Tab>
          <Tab>ユーザー設定</Tab>
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
                    value={apikey}
                    onChange={(e) => setApikey(e.target.value)}
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
          <TabPanel>
            <Flex align="center" justify="center"></Flex>
            <UnorderedList>
              <Stack spacing={4}>
                <ListItem>
                  ID
                  <br />
                  {userInfo.id}
                </ListItem>
                <ListItem>
                  ユーザーID
                  <br />
                  <Link onClick={onOpen}>{userInfo.userID}</Link>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>ユーザーIDを変更する</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <Text>{`現在のユーザーID：${userInfo.userID}`}</Text>
                        <Input
                          placeholder="新しいユーザーID"
                          value={newUserId}
                          onChange={(e) => setNewUserId(e.target.value)}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={onClickChangeUserId}
                        >
                          変更
                        </Button>
                        <Button onClick={onClose}>キャンセル</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </ListItem>
                <ListItem>
                  パスワード
                  <br />
                  {"*".repeat(userInfo.password.length)}
                </ListItem>
              </Stack>
            </UnorderedList>
            <br />
            <PrimaryButton bg={"red.500"} onClick={onClickLogout}>
              ログアウト
            </PrimaryButton>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
});
