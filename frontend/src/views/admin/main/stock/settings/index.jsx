import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import api from '../../../../../services/api'
// Chakra imports
import { 
    Box,
    Flex,
    SimpleGrid,
    Button, 
    LightMode, 
    FormControl, 
    Text, 
    useColorModeValue ,
    Alert,
    AlertTitle,
    AlertIcon,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const { sid } = useParams();
  const [ stock, setStock ] = useState({});
  const [success, setSuccess] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const getStocks = async () => {
    try {
      const { data } = await api.get(`/stock/${sid}`);
      setStock(data)
    } catch (err) {
      console.error(err)
    }
  }
  const updateStock = async (e) => {
    try {
      e.preventDefault();
      const response = await api.put(`/stock/${sid}`, {
        medicineName: medicineName,
        description: description,
        quantity: quantity,
      }).then(() => {
        setSuccess(true)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const deleteStock = async () => {
    const response = await api.delete(`/stock/${sid}`, {
      id: stock.sid
    }).then(() => {
      alert("deleted")
    }).then(() => {
      <Redirect to="/admin/main/stocks" />
    })
  }
  const closeAlert = () => {
    setSuccess(false)
  }
  useEffect(() => {
    getStocks()
  }, [])
  return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ sm: 1, xl: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* Column Left */}
        <Flex direction='column'>
          <FormControl>
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Stock Information
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change stock information
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <InputField
            mb='0px'
            me='30px'
            id='medicineName'
            placeholder={stock?.medicineName}
            value={medicineName}
            onChange={(e) => {setMedicineName(e.target.value)}}
            label='Medicine Name'
          />
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='stock'
              value={quantity}
              onChange={(e) => {setQuantity(e.target.value)}}
              placeholder={stock?.quantity}
              label='Quantity'
            />
          </Flex>
          <TextField
            id='description'
            label='Description'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder={stock?.description}
            mb='0px'
            h='100%'
          />
        </SimpleGrid>
      </Card>
    </FormControl>
        </Flex>
      </SimpleGrid>
      {success ? 
                <Flex mt='24px'>
                    <Alert status="success">
                    <AlertIcon />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Stock updated successfully!</AlertDescription>
                    <CloseButton
                          position='absolute'
                          fontSize={{ sm: "8px", md: "12px" }}
                          right={{ sm: "-4px", md: "8px" }}
                          top={{ sm: "-4px", md: "8px" }}
                          onClick={closeAlert}
                        />
                  </Alert>
                  </Flex> :
      <Card
      p='60px 30px'
      flexDirection={{ base: "column", md: "row" }}
      alignItems='center'>
      <LightMode>
        <Button
          colorScheme='red'
          variant='outline'
          p='15px 40px'
          fontSize='sm'
          fontWeight='500'
          ms={{ base: "0", md: "auto" }}
          mb={{ base: "20px", md: "0" }}
          me={{ base: "0", md: "20px" }}
          _hover={{ bg: "whiteAlpha.100" }}
          _focus={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          onClick={deleteStock}>
          Delete Stock
        </Button>
      </LightMode>
      <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={e => updateStock(e)}>
        Save changes
      </Button>
    </Card>}
    </Box>
  );
}
