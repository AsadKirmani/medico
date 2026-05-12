import {
  Avatar,
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
} from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import api from 'services/api';
import { Redirect, Link } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const USERS_STORAGE_KEY = "medico_users";
const DEFAULT_USERS = [
  { firstName: 'Ali', lastName: 'Khan', email: 'ali.khan@example.com', username: 'alikhan' },
  { firstName: 'Sara', lastName: 'Ahmed', email: 'sara.ahmed@example.com', username: 'saraahmed' },
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', username: 'johndoe' },
  { firstName: 'Maria', lastName: 'Garcia', email: 'maria.garcia@example.com', username: 'mariagarcia' },
  { firstName: 'Ahmed', lastName: 'Siddiqui', email: 'ahmed.s@example.com', username: 'ahmedsid' },
];

const getStoredEntries = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function UsersTable(props) {
  const { columnsData, tableData } = props;
  const [users, setUser] = useState(() => {
    const storedUsers = getStoredEntries(USERS_STORAGE_KEY);
    return storedUsers.length ? storedUsers : DEFAULT_USERS;
  });
  const getUsers = async () => {
    const storedUsers = getStoredEntries(USERS_STORAGE_KEY);
    try {
      const response = await api.get('/users');
      const apiUsers = Array.isArray(response.data) ? response.data : [];
      setUser([...storedUsers, ...apiUsers]);
      console.log(response.data)
    } catch (error) {
      if (storedUsers.length) {
        setUser(storedUsers);
      }
      console.error(error);
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

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
            <Link to='/admin/main/users/new'>
          <Button
            fontSize='sm'
            variant="darkBrand"
            color='white'
            h='44px'
            fontWeight='thin'
            maxh='44px'
            width={{ base: '100%', md: '200px' }}
            >
            Add User
          </Button>
          </Link>
          </Flex>
        </Flex>
        <Box w='100%' overflowX='auto'>
          <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' minW='860px'>
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
          <Tbody >
            {users.map((user, index) => {
              return (
                <Tr key={index}>
                    <Td>
                        <Flex align='center'>
                          <Avatar
                            src='#'
                            h='60px'
                            w='60px'
                            me='10px'
                          />
                          <Text
                            color={textColor}
                            fontSize='md'
                            fontWeight='500'>
                            {user.firstName} {user.lastName}
                          </Text>
                        </Flex>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize='md' fontWeight='500'>
                          {user.email}
                        </Text>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize='md' fontWeight='500'>
                          @{user.username}
                        </Text>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize='md' fontWeight='500'>
                          Apr, 10, 2023
                        </Text>
                    </Td>
                   <Td>
                        <Text color={textColor} fontSize='md' fontWeight='500'>
                          Admin
                        </Text>
                   </Td>
                   <Td>
                        <Text
                          cursor='pointer'
                          color={brandColor}
                          textDecoration='underline'
                          fontSize='md'
                          fontWeight='500'
                          >
                          Edit user
                        </Text>
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
            {pageSize * (pageIndex + 1) <= users.length
              ? pageSize * (pageIndex + 1)
              : users.length}{" "}
            of {users.length} entries
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
                pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
              }
              _hover={{
                bg: "whiteAlpha.100",
                opacity: "0.7",
              }}>
              <Icon as={MdChevronLeft} w='16px' h='16px' color={textColor} />
            </Button>
            {pageSize === 4 ? (
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
    </>
  );
}

export default UsersTable;
