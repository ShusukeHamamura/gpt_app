import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const Header = memo(() => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("/");
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
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
        // top={0}
        // position="sticky"
        // zIndex={"sticky"}
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
            OpenAI
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          // display={{ base: "none", sm: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickSetAPIKey}>APIキーの設定</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickChatGPT}>ChatGPT</Link>
          </Box>
          <Link onClick={onClickDallE}>DALL E</Link>
        </Flex>
        {/* <MenuIconButton /> */}
      </Flex>
      {/* <MenuDrawer/> */}
    </>
  );
});
