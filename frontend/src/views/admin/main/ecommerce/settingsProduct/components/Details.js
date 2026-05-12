// Chakra imports
import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import TagsField from "components/fields/TagsField";
import React from "react";
export default function Settings(props) {
  const { medicine } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  return (
    <FormControl>
      <Card mb='20px'>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Pricing Details
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change your medicine pricing details
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Flex direction='column'>
            <SimpleGrid
              mb='20px'
              columns={{ sm: 1, md: 2 }}
              spacing={{ base: "20px", xl: "20px" }}>
              <InputField
                mb='0px'
                me='30px'
                id='price'
                label='Price'
                placeholder={medicine.price}
              />
              <InputField
                mb='0px'
                id='medId'
                label='Medicine Id'
                isDisabled
                value={medicine.medId}
              />
            </SimpleGrid>
            <Flex direction='column'>
              <FormLabel
                ms='10px'
                htmlFor='currency'
                fontSize='sm'
                color={textColorPrimary}
                fontWeight='bold'
                _hover={{ cursor: "pointer" }}>
                Currency
              </FormLabel>
              <Select
                fontSize='sm'
                id='currency'
                variant='main'
                h='44px'
                maxh='44px'
                me='20px'
                defaultValue='inr'>
                <option value='usd'>INR</option>
              </Select>
            </Flex>
          </Flex>
          <TagsField
            id='description'
            label='Description'
            mb='0px'
            h='140px'
            placeholderTags={[
              {
                name: "generic-medicine",
                id: 1,
              },
              {
                name: "tablet",
                id: 2,
              },
            ]}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
