// Chakra imports
import { Button, Flex, Input, useColorModeValue, Text, Box, Icon } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
// Assets
import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

function Dropzone(props) {
  const { content, ...rest } = props;
  const [image, setImage] = useState([]);
  const brand = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({noClick: true, noKeyboard: true});
  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = () => {
    const files = acceptedFiles.map(async file => {
    const base64 = await convertToBase64(file);
    image.push(base64)
    console.log(base64)
  })
  };

  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.100");
  return (
    <>
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
        {...getRootProps({ className: "dropzone" })}
        pt='80px !important'
        pb='105px !important'
        {...rest}>
        <Input variant='main' {...getInputProps()} />
        <Button variant='no-effects' onClick={open}>
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
      </Flex>
    </>
  );
}

export default Dropzone;
