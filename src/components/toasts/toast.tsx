import { Button, useToast } from "@chakra-ui/react";

interface Props {
  message: string;
  status: "info" | "warning" | "success" | "error" | "loading";
  desc?: string;
}

const Toast = ({ message, status, desc }: Props) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: message,
          description: desc,
          status: status,
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
};

export default Toast;
