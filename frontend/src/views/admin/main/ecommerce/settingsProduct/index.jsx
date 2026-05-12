import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import api from '../../../../../services/api'
// Chakra imports
import { Box, Flex, Image, SimpleGrid, Button, LightMode, FormControl, Text, useColorModeValue, FormLabel, Select } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import TagsField from "components/fields/TagsField";
import Dropzone from "views/admin/main/ecommerce/settingsProduct/components/DropzoneCard";

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const { medId } = useParams();
  const [ medicine, setMedicines ] = useState({});
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [usage, setUsage] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [stock, setStock] = useState("");
  const [groupName, setGroupName] = useState("");
  const [currentImage, setCurrentImage] = useState('');
  const [images, setImages] = useState([])
  const getMedicine = async () => {
    try {
      const { data } = await api.get(`/medicines/${medId}`);
      setMedicines(data)
      setImages(data.images)
      data.images.map((src, index) => {
        if(index === 0)
        setCurrentImage(src)
      })
    } catch (err) {
      console.error(err)
    }
  }
  const updateMedicine = async (e) => {
    try {
      e.preventDefault();
      const response = await api.put(`/medicines/${medId}`, {
        name: name,
        price: price,
        expiryDate: expiryDate,
        mfgDate: mfgDate,
        usage: usage,
        description: description,
        company: company,
        stock: stock,
        groupName: groupName,
        medId: medicine.medId
      }).then(() => {
        setSuccess(true)
      }).catch((err) => {
        console.error(err)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const deleteMedicine = async () => {
    const response = await api.delete(`/medicines/${medId}`, {
      medId: medicine.medId
    }).then(() => {
      alert("deleted")
    }).then(() => {
      <Redirect to="/admin/inventory/medicines" />
    })
  }
  useEffect(() => {
    getMedicine()
  }, [])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ sm: 1, xl: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* Column Left */}
        <Flex direction='column'>
          <Card mb='20px'>
            <Image
              borderRadius='20px'
              h={{ base: "auto", xl: "396px", "2xl": "auto" }}
              src={currentImage}
            />
          </Card>
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
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            label='Medicine Name'
          />
          <InputField
            mb='0px'
            id='group'
            label='Group Name'
            value={groupName}
            onChange={(e) => {setGroupName(e.target.value)}}
            placeholder={medicine.groupName}
          />
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='stock'
              value={stock}
              onChange={(e) => {setStock(e.target.value)}}
              placeholder={medicine.stock}
              label='Quantity'
            />
            <InputField
              mb='0px'
              id='company'
              label='Company'
              value={company}
              onChange={(e) => {setCompany(e.target.value)}}
              placeholder={medicine.company}
            />
          </Flex>
          <Flex direction='column'>
            <InputField
              mb='25px'
              me='30px'
              id='mfgDate'
              value={mfgDate}
              onChange={(e) => {setMfgDate(e.target.value)}}
              placeholder={medicine.mfgDate}
              label='Manufacturing Date'
            />
            <InputField
              mb='0px'
              id='expiryDate'
              label='Expiry Date'
              value={expiryDate}
              onChange={(e) => {setExpiryDate(e.target.value)}}
              placeholder={medicine.expiryDate}
            />
          </Flex>
          <TextField
            id='description'
            label='Description'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder={medicine.description}
            mb='0px'
            h='100%'
          />
          <TextField
            id='usage'
            label='Usage'
            mb='0px'
            h='100%'
            value={usage}
            onChange={(e) => {setUsage(e.target.value)}}
            placeholder={medicine.usage}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
        </Flex>
        {/* Column Right */}
        <Flex direction='column'>
          <Dropzone mb='20px' />
        </Flex>
      </SimpleGrid>
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
                value={price}
                onChange={(e) => {setPrice(e.target.value)}}
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
          onClick={deleteMedicine}>
          Delete medicine
        </Button>
      </LightMode>
      <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={e => updateMedicine(e)}>
        Save changes
      </Button>
    </Card>
    </Box>
  );
}
