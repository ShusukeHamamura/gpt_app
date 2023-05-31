import { Badge, Box, Image, Wrap, WrapItem } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterLayout } from "../template/FooterLayout";
import { HeaderLayout } from "../template/HeaderLayout";

export const Home = memo(() => {
  const navigate = useNavigate();

  const onClickGPT = () => {
    navigate("/chatgpt");
  };
  const onClickDallE = () => {
    navigate("/dalle");
  };
  return (
    <>
      <HeaderLayout />
      <Helmet>
        <title>Star AI</title>
      </Helmet>
      <Wrap
        p={{ base: 4, md: 10 }}
        align="center"
        justify="center"
        bg="#CCFFFF"
      >
        <WrapItem mx="auto">
          <Box
            m="auto"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickGPT}
          >
            <Image src="/images/chatgpt.png" />
            <Box p={4} bg="white">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  チャットボット
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  対話式AIモデル(gpt-3.5-turbo)
                </Box>
              </Box>
            </Box>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            m="auto"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickDallE}
          >
            <Image src="/images/dalle.png" />
            <Box p={4} bg="white">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  画像生成
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  AIによる画像生成モデル(DALL E 2.0)
                </Box>
              </Box>
            </Box>
          </Box>
        </WrapItem>
      </Wrap>
      <FooterLayout />
    </>
  );
});
