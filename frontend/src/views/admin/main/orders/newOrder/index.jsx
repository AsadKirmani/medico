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
  CloseButton,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React, { useState } from "react";
import api from "../../../../../services/api";
import { useHistory } from "react-router-dom";

const ORDERS_STORAGE_KEY = "medico_orders";

const appendToStorage = (key, entry) => {
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([...existing, entry]));
};

export default function NewOrder() {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const addOrder = async (e) => {
    e.preventDefault();

    const newOrder = {
      itemName,
      price,
      contact,
      quantity,
      description,
      purchaseTime: new Date().toLocaleString(),
      status: "pending",
    };

    appendToStorage(ORDERS_STORAGE_KEY, newOrder);

    try {
      await api.post("/orders", {
        itemName,
        price,
        contact,
        quantity,
        description,
      });
    } catch (err) {
      console.error(err);
    }

    setSuccess(true);
  };

  const closeAlert = () => {
    setSuccess(false);
    history.push("/admin/main/orders");
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

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
                Order Information
              </Text>
              <Text fontSize='md' color={textColorSecondary}>
                Fill in the order details below
              </Text>
            </Flex>
            <SimpleGrid
              columns={{ sm: 1, md: 2 }}
              spacing={{ base: "20px", xl: "20px" }}>
              <InputField
                mb='0px'
                me='30px'
                id='medicineName'
                placeholder="Cipla"
                value={itemName}
                onChange={(e) => {setItemName(e.target.value)}}
                label='Item Name'
              />
              <Flex direction='column'>
                <InputField
                  mb='25px'
                  me='30px'
                  id='Price'
                  value={price}
                  onChange={(e) => {setPrice(e.target.value)}}
                  placeholder="Price in Rs."
                  label='Price'
                />
              </Flex>
              <Flex direction='column'>
                <InputField
                  mb='25px'
                  me='30px'
                  id='contact'
                  value={contact}
                  onChange={(e) => {setContact(e.target.value)}}
                  placeholder="email or phone no."
                  label='Contact'
                />
              </Flex>
              <Flex direction='column'>
                <InputField
                  mb='25px'
                  me='30px'
                  id='quantity'
                  value={quantity}
                  onChange={(e) => {setQuantity(e.target.value)}}
                  placeholder="e.g. 10"
                  label='Quantity'
                  />
                </Flex>
                <TextField
                id='description'
                label='Description'
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
                placeholder="Short description about the order."
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
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Order added successfully!</AlertDescription>
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
          <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={e => addOrder(e)}>
            Submit
          </Button>
        </Card>
        }
              </Box>
          </Flex>
  );
}
