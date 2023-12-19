import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useBillStore from "../../functions/store/billStore";
import BillingTabItemSelector from "./BillingItemTabSelector";
import BillTabContainer from "./BillTabContainer";
import BillingItemIdSelector from "./BillingItemIdSelector";

export const BillingTable = () => {
  const { BillEntries, updateBillEntryQuantity, updateBillEntryPrice } =
    useBillStore();

  function numberWithCommas(x: number) {
    return parseInt(
      x.toString().split(".")[0].length > 3
        ? x
            .toString()
            .substring(0, x.toString().split(".")[0].length - 3)
            .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
            "," +
            x.toString().substring(x.toString().split(".")[0].length - 3)
        : x.toString()
    ).toFixed(2);
  }

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
              Price/Unit
              <hr />
              <small> with tax </small>
            </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              {" "}
              Tax Applied{" "}
            </Th>
            <Th borderRight="0.1px solid #d9d9d9" textAlign="center">
              {" "}
              Total{" "}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {BillEntries.map((entry, index) => (
            <Tr key={index} borderBottom="1px solid #f1f1f1">
              {/* Serial No. */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {index + 1}
              </Td>

              {/* Product Code */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.productId} </Td>

              {/* Product Name */}
              <Td borderRight="0.1px solid #d9d9d9"> {entry.productName} </Td>

              {/*  Quantity  */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                <Editable
                  value={entry.quantity.toString()}
                  onChange={(quantity) => {
                    updateBillEntryQuantity(
                      entry.productId,
                      parseInt(quantity)
                    );
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
                  <EditableInput />
                </Editable>
                <Kbd marginLeft={"-"}>kg</Kbd>
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
                    value={entry.billPrice}
                    onChange={(event) =>
                      updateBillEntryPrice(
                        entry.productId,
                        parseFloat(event.target.value)
                      )
                    }
                  />
                </InputGroup>
              </Td>

              {/* Tax App. */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {entry.taxApplied + "%"}
              </Td>

              {/* Total */}
              <Td borderRight="0.1px solid #d9d9d9" isNumeric>
                {entry.total}
              </Td>
            </Tr>
          ))}

          <Tr>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              -
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillTabContainer small />
            </Td>
            <Td borderRight="0.1px solid #d9d9d9" background="gray.700">
              <BillingItemIdSelector small />
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
