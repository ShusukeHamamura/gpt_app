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
  Text,
  ModalFooter,
  Button,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { memo } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../hooks/useAuth";

export const SignUp = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(true);
  const onChangeUserId = (e) => setUserId(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onClickLogin = () => {
    login(userId, password);
  };
  return (
    <>
      <Modal isOpen={signUp} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="xl" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            アカウント作成
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
              作成
            </PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
