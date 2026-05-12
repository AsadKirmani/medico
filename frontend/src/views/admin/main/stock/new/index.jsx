// Chakra imports
import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
    useColorModeValue,
    FormControl,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
  
  // Custom components
  import Card from "components/card/Card";
  import InputField from "components/fields/InputField";
  import TextField from "components/fields/TextField";
  import React, { useState, useEffect } from "react";
  import api from '../../../../../services/api';
  import { uid } from 'uid';
  import { useHistory } from 'react-router-dom';

  const STOCKS_STORAGE_KEY = "medico_stocks";

  const appendToStorage = (key, entry) => {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([...existing, entry]));
  };
  
  export default function NewStock() {
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [medicineName, setMedicineName] = useState("");
    const [description, setDescription] = useState("");
    const [sid, setSid] = useState("");
    const [quantity, setQuantity] = useState("");
    
    const addStock = async (e) => {
      e.preventDefault();

      const newStock = {
        medicineName: medicineName,
        description: description,
        sid: sid,
        quantity: quantity
      };

      appendToStorage(STOCKS_STORAGE_KEY, newStock);

      try {
        await api.post('/stock', newStock);
      } catch (err) {
        console.error(err)
      }

      setSuccess(true)
    }
    const closeAlert = () => {
      setSuccess(false);
      history.push('/admin/main/stocks/');
    }
    
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    useEffect(() => {
      setSid(uid(8))
    }, []);
  
    return (
      <Flex
        direction='column'
        minH='100vh'
        align='center'
        pt={{ sm: "125px", lg: "75px" }}
        position='relative'>
        <Box
          h='45vh'
          position='absolute'
          w='100%'
          borderRadius='20px'>
        <SimpleGrid
        columns={{ sm: 1, xl: 2 }}
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
            Fill in the stock details below
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <InputField
            mb='0px'
            me='30px'
            id='medicineName'
            placeholder="Dolo 650"
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
              placeholder="99"
              label='Quantity'
            />
          </Flex>
          <TextField
            id='description'
            label='Description'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder="Short description about this stock"
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
                    <AlertDescription>Stock added successfully!</AlertDescription>
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
      <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={e => addStock(e)}>
        Submit
      </Button>
    </Card>}
          </Box>
      </Flex>
    );
  }