import { Card, CardBody, Heading, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  icon: IconType;
}

export const MenuCard = ({ title, icon }: Props) => {
  return (
    <Card
      textAlign="center"
      borderRadius="20px"
      cursor="pointer"
      background="teal"
    >
      <CardBody padding={5}>
        <Icon as={icon} boxSize={10} />
        <Heading fontSize={"2xl"} textAlign="center" my={2}>
          {title}
        </Heading>
      </CardBody>
    </Card>
  );
};

// aadsar ration driving voter certiface 2 photo
