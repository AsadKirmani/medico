// Chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../../../../services/api';

export default function ProductPage() {
  const { medId } = useParams();
  const [ medicine, setMedicines ] = useState({});
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
  useEffect(() => {
    getMedicine()
    
  }, [])
  const [currentImage, setCurrentImage] = useState('');
  const [images, setImages] = useState([])
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

  return (
    <Card mt={{ sm: "125px", md: "75px" }} me={{ lg: "60px" }}>
      <Flex direction='column' w='100%'>
        <Flex direction={{ sm: "column", lg: "column", xl: "row" }}>
          <Flex
            direction='column'
            me={{ lg: "40px", xl: "60px" }}
            mb={{ sm: "24px", lg: "0px" }}>
            <Box
              w={{
                sm: "fit",
                md: "fit",
                lg: "800px",
                xl: "555px",
                "2xl": "745px",
              }}
              h={{
                sm: "100%",
                md: "670px",
                lg: "600px",
                xl: "555px",
                "2xl": "745px",
              }}
              mb='26px'
              align
              mx={{ sm: "auto", lg: "auto", xl: "0px" }}>
              <Image src={currentImage} w='100%' h='100%' borderRadius='15px' />
            </Box>
            <Stack
              direction='row'
              spacing={{ sm: "20px", md: "35px", lg: "20px" }}
              mx='auto'>
                {images?.map((url) => {
                  return (
              <Box
                w={{
                  sm: "42px",
                  md: "104px",
                  lg: "70px",
                  xl: "90px",
                  "2xl": "130px",
                }}
                h={{
                  sm: "42px",
                  md: "104px",
                  lg: "70px",
                  xl: "90px",
                  "2xl": "130px",
                }}>
                <Image
                  src={url}
                  w='100%'
                  h='100%'
                  borderRadius='15px'
                  cursor='pointer'
                  onClick={(e) => setCurrentImage(e.target.src)}
                />
              </Box>
                  )
                })} 
            </Stack>
          </Flex>
          <Flex direction='column'>
            <Text
              color={textColor}
              fontSize='3xl'
              fontWeight='bold'
              mt={{ sm: "20px", md: "50px", "2xl": "20px", "3xl": "50px" }}>
              {medicine.name}
            </Text>
            <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                    mb='12px'>
                    {medicine.groupName}
                  </Text>
            <Text
              fontColor='secondaryGray.600'
              pe={{ base: "0px", "3xl": "200px" }}
              mb='40px'>
            {medicine.description}
            </Text>
            <Flex mb='40px' alignItems='center'>
              <Text
                color={textColor}
                fontWeight='bold'
                fontSize='38px'
                me='10px'>
                Rs. {medicine.price}
              </Text>
              <Badge
                colorScheme='green'
                color='green.500'
                w='95px'
                h='28px'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                justifyContent='center'>
                IN STOCK
              </Badge>
            </Flex>
            <Flex
              mb='50px'
              direction='column'
              w={{ base: "fit", "2xl": "400px" }}>
              <SimpleGrid
                columns={{ md: "1", lg: "2" }}
                spacing='20px'
                w={{ base: "fit", "2xl": "400px" }}
                mb='20px'>
                <Flex direction='column' mb='14px'>
                    <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Company
                    </Text>
                    <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'>
                    {medicine.company}
                  </Text>
                </Flex>
                <Flex direction='column'>
                <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Stock in Qty.
                    </Text>
                    <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'>
                    {medicine.stock}
                  </Text>
                </Flex>
              </SimpleGrid>
              <SimpleGrid
                columns={{ md: "1", lg: "2" }}
                spacing='20px'
                w={{ base: "fit", "2xl": "400px" }}
                mb='20px'>
                <Flex direction='column' mb='14px'>
                    <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Manufacturing Date 
                    </Text>
                    <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'>
                    {medicine.mfgDate}
                  </Text>
                </Flex>
                <Flex direction='column'>
                <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Expiry Date
                    </Text>
                    <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'>
                    {medicine.expiryDate}
                  </Text>
                </Flex>
              </SimpleGrid>
             
            </Flex>
            <Accordion
              defaultIndex={[0]}
              allowToggle
              w={{ sm: "100%", md: "100%", xl: "94%" }}
              mb='16px'>
              <AccordionItem border='none'>
                <AccordionButton
                  _focus='none'
                  _hover='none'
                  p='20px 0px 20px 0px'
                  borderBottom='1px solid'
                  borderColor={borderColor}>
                  <Box flex='1' textAlign='left'>
                    <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Description
                    </Text>
                  </Box>
                  <AccordionIcon color='gray.500' />
                </AccordionButton>
                <AccordionPanel p='18px 0px 10px 0px'>
                  <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                    textAlign='left'
                    alignSelf='flex-start'
                    justifySelf='flex-start'>
                    {medicine.description}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem border='none'>
                <AccordionButton
                  _focus='none'
                  _hover='none'
                  p='20px 0px 20px 0px'
                  borderBottom='1px solid'
                  borderColor={borderColor}>
                  <Box flex='1' textAlign='left'>
                    <Text
                      color={textColor}
                      fontWeight='700'
                      fontSize={{ sm: "md", lg: "md" }}>
                      Usage
                    </Text>
                  </Box>
                  <AccordionIcon color='gray.500' />
                </AccordionButton>
                <AccordionPanel p='18px 0px 10px 0px'>
                  <Text
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                    textAlign='left'
                    alignSelf='flex-start'
                    justifySelf='flex-start'>
                    {medicine.usage}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
