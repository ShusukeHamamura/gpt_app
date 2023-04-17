import { Flex, Heading } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
  return (
    <>
      <Flex
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            © 2023 ShusukeHamamura Inc. All rights reserved.
          </Heading>
        </Flex>
      </Flex>
    </>
  );
});
