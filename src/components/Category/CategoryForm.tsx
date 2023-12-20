import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCategoryies from "../../functions/hooks/useCategories";
import useCategoryStore from "../../functions/store/categoryStore";
import BillTabContainer from "../Billings/BillTabContainer";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    pid: "",
  });
  const [canSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const [isParent, setParent] = useState(true);

  const { refetch } = useCategoryies({
    type: "POST",
    category: newCategory,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    refetch().then((res) => {
      const { data, isSuccess, isError } = res;
      console.log(res);

      if (isSuccess) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        setNewCategory({ name: "", pid: "" });
      } else if (isError) {
        toast({
          title: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };
  useCategoryies({ type: "GET" });

  const selectedCategory = useCategoryStore((s) => s.currentCategory);

  useEffect(() => {
    if (!!selectedCategory)
      setNewCategory({ ...newCategory, pid: selectedCategory._id! });

    if (isParent && newCategory.name) setSubmit(true);
    else if (!isParent && newCategory.pid && newCategory.name) setSubmit(true);
    else setSubmit(false);
  }, [isParent, newCategory, selectedCategory]);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Box width={500}>
        <Heading> Add Category </Heading>

        <form onSubmit={(event) => onSubmit(event)}>
          <Flex flexDirection="column" gap={5} marginY={7}>
            <Box>
              <Text>Category Name </Text>
              <Input
                focusBorderColor="teal"
                variant="flushed"
                value={newCategory.name}
                onChange={(event) => {
                  setNewCategory({
                    ...newCategory,
                    name: event.target.value,
                  });
                }}
              />
            </Box>

            <Box>
              <SimpleGrid columns={2} alignItems="center">
                <Checkbox
                  isChecked={isParent}
                  onChange={() => {
                    setParent(!isParent);
                  }}
                  colorScheme="teal"
                  defaultChecked
                  size="lg"
                  children="Parent Catergory"
                />
                {!isParent && <BillTabContainer selector />}
              </SimpleGrid>
            </Box>

            {!!selectedCategory && !isParent && (
              <Box>
                <SimpleGrid columns={2} alignItems="center" marginY={1}>
                  <Heading size="sm"> Selected Category: </Heading>

                  <Button colorScheme="yellow">{selectedCategory.name} </Button>
                </SimpleGrid>
              </Box>
            )}
            <Button
              colorScheme="teal"
              type="submit"
              my={2}
              isLoading={isLoading}
              isDisabled={!canSubmit}
              loadingText="Adding Category..."
            >
              Add Category
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CategoryForm;
