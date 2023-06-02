import { Button } from "@chakra-ui/react";
import { memo } from "react";

export const PrimaryButton = memo((props) => {
  const {
    children,
    bg = "teal.400",
    color = "white",
    w = "100%",
    disabled = false,
    loading = false,
    onClick,
  } = props;
  return (
    <Button
      bg={bg}
      color={color}
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
