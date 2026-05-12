import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
// Assets
import {
  BsFiletypePdf,
  BsFileEarmarkExcel
} from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";

export default function Banner(props) {
  const { columns, data, ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const  tableColumns = columns.map((column) =>{
    return column.Header
  })
  const tableRows = [];
  data.map((item) => (
    tableRows.push([
      item.name,
      item.product,
      item.date,
      item.status,
      item.price
    ])
  ));

  const GeneratePDF = () => {
  const doc = new jsPDF();
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
    });
    doc.text("Sales Report", 20, 10);
    doc.save("Sales Report");
  }
  const GenerateSheet = () => {
    downloadExcel({
      fileName: "Sales Report",
      sheet: "sales",
      tablePayload: {
        header: tableColumns,
        body: tableRows
      }
    })
  }
  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <Tooltip label="Download Reports">
      <MenuButton
        align='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        onClick={onOpen1}
        borderRadius='10px'
        {...rest}>
        <Icon as={MdOutlineFileDownload} color={iconColor} w='24px' h='24px' />
      </MenuButton>
        </Tooltip>
      <MenuList
        w='150px'
        minW='unset'
        maxW='150px !important'
        border='transparent'
        backdropFilter='blur(63px)'
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='15px'>
        <MenuItem
          transition='0.2s linear'
          color={textColor}
          _hover={textHover}
          p='0px'
          borderRadius='8px'
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb='10px'
          onClick={GeneratePDF}>
          <Flex align='center'>
            <Icon as={BsFiletypePdf} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              PDF
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem
          transition='0.2s linear'
          p='0px'
          borderRadius='8px'
          color={textColor}
          _hover={textHover}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb='10px'
          onClick={GenerateSheet}>
          <Flex align='center'>
            <Icon as={BsFileEarmarkExcel} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Excel
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
