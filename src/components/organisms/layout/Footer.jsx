import { Flex, Heading, Stack } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
  return (
    <>
      <Flex
        h={{ base: "100px", md: "270px" }}
        bg="#333333"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8}>
          <Stack>
            <Heading fontSize={{ base: "xl", md: "4xl" }}>
              Star AI <small>Ver 0.30</small>
            </Heading>
            <Heading
              fontSize={{ base: "sm", md: "lg" }}
              style={{ whiteSpace: "pre-wrap" }}
            >
              <br />
              "Copyright © ShusukeHamamura". "Powered by OpenAI" . <br />
            </Heading>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
});
