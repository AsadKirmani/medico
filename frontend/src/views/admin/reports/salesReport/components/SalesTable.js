import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Chakra imports
import {
  Badge,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import Menu from "./DownloadMenu";

function SalesTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

  return (
    <Card>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ lg: "center" }}
          justify={{ base: "space-between" }}
          w='100%'
          px='20px'
          mb='20px'>
          <Text
            color={textColor}
            fontSize='xl'
            fontWeight='600'
            lineHeight='100%'>
            Recent Sales
          </Text>
          <Menu columns={columns} data={data}/>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Name") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='600'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Product") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='600'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Date") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='600'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Status") {
                      data = (
                        <Badge
                          colorScheme={
                            cell.value === "REJECTED" ? "red" : "green"
                          }
                          color={
                            cell.value === "REJECTED" ? "red.500" : "green.500"
                          }
                          fontSize='sm'
                          fontWeight='600'>
                          {cell.value.toLowerCase()}
                        </Badge>
                      );
                    } else if (cell.column.Header === "Price") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='600'>
                          {cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "120px", md: "200px", lg: "auto" }}
                        borderColor='transparent'
                        mt='20px !important'
                        py='10px !important'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Card>
  );
}

export default SalesTable;