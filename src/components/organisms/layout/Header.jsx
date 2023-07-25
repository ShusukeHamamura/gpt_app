import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../../providers/APIProvider";
import { useMessage } from "../../hooks/useMessage";

export const Header = memo(() => {
  const { userInfo } = useContext(APIContext);
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  useEffect(() => {
    if (userInfo.id === "") {
      showMessage({
        title: "予期しない操作です。ログアウトしました。",
        status: "error",
      });
      navigate("/");
    }
  });

  const onClickHome = () => {
    navigate("/home");
  };
  const onClickSetAPIKey = () => {
    navigate("/apikey");
  };
  const onClickChatGPT = () => {
    navigate("/chatgpt");
  };
  const onClickDallE = () => {
    navigate("/dalle");
  };
  const onClickUserManagement = () => {
    navigate("/UserManagement");
  };
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            _hover={{
              cursor: "pointer",
              color: "#000033",
            }}
            onClick={onClickHome}
          >
            Star AI
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          // display={{ base: "none", sm: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickSetAPIKey}>設定</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickChatGPT}>チャットボット</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickDallE}>画像生成</Link>
          </Box>
          <Spacer />
          <Box pr={4}>
            {userInfo.id === 1 ? (
              <Link onClick={onClickUserManagement}>{`管理者ページ`}</Link>
            ) : (
              <>{`こんにちは、${userInfo.userID} さん`}</>
            )}
          </Box>
        </Flex>
        {/* <MenuIconButton /> */}
      </Flex>
      {/* <MenuDrawer/> */}
    </>
  );
});
