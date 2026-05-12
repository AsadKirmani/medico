import {
    Box,
    Icon,
    SimpleGrid,
    useColorModeValue,
    Text,
    Button
  } from "@chakra-ui/react";
  
  // Custom components
  
  import Card from "components/card/Card"
  import IconBox from "components/icons/IconBox";
  import React from "react";
  import {
    MdOutlineHealthAndSafety,
    MdOutlinePayments,
    MdKeyboardArrowDown,
    MdOutlineMedicalServices,
    MdOutlineWarningAmber,
    MdOutlineKeyboardDoubleArrowRight
  } from "react-icons/md";
  import { HSeparator } from "components/separator/Separator";
  import { connect } from "react-redux";
  import { Link, Redirect } from "react-router-dom";
  
  function Main(props) {
    // Chakra Color Mode
    const { isLoggedIn } = props;
    const brandColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    if (!isLoggedIn) {
        return <Redirect to='/auth' />
       }
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4, "2xl": 4 }}
          gap='20px'
          mb='20px'>
            <Card style={{border:'1px solid #01a768'}}>
              <Box align='center'>
              <IconBox                                      
              w='56px'
              h='56px'
              icon={
                <Icon w='48px' h='48px' as={MdOutlineHealthAndSafety} color='#01a768' />
              }
              />
              <Text align="center" fontSize='2xl' fontWeight='extrabold' mt='10px'>Good</Text>
              <Text align="center" fontSize='md' fontWeight='thin' mt='5px'>Inventory Status</Text>
              <Link to='/admin/inventory/list-of-medicines/'>
              <Button isFullWidth color={brandColor} variant='outline' rightIcon={<MdOutlineKeyboardDoubleArrowRight />} mt='10px'>
                View Detailed Report
              </Button>
              </Link>
              </Box>
            </Card>
            <Card style={{border:'1px solid #fed600'}}>
              <Box align='center'>
              <IconBox                                      
              w='56px'
              h='56px'
              icon={
                <Icon w='48px' h='48px' as={MdOutlinePayments} color='#fed600' />
              }
              />
              <Text align="center" fontSize='2xl' fontWeight='extrabold' mt='10px'>Rs. 8,55,875</Text>
              <Text align="center" fontSize='md' fontWeight='thin' mt='5px'>Revenue Jan 1 <Icon as={MdKeyboardArrowDown} /></Text>
              <Link to='/admin/reports/payments-reports'>
              <Button isFullWidth color={brandColor} variant="outline" rightIcon={<MdOutlineKeyboardDoubleArrowRight />} mt='10px'>
                View Detailed Report
              </Button>
              </Link>
              </Box>
            </Card>
            <Card style={{border:'1px solid #03a9f5'}}>
              <Box align='center'>
              <IconBox                                      
              w='56px'
              h='56px'
              icon={
                <Icon w='48px' h='48px' as={MdOutlineMedicalServices} color='#03a9f5' />
              }
              />
              <Text align="center" fontSize='2xl' fontWeight='extrabold' mt='10px'>298</Text>
              <Text align="center" fontSize='md' fontWeight='thin' mt='5px'>Medicines Available</Text>
              <Link to='/admin/inventory/list-of-medicines/'>
              <Button isFullWidth color={brandColor} variant="outline" rightIcon={<MdOutlineKeyboardDoubleArrowRight />} mt='10px'>
                View Detailed Report
              </Button>
              </Link>
              </Box>
            </Card>
            <Card style={{border:'1px solid #f0483e'}}>
              <Box align='center'>
              <IconBox                                      
              w='56px'
              h='56px'
              icon={
                <Icon w='48px' h='48px' as={MdOutlineWarningAmber} color='#f0483e' />
              }
              />
              <Text align="center" fontSize='2xl' fontWeight='extrabold' mt='10px'>01</Text>
              <Text align="center" fontSize='md' fontWeight='thin' mt='5px'>Medicine Shortage</Text>
              <Button isFullWidth color={brandColor} variant='outline' rightIcon={<MdOutlineKeyboardDoubleArrowRight />} mt='10px'>
                View Detailed Report
              </Button>
              </Box>
            </Card>
        </SimpleGrid>
        <Box color='white' pt={{ base: "50px", md: "25px", xl: "20px" }}>
              <SimpleGrid
              columns={{base:1, md:1, lg:2, '2xl': 3}}
              gap='20px'
              mb='20px'>
                <Card style={{border:'1px solid #cccdcf'}}>
                  <Box>
                  <div style={{justifyContent:'space-between', display:'flex'}}>
                    <Text fontWeight='bold' fontSize='xl' color={textColor}>Inventory</Text>
                    <Button color={brandColor} variant="outline" mb='10px' rightIcon={<MdOutlineKeyboardDoubleArrowRight/>}>
                      Go to Configuration</Button>
                    </div>
                    <HSeparator />
                    <div style={{justifyContent:'space-between', display:'flex'}}>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>298</Text>
                      <Text color={textColor} textOverflow='clip' overflow='hidden'>Total no of Medicines</Text>
                      </div>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>24</Text>
                      <Text color={textColor} fontWeight='thin' textOverflow='clip' overflow='hidden'>Medicine Groups</Text>
                      </div>
                    </div>
                  </Box>
                </Card>
                <Card style={{border:'1px solid #cccdcf'}}>
                  <Box>
                  <div style={{justifyContent:'space-between', display:'flex'}}>
                    <Text color={textColor} mb='5px' fontWeight='bold' fontSize='xl'>Quick Report</Text>
                    <Text color={textColor} mb='5px'>January 2022 <Icon as={MdKeyboardArrowDown} /></Text>
                    </div>
                    <HSeparator />
                    <div style={{justifyContent:'space-between', display:'flex'}}>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>70,856</Text>
                      <Text color={textColor}>Qty of Medicines Sold</Text>
                      </div>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>5,288</Text>
                      <Text color={textColor} fontWeight='thin' textOverflow='clip' overflow='hidden'>Invoices Generated</Text>
                      </div>
                    </div>
                  </Box>
                </Card>
                <Card style={{border:'1px solid #cccdcf'}}>
                  <Box>
                  <div style={{justifyContent:'space-between', display:'flex'}}>
                    <Text color={textColor} mb='5px' fontWeight='bold' fontSize='xl'>My Pharmacy</Text>
                    <Button color={brandColor} variant="outline" mb='10px' rightIcon={<MdOutlineKeyboardDoubleArrowRight/>}>
                      Go to User Management</Button>
                    </div>
                    <HSeparator />
                    <div style={{justifyContent:'space-between', display:'flex'}}>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>04</Text>
                      <Text color={textColor}>Total no of Suppliers</Text>
                      </div>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>05</Text>
                      <Text color={textColor} fontWeight='thin'>Total no of Users</Text>
                      </div>
                    </div>
                  </Box>
                </Card>
                <Card style={{border:'1px solid #cccdcf'}}>
                  <Box>
                  <div style={{justifyContent:'space-between', display:'flex'}}>
                    <Text color={textColor} mb='5px' fontWeight='bold' fontSize='xl'>Customers</Text>
                    <Button color={brandColor} variant="outline" mb='10px' rightIcon={<MdOutlineKeyboardDoubleArrowRight/>}>
                      Go to Customers Page</Button>
                    </div>
                    <HSeparator />
                    <div style={{justifyContent:'space-between', display:'flex'}}>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>845</Text>
                      <Text color={textColor} textOverflow='clip' overflow='hidden'>Total no of Customers</Text>
                      </div>
                      <div style={{flexDirection:'column'}}>
                      <Text color={textColor} fontWeight='bold' fontSize='xl' mt='20px'>Adalimumab</Text>
                      <Text color={textColor} fontWeight='thin'>Frequently Bought Item</Text>
                      </div>
                    </div>
                  </Box>
                </Card>
              </SimpleGrid>
        </Box>
      </Box>
    );
  }

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    return {
      isLoggedIn,
    }
  }
  
  export default connect(mapStateToProps)(Main);