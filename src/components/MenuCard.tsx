import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { BsBox } from "react-icons/bs";

export const MenuCard = () => {
  return (
    <Card textAlign="center" borderRadius="20px" cursor="pointer">
      <CardBody padding={5}>
        <Icon as={BsBox} boxSize={10} />
        <Heading fontSize={"2xl"} textAlign="center" my={2}>
          Hello
        </Heading>
      </CardBody>
    </Card>
  );
};
