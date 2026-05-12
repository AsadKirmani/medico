// Chakra imports
import {
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React from "react";
export default function Settings(props) {
  const { medicine } = props;
  
 
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  return (
    <FormControl>
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Medicine Information
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change medicine information
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <InputField
            mb='0px'
            me='30px'
            id='medicineName'
            placeholder={medicine.name}
            label='Medicine Name'
          />
          <InputField
            mb='0px'
            id='group'
            label='Group'
            placeholder={medicine.groupName}
          />
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='stock'
              placeholder={medicine.stock}
              label='Quantity'
            />
            <InputField
              mb='0px'
              id='company'
              label='Company'
              placeholder={medicine.company}
            />
          </Flex>
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='mfgDate'
              placeholder={medicine.mfgDate}
              label='Manufacturing Date'
            />
            <InputField
              mb='0px'
              id='expiryDate'
              label='Expiry Date'
              placeholder={medicine.expiryDate}
            />
          </Flex>
          <TextField
            id='description'
            label='Description'
            placeholder={medicine.description}
            mb='0px'
            h='100%'
          />
          <TextField
            id='usage'
            label='Usage'
            mb='0px'
            h='100%'
            placeholder={medicine.usage}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
