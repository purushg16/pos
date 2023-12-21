import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  icon: IconType;
  desc: string[];
}

export const MenuCard = ({ title, icon, desc }: Props) => {
  return (
    <Flex padding={10} gap={8}>
      <Icon as={icon} boxSize={12} transform={"rotate(-10deg)"} />
      <Box flex={1}>
        <Heading size="md"> {title} </Heading>
        {desc.map((d) => (
          <Text color="gray" mt={1}>
            {d}
          </Text>
        ))}
      </Box>
    </Flex>

    // <Card
    //   textAlign="center"
    //   borderRadius="20px"
    //   cursor="pointer"
    //   background="teal"
    // >
    //   <CardBody padding={5}>
    //     <Heading fontSize={"2xl"} textAlign="center" my={2}>
    //       {title}
    //     </Heading>
    //   </CardBody>
    // </Card>
  );
};
