import {
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
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import ProductPage from "../../../main/ecommerce/pageProduct";
import ProductSettings from '../../../main/ecommerce/settingsProduct'
import React, { useMemo, useEffect, useState } from "react";
import api from '../../../../../services/api';
import { MdChevronRight, MdChevronLeft, MdEdit } from "react-icons/md";
import { useHistory, Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const MEDICINES_STORAGE_KEY = "medico_medicines";

const getStoredEntries = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function MedicinesTable(props) {
  const { columnsData, tableData } = props;
  const { push } = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [medicines, setMedicines ] = useState(() => getStoredEntries(MEDICINES_STORAGE_KEY));
  const [isEditing, setIsEditing] = useState(false);
  
  const getMedicines = async () => {
    const storedMedicines = getStoredEntries(MEDICINES_STORAGE_KEY);
    try {
      const response = await api.get('/medicines');
      const apiMedicines = Array.isArray(response.data) ? response.data : [];
      setMedicines([...storedMedicines, ...apiMedicines]);
    } catch (error) {
      if (storedMedicines.length) {
        setMedicines(storedMedicines);
      }
      console.error(error);
    }
  }
  const handleEditing = () => {
    setIsEditing(true)
  }
  const closeEditing = () => {
    setIsEditing(false)
  }
  useEffect(() => {
    getMedicines();
    setIsEditing()
  },[])

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

  const {
    getTableProps,
    headerGroups,
    gotoPage,
    pageCount,
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
            mb='36px'
            gap='12px'>
            <SearchBar
              onChange={(e) => setGlobalFilter(e.target.value)}
              h='44px'
              w={{ lg: "390px" }}
              borderRadius='16px'
            />
            <Flex direction='column' align={{ base: "stretch", md: "flex-end" }}>
                       
                        <Link to='/admin/inventory/medicines/new'>
                      <Button
                        fontSize='sm'
                        variant="darkBrand"
                        color='white'
                        h='44px'
                        fontWeight='thin'
                        maxh='44px'
                        width={{base: "100%", md: "200px"}}
                        >
                        Add Medicine
                      </Button>
                      </Link>
                     
                      </Flex>
          </Flex>
        <Box w='100%' overflowX='auto'>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' minW='700px'>
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
          <Tbody>
              {medicines?.map((medicine, index) => {
                return (
                  <Tr key={index}>
                  <Td>
                    <Text color={textColor} fontSize='md' fontWeight='500'>{medicine.name}</Text>
                    </Td>
                  <Td>
                    <Text color={textColor} fontSize='md' fontWeight='500'>{medicine.medId}</Text>
                    </Td>
                  <Td>
                    <Text color={textColor} fontSize='md' fontWeight='500'>{medicine.groupName}</Text>
                  </Td>
                  <Td>
                    <Text color={textColor} fontSize='md' fontWeight='500'>{medicine.stock}</Text>
                  </Td>
                  <Td>
                    <Link to={`/admin/inventory/medicines/${medicine.medId}`}>
                  <Text
                          cursor='pointer'
                          color={brandColor}
                          textDecoration='underline'
                          fontSize='md'
                          fontWeight='500'
                          onClick={onOpen}>
                          View full detail
                        </Text>
                    </Link>
                  </Td>
                  <Td>
                    <Flex cursor='pointer' h='max-content' w='max-content'>
                    <Link to={`/admin/inventory/medicines/${medicine.medId}/edit`}>
                          <Icon
                            color='secondaryGray.500'
                            as={MdEdit}
                            w='20px'
                            h='20px'
                            onClick={(e) => {handleEditing(e); onOpen()}}
                          />
                    </Link>
                        </Flex>
                  </Td>
                </Tr>
                )
              })}
          </Tbody>
        </Table>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
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
            {pageSize * (pageIndex + 1) <= medicines?.length
              ? pageSize * (pageIndex + 1)
              : medicines?.length}{" "}
            of {medicines?.length} entries
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
              display={
                medicines?.length === 5 ? "none" : canPreviousPage ? "flex" : "none"
              }
              _hover={{
                bg: "whiteAlpha.100",
                opacity: "0.7",
              }}>
              <Icon as={MdChevronLeft} w='16px' h='16px' color={textColor} />
            </Button>
            {medicines?.length === 4 ? (
              <NumberInput
                max={pageCount - 1}
                min={1}
                w='75px'
                mx='6px'
                defaultValue='1'
                onChange={(e) => gotoPage(e)}>
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
              display={pageSize === 5 ? "none" : canNextPage ? "flex" : "none"}
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
        <Route path={isEditing ? '/admin/inventory/medicines/:medId/edit' : '/admin/inventory/medicines/:medId'}>
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb="-100px">Medicine Info</ModalHeader>
          <ModalCloseButton onClick={() => {push('/admin/inventory/medicines/'); closeEditing()}} />
          <ModalBody>
            {isEditing ? <ProductSettings/> : <ProductPage />}
          </ModalBody>
        </ModalContent>
      </Modal>
        </Route>
        </Switch>
    </>
  );
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(MedicinesTable);
