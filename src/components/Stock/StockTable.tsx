import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Editable,
  EditablePreview,
  EditableInput,
  Kbd,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import BillTabContainer from "../Billings/BillTabContainer";
import BillingItemIdSelector from "../Billings/BillingItemIdSelector";
import useStockStore, { StockProduct } from "../../functions/store/stockStore";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Product } from "../entities/Product";

const StockTable = () => {
  const stockProducts = useStockStore((s) => s.stockProducts);
  const updateStockQuantity = useStockStore((s) => s.updateStockQuantity);
  const updateStockPrice = useStockStore((s) => s.updateStockPrice);

  const addProduct = useStockStore((s) => s.addProducts);
  const addStockItem = (item: Product) => {
    const newStock: StockProduct = {
      productId: item._id!,
      purchasePrice: item.salesPrice,
      quantity: 1,

      code: item.code,
      productName: item.itemName,
    };
    addProduct(newStock);
  };

  return (
    <TableContainer>
      <Table
        variant="unstyled"
        size="md"
        border="0.1px solid #d9d9d9"
        borderRadius={7}
        overflow="hidden"
        padding={2}
      >
        <Thead width="100%" background="#7a7a7a21" border="0.1px solid #d9d9d9">
          <Tr width="100%">
            <Th borderRight="0.1px solid #d9d9d9"> # </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Item Code </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Item Name </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Qty </Th>
            <Th borderRight="0.1px solid #d9d9d9"> Unit </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              Purchase Price/Unit
              <hr />
              <small> with tax </small>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {stockProducts.map((entry, index) => (
            <Tr key={index} borderBottom="1px solid #f1f1f1">
              {/* Serial No. */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {index + 1}
              </Td>

              {/* Product Code */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.code} </Td>

              {/* Product Name */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.productName} </Td>

              {/*  Quantity  */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Editable
                  value={entry.quantity.toString()}
                  onChange={(quantity) => {
                    updateStockQuantity(entry.productId, parseInt(quantity));
                  }}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>

              {/* Unit */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Editable defaultValue="-">
                  <EditablePreview />
                  <EditableInput value={entry.productId} />
                </Editable>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    size="sm"
                  >
                    Kg
                  </MenuButton>
                  <MenuList>
                    <MenuItem> kl </MenuItem>
                    <MenuItem> kl </MenuItem>
                  </MenuList>
                </Menu>
              </Td>

              {/* Price */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1em"
                    children="Rs."
                  />
                  <Input
                    type="number"
                    value={entry.purchasePrice}
                    onChange={(event) => {
                      updateStockPrice(
                        entry.productId,
                        parseFloat(event.target.value)
                      );
                    }}
                  />
                </InputGroup>
              </Td>
            </Tr>
          ))}

          <Tr>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillTabContainer small stock />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillingItemIdSelector small stock />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
