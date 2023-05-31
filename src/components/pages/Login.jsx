import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalCloseButton,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { memo } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../hooks/useAuth";

export const Login = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangeUserId = (e) => setUserId(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeNewUserId = (e) => setNewUserId(e.target.value);
  const onChangeNewPassword = (e) => setNewPassword(e.target.value);

  const onClickLogin = () => {
    login(userId, password);
  };
  const onClickSignUp = () => {
    setSignUp(true);
  };
  const onClickSignUpCancel = () => {
    setSignUp(false);
  };
  return (
    <>
      <Modal isOpen={signUp} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton onClick={onClickSignUpCancel} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>ユーザーID</FormLabel>
              <Input
                placeholder="UserID"
                value={newUserId}
                onChange={onChangeNewUserId}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={onChangeNewPassword}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              作成
            </Button>
            <Button onClick={onClickSignUpCancel}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="xl" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            Star AI Login
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={4} px={10}>
            <Input
              placeholder="ユーザーID"
              value={userId}
              onChange={onChangeUserId}
            />
            <Input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={onChangePassword}
            />
            <PrimaryButton
              disabled={userId === "" ? true : false}
              onClick={onClickLogin}
            >
              ログイン
            </PrimaryButton>
            {/* <Link onClick={onClickSignUp}>Sign up</Link> */}
            <Link href="/SignUp">Sign up</Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
