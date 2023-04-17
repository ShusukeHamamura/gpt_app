import { Badge, Box, Image, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../providers/APIProvider";
import { FooterLayout } from "../template/FooterLayout";

export const Home = memo(() => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(APIContext);

  const onClickGPT = () => {
    navigate("/chatgpt");
  };
  const onClickDallE = () => {
    navigate("/dalle");
  };
  return (
    <>
      <Wrap
        p={{ base: 4, md: 10 }}
        align="center"
        justify="center"
        bg="#000033"
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
                  ChatGPT
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  対話式AIモデル
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
                  DALL E
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  AIによる画像生成モデル
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
