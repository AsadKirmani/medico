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

  const { vId } = useParams();
  const [ company, setCompany ] = useState({});
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const getCompanies = async () => {
    try {
      const { data } = await api.get(`/vendors/${vId}`);
      setCompany(data)
    } catch (err) {
      console.error(err)
    }
  }
  const updateCompany = async (e) => {
    try {
      e.preventDefault();
      const response = await api.put(`/vendors/${vId}`, {
        name: name,
        description: description,
        address: address,
        contact: contact
      }).then(() => {
        setSuccess(true)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const deleteCompany = async () => {
    const response = await api.delete(`/vendors/${vId}`, {
      id: company.vId
    }).then(() => {
      alert("deleted")
    }).then(() => {
      <Redirect to="/admin/main/all-companies" />
    })
  }
  const closeAlert = () => {
    setSuccess(false)
  }
  useEffect(() => {
    getCompanies()
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
            Company Information
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change company information
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <InputField
            mb='0px'
            me='30px'
            id='medicineName'
            placeholder={company?.name}
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            label='Company Name'
          />
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='stock'
              value={contact}
              onChange={(e) => {setContact(e.target.value)}}
              placeholder={company?.contact}
              label='Contact'
            />
          </Flex>
            <InputField
              mb='25px'
              me='30px'
              id='stock'
              value={address}
              onChange={(e) => {setAddress(e.target.value)}}
              placeholder={company?.address}
              label='Address'
            />
          <TextField
            id='description'
            label='Description'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder={company?.description}
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
                    <AlertDescription>Company information updated successfully!</AlertDescription>
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
          onClick={deleteCompany}>
          Delete Stock
        </Button>
      </LightMode>
      <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={e => updateCompany(e)}>
        Save changes
      </Button>
    </Card>}
    </Box>
  );
}
