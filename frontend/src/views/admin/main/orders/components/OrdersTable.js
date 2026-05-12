import {
    Badge,
  Box,
    Button,
    Flex,
    Icon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import { SearchBar } from "components/navbar/searchBar/SearchBar";
  import React, { useEffect, useMemo, useState } from "react";
  import { MdChevronRight, MdChevronLeft } from "react-icons/md";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import api from '../../../../../services/api';
import { Link, useHistory, Switch, Route } from "react-router-dom";
import Invoice from "../details";

  const ORDERS_STORAGE_KEY = "medico_orders";
  const DEFAULT_ORDERS = [
    { itemName: 'Paracetamol 500mg', email: 'ali@example.com', purchaseTime: '2026-04-01 10:30', status: 'completed', price: '250' },
    { itemName: 'Amoxicillin 250mg', email: 'sara@example.com', purchaseTime: '2026-04-03 14:15', status: 'pending', price: '180' },
    { itemName: 'Ibuprofen 400mg', email: 'john@example.com', purchaseTime: '2026-04-05 09:00', status: 'completed', price: '120' },
    { itemName: 'Omeprazole 20mg', email: 'maria@example.com', purchaseTime: '2026-04-07 16:45', status: 'pending', price: '95' },
    { itemName: 'Metformin 500mg', email: 'ahmed@example.com', purchaseTime: '2026-04-10 11:20', status: 'completed', price: '340' },
  ];

  const getStoredEntries = (key) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  
  function OrdersTable(props) {
    const { columnsData, tableData } = props;
    const { push } = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orders, setOrder] = useState(() => {
      const storedOrders = getStoredEntries(ORDERS_STORAGE_KEY);
      return storedOrders.length ? storedOrders : DEFAULT_ORDERS;
    });

    const getOrders = async () => {
      const storedOrders = getStoredEntries(ORDERS_STORAGE_KEY);
        try {
            const response = await api.get('/orders');
        const apiOrders = Array.isArray(response.data) ? response.data : [];
        setOrder([...storedOrders, ...apiOrders]);
            console.log(response.data)
        } catch (error) {
        if (storedOrders.length) {
          setOrder(storedOrders);
        }
            console.error(error)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => orders, [orders]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      gotoPage,
      pageCount,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      setGlobalFilter,
      state,
    } = tableInstance;
  
    const createPages = (count) => {
      let arrPageCount = [];
  
      for (let i = 1; i <= count; i++) {
        arrPageCount.push(i);
      }
  
      return arrPageCount;
    };
  
    const { pageIndex, pageSize } = state;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const brandColor = useColorModeValue("brand.500", "brand.400");
    return (
      <>
        <Flex
          direction='column'
          w='100%'
          overflowX='hidden'>
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "center" }}
            justify='space-between'
            w='100%'
            px='22px'
            gap='12px'
            mb='36px'>
            <SearchBar
              onChange={(e) => setGlobalFilter(e.target.value)}
              h='44px'
              w={{ base: "100%", lg: "390px" }}
              borderRadius='16px'
            />
            <Flex direction='column' align={{ base: "stretch", md: "flex-end" }}>
                        <Link to='/admin/main/orders/new'>
                      <Button
                        fontSize='sm'
                        variant="darkBrand"
                        color='white'
                        h='44px'
                        fontWeight='thin'
                        maxh='44px'
                        width={{ base: '100%', md: '200px' }}
                        >
                        Add Order
                      </Button>
                      </Link>
                      </Flex>
          </Flex>
          <Box w='100%' overflowX='auto'>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' minW='900px'>
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th 
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
                const order = row.original;

                return (
                  <Tr {...row.getRowProps()} key={index}>
                    <Td>
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        {order.itemName}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        {order.email}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        {order.purchaseTime}
                      </Text>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={
                          order.status === "completed" ? "green" : "red"
                        }
                        color={
                          order.status === "completed" ? "green.500" : "red.500"
                        }
                        fontSize='md'
                        fontWeight='500'>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Text color={textColor} fontSize='md' fontWeight='500'>
                        Rs.{order.price}
                      </Text>
                    </Td>
                    <Td>
                      <Link to='/admin/main/orders/view'>
                        <Text
                          cursor='pointer'
                          color={brandColor}
                          textDecoration='underline'
                          fontSize='md'
                          fontWeight='500'
                          onClick={onOpen}>
                          View order
                        </Text>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            </Table>
          </Box>
          <Flex
            direction={{ sm: "column", md: "row" }}
            justify='space-between'
            align='center'
            w='100%'
            px={{ md: "22px" }}>
            <Text
              fontSize='sm'
              color='gray.500'
              fontWeight='normal'
              mb={{ sm: "24px", md: "0px" }}>
              Showing {pageSize * pageIndex + 1} to{" "}
              {pageSize * (pageIndex + 1) <= orders?.length
                ? pageSize * (pageIndex + 1)
                : orders?.length}{" "}
              of {orders?.length} entries
            </Text>
            <Stack direction='row' alignSelf='flex-end' spacing='4px' ms='auto'>
              <Button
                variant='no-effects'
                onClick={() => previousPage()}
                transition='all .5s ease'
                w='40px'
                h='40px'
                borderRadius='50%'
                bg='transparent'
                border='1px solid'
                borderColor={useColorModeValue("gray.200", "white")}
                display={pageCount <= 1 ? "none" : canPreviousPage ? "flex" : "none"}
                _hover={{
                  bg: "whiteAlpha.100",
                  opacity: "0.7",
                }}>
                <Icon as={MdChevronLeft} w='16px' h='16px' color={textColor} />
              </Button>
              {pageCount <= 1 ? (
                <NumberInput
                  max={pageCount}
                  min={1}
                  w='75px'
                  mx='6px'
                  defaultValue='1'
                  onChange={(valueString) => gotoPage(Number(valueString) - 1)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper onClick={() => nextPage()} />
                    <NumberDecrementStepper onClick={() => previousPage()} />
                  </NumberInputStepper>
                </NumberInput>
              ) : (
                createPages(pageCount).map((pageNumber, index) => {
                  return (
                    <Button
                      variant='no-effects'
                      transition='all .5s ease'
                      onClick={() => gotoPage(pageNumber - 1)}
                      w='40px'
                      h='40px'
                      borderRadius='50%'
                      bg={
                        pageNumber === pageIndex + 1 ? brandColor : "transparent"
                      }
                      border={
                        pageNumber === pageIndex + 1
                          ? "none"
                          : "1px solid lightgray"
                      }
                      _hover={
                        pageNumber === pageIndex + 1
                          ? {
                              opacity: "0.7",
                            }
                          : {
                              bg: "whiteAlpha.100",
                            }
                      }
                      key={index}>
                      <Text
                        fontSize='sm'
                        color={pageNumber === pageIndex + 1 ? "#fff" : textColor}>
                        {pageNumber}
                      </Text>
                    </Button>
                  );
                })
              )}
              <Button
                variant='no-effects'
                onClick={() => nextPage()}
                transition='all .5s ease'
                w='40px'
                h='40px'
                borderRadius='50%'
                bg='transparent'
                border='1px solid'
                borderColor={useColorModeValue("gray.200", "white")}
                display={pageCount <= 1 ? "none" : canNextPage ? "flex" : "none"}
                _hover={{
                  bg: "whiteAlpha.100",
                  opacity: "0.7",
                }}>
                <Icon as={MdChevronRight} w='16px' h='16px' color={textColor} />
              </Button>
            </Stack>
          </Flex>
        </Flex>
        <Switch>
        <Route path='/admin/main/orders/view'>
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb="-100px">Invoice</ModalHeader>
          <ModalCloseButton onClick={() => {push('/admin/main/orders/')}} />
          <ModalBody>
            <Invoice />
          </ModalBody>
        </ModalContent>
      </Modal>
        </Route>
        </Switch>
      </>
    );
  }
  
  export default OrdersTable;
  