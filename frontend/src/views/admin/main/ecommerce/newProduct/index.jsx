// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Select,
  SimpleGrid,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Input,
  Image,
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
import TagsField from "components/fields/TagsField";
import React, { useRef, useState, useEffect } from "react";
import api from '../../../../../services/api';
import { uid } from 'uid';
import { useHistory } from 'react-router-dom';
import { MdOutlineCloudUpload } from "react-icons/md";

const MEDICINES_STORAGE_KEY = "medico_medicines";

const appendToStorage = (key, entry) => {
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([...existing, entry]));
};

// Assets

export default function NewMedicine() {
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [usage, setUsage] = useState("");
  const [description, setDescription] = useState("");
  const [medId, setMedId] = useState("");
  const [company, setCompany] = useState("");
  const [stock, setStock] = useState("");
  const [groupName, setGroupName] = useState("");
  const [image, setImages] = useState([]);
  
  const addMedicine = async (e) => {
    e.preventDefault();

    const newMedicine = {
      name: name,
      price: price,
      expiryDate: expiryDate,
      mfgDate: mfgDate,
      usage: usage,
      description: description,
      medId: medId,
      company: company,
      stock: stock,
      groupName: groupName,
      images: image
    };

    appendToStorage(MEDICINES_STORAGE_KEY, newMedicine);

    try {
      await api.post('/medicines', newMedicine);
    } catch (err) {
      console.error(err)
    }

    setSuccess(true)
  }
  const closeAlert = () => {
    setSuccess(false);
    history.push('/admin/inventory/medicines');
  }
  const handleClick = () => {
    btnRef.current.click()
  }
  const handleChange = (e) => {
    const selectedFiles = []
    const targetFiles = e.target.files
    const targetFilesObject = [...targetFiles]
    targetFilesObject.map((file) => {
       selectedFiles.push(URL.createObjectURL(file))
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = () => {
        image.push(reader.result)
       }
    })
    setPreview(selectedFiles)
      };
  
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [activeBullets, setActiveBullets] = useState({
    medicine: true,
    media: false,
    pricing: false,
  });
  const required = (value) => {
    if(!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      )
    }
  }

  const medicineTab = useRef();
  const mediaTab = useRef();
  const pricingTab = useRef();
  const btnRef = useRef(null);
  const brand = useColorModeValue("brand.500", "brand.400");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.100");
  let initialtags = [
    {
      name: "generic-medicine",
      id: 1
    },
    {
      name: "tablet",
      id: 2
    }
  ]
  useEffect(() => {
    setImages([])
    setMedId('MED' + uid(8).toUpperCase())
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
        bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
        position='absolute'
        w='100%'
        borderRadius='20px'></Box>

      <Tabs
        variant='unstyled'
        mt={{ base: "60px", md: "165px" }}
        zIndex='0'
        display='flex'
        flexDirection='column'>
        <TabList
          display='flex'
          align='center'
          alignSelf='center'
          justifySelf='center'>
          <Tab
            ref={medicineTab}
            _focus='none'
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                medicine: true,
                media: false,
                pricing: false,
              })
            }>
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.media ? "white" : "#8476FF",
                left: { sm: "12px", md: "40px" },
                top: {
                  sm: activeBullets.medicine ? "6px" : "4px",
                  md: null,
                },
                position: "absolute",
                bottom: activeBullets.medicine ? "40px" : "38px",

                transition: "all .3s ease",
              }}>
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.medicine ? "white" : "#8476FF"}
                bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.medicine ? "white" : "gray.300"}
                fontWeight={activeBullets.medicine ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}>
                Medicine Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={mediaTab}
            _focus='none'
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: false,
              })
            }>
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.pricing ? "white" : "#8476FF",
                left: { sm: "12px", md: "28px" },
                top: "6px",
                position: "absolute",
                bottom: activeBullets.media ? "40px" : "38px",

                transition: "all .3s ease",
              }}>
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.media ? "white" : "#8476FF"}
                bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.media ? "white" : "gray.300"}
                fontWeight={activeBullets.media ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}>
                Media
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={pricingTab}
            _focus='none'
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: true,
              })
            }>
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'>
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.pricing ? "white" : "#8476FF"}
                bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.pricing ? "white" : "gray.300"}
                fontWeight={activeBullets.pricing ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}>
                Pricing
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt='24px' maxW={{ md: "90%", lg: "100%" }} mx='auto'>
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p='0px'
            mx='auto'>
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Medicine Info
              </Text>
              <Flex direction='column' w='100%'>
                <SimpleGrid columns={{ base: "1", md: "2" }} gap='20px'>
                  <Stack direction='column' gap='20px'>
                    <InputField
                      mb='0px'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='eg. Augmentin 626 Duo Tablet'
                      r
                      label='Medicine Name'
                    />
                    <InputField
                      mb='0px'
                      id='quantity'
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder='eg. 20'
                      label='Quantity'
                    />
                    <InputField
                      mb='0px'
                      id='company'
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder='eg. Glaxo SmithKline Pharmaceuticals Ltd.'
                      label='Company'
                      />
                    <InputField
                      mb='0px'
                      id='mfgDate'
                      value={mfgDate}
                      onChange={(e) => setMfgDate(e.target.value)}
                      placeholder='eg. 01/01/2020'
                      label='Manufacturing Date'
                    />
                    <InputField
                      mb='0px'
                      id='expDate'
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder='eg. 10/10/2025'
                      label='Expiry Date'
                    />
                  </Stack>
                  <Stack direction='column' gap='20px'>
                    <InputField
                      mb='0px'
                      id='Group'
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder='Generic Medicine'
                      label='Medicine Group'
                    />
                    <TextField
                      h='146px'
                      mb='0px'
                      id='Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder='Short description about the medicine'
                      label='Description'
                      validatios={[required]}
                    />
                    <TextField
                      h='146px'
                      mb='0px'
                      id='Usage'
                      value={usage}
                      onChange={(e) => setUsage(e.target.value)}
                      placeholder='Usage of the medicine'
                      label='Usage'
                    />
                  </Stack>
                  
                </SimpleGrid>
                <Flex justify='space-between' mt='24px'>
                  <Button
                    variant='darkBrand'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: "128px", md: "148px" }}
                    h='46px'
                    ms='auto'
                    onClick={() => mediaTab.current.click()}>
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p='0px'
            mx='auto'>
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Media
              </Text>
  
                 <Flex
                   align='center'
                   justify='center'
                   bg={bg}
                   border='1px dashed'
                   borderColor={borderColor}
                   borderRadius='16px'
                   w='100%'
                   maxW='100%'
                   h='max-content'
                   minH='130px'
                   cursor='pointer'
                   pt='80px !important'
                   pb='105px !important'
                   onClick={handleClick}>
                   <Button variant="no_effects">
                     {preview?.map((url, index) => (
                      
                        <Image src={url} key={index} width='50px' height='50px'/>
                      
                    ))}
                   <Box>
                               <Icon
                                 as={MdOutlineCloudUpload}
                                 w='80px'
                                 h='80px'
                                 color={textColor}
                               />
                               <Text
                                 mx='auto'
                                 mb='12px'
                                 fontSize='lg'
                                 fontWeight='700'
                                 whiteSpace='pre-wrap'
                                 color={textColor}>
                                 Drop your files here, or{" "}
                                 <Text
                                   as='span'
                                   fontSize='lg'
                                   fontWeight='700'
                                   color={brand}>
                                   browse
                                 </Text>
                               </Text>
                               <Text
                                 fontSize='sm'
                                 fontWeight='500'
                                 color='secondaryGray.500'>
                                 PNG, JPG and GIF files are allowed
                               </Text>
                             </Box>
                   </Button>
                    <Input type="file" ref={btnRef} hidden onChange={(e) => {handleChange(e)}} id="btn" multiple isRequired/>
                 </Flex>

              <Flex justify='space-between' mt='24px'>
                <Button
                  variant='light'
                  fontSize='sm'
                  borderRadius='16px'
                  w={{ base: "128px", md: "148px" }}
                  h='46px'
                  onClick={() => medicineTab.current.click()}>
                  Prev
                </Button>
                <Button
                  variant='darkBrand'
                  fontSize='sm'
                  borderRadius='16px'
                  w={{ base: "128px", md: "148px" }}
                  h='46px'
                  onClick={() => pricingTab.current.click()}>
                  Next
                </Button>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p='0px'
            mx='auto'>
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Pricing
              </Text>
              <Flex direction='column' w='100%'>
                <Stack direction='column' spacing='20px'>
                  <SimpleGrid
                    columns={{ base: "1", md: "3" }}
                    gap={{ base: "0px", md: "20px" }}>
                    <InputField
                      id='price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder='eg. Rs.99'
                      label='Price'
                    />
                    <InputField
                      id='medId'
                      value={medId}
                      disabled
                      label='MedId'
                    />
                    <Flex direction='column' mb='34px'>
                      <FormLabel
                        ms='10px'
                        htmlFor='currency'
                        fontSize='sm'
                        color={textColor}
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
                        defaultValue='inr'>
                        <option value='inr'>INR</option>
                      </Select>
                    </Flex>
                  </SimpleGrid>
                  <TagsField placeholderTags={initialtags} />
                </Stack>
                  {success ? 
                <Flex mt='24px'>
                    <Alert status="success">
                    <AlertIcon />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Medicine added successfully!</AlertDescription>
                    <CloseButton
                          position='absolute'
                          fontSize={{ sm: "8px", md: "12px" }}
                          right={{ sm: "-4px", md: "8px" }}
                          top={{ sm: "-4px", md: "8px" }}
                          onClick={closeAlert}
                        />
                  </Alert>
                </Flex>
                  : <Flex justify='space-between' mt='24px'>
                    <Button
                    variant='light'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: "128px", md: "148px" }}
                    h='46px'
                    onClick={() => mediaTab.current.click()}>
                    Prev
                  </Button>
                  <Button
                    variant='darkBrand'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: "128px", md: "148px" }}
                    h='46px'
                    onClick={e => addMedicine(e)}>
                    Submit
                  </Button>
                    </Flex>}
              </Flex>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}