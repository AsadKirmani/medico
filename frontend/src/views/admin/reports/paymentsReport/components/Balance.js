import React from "react";

// Chakra imports
import {
  Flex,
  Image,
  Icon,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Transaction from "components/dataDisplay/Transaction";
import Card from "components/card/Card.js";

// Assets
import balanceImg from "assets/img/dashboards/balanceImg.png";
import fakeGraph from "assets/img/dashboards/fakeGraph.png";
import { MdOutlineMoreHoriz, MdDomain, MdElectricCar } from "react-icons/md";

export default function Balance(props) {
  const { ...rest } = props;
  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  // Chakra Color Mode
  const blueIcon = useColorModeValue("blue.500", "white");
  const greenIcon = useColorModeValue("green.500", "white");
  const balanceBg = useColorModeValue("brand.900", "#1B254B");
  return (
    <Card direction='column' w='100%' {...rest}>
      <Flex
        justify='space-between'
        p='16px'
        mb='20px'
        borderRadius='16px'
        bgColor={balanceBg}
        bgImage={balanceImg}
        bgSize='cover'>
        <Flex align='center' justify='space-between' w='100%'>
          <Flex flexDirection='column' me='20px'>
            <Text color='white' fontSize='sm' fontWeight='500'>
              Overall Revenue
            </Text>
            <Text
              color='white'
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              Rs. 80,297
            </Text>
          </Flex>
          <Flex flexDirection='column' ms='auto' align='flex-end'>
            <Menu isOpen={isOpen1} onClose={onClose1}>
              <MenuButton onClick={onOpen1}>
                <Icon
                  cursor='pointer'
                  as={MdOutlineMoreHoriz}
                  color='white'
                  mt='-2px'
                  w='30px'
                  h='30px'
                />
              </MenuButton>
              
            </Menu>
            <Image src={fakeGraph} w='59px' h='17px' mt='6px' />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
