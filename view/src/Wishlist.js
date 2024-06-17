import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import { AddIcon, EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import { 
  Box, Divider, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, VStack, 
  Tooltip, useDisclosure, useToast,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, 
  ModalFooter, ModalOverlay, FormControl, FormLabel, Button, Textarea, Text, Card, CardHeader, CardBody, 
  Flex, SimpleGrid, Image, Menu, MenuList, MenuButton, MenuItem,
  Link, Badge, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, 
  AlertDialogFooter
} from "@chakra-ui/react"

export function Wishlists() {
  const [wishlists, setWishlists] = React.useState([])
  const [selectedWishlist, setSelectedWishlist] = React.useState(0)

  useEffect(() => {
    const asyncCall = async () => {
      const result = await axios.get("/api/wishlists/")
      setWishlists(result.data)
      console.log('result.data', result.data)
    }
    asyncCall();
  }, []);


  function getAllWishlists() {
    console.log("fetching items...")
    axios.get("/api/wishlists/").then(response => {
      if (response.status >= 200 ) {
        console.log("[getAllWishlists] successful request")
        setWishlists(response.data)
      } else {
        console.error("eror encountered while making request, response code:", response.status)
        return Error
      }
    })
  }
  
  function CreateWishlistButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [isLoading , setIsLoading] = React.useState(false)
    const toast = useToast()
  
    const handleSubmitCreateWishlist = async event => {
      event.preventDefault()
      setIsLoading(true)
      try {
        axios.post('/api/wishlists/', {
          name: name,
          description: description
        }).then(response => {
          if (response.status >= 200) {
            console.log("[handleSubmitCreateWishlist] successful request")
            getAllWishlists()
            toast({
              title: 'Success!',
              description: "Successfully created ", name,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleSubmitCreateWishlist] error encountered")
            setIsLoading(false)
            toast({
              title: 'Error!',
              description: "An error occured whie trying to create the wishlist.",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          }
        })
      } catch(error) {
        console.error("[handleSubmitCreateWishlist] error encountered")
        setIsLoading(false)
        toast({
          title: 'Error!',
          description: "An error occured whie trying to create the wishlist.",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top'
        })
      }
    };
    
    return (
      <>
          <Tooltip label='Create a wishlist' hasArrow placement='top-start'>
            <IconButton
              onClick={onOpen}  
              size='sm' 
              icon={<AddIcon />} 
              colorScheme='blue'
            />
          </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Wishlist</ModalHeader>
            { isLoading ? <ModalCloseButton isDisabled={true} /> : <ModalCloseButton />}
            <ModalBody>
              <FormControl isRequired pb={1}>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder='Enter name' 
                  isDisabled={isLoading} 
                  onChange={event => setName(event.currentTarget.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder='Enter description' 
                  onChange={event => setDescription(event.currentTarget.value)}
                  isDisabled={isLoading} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isLoading}>Close</Button>
              <Button 
                colorScheme='blue' 
                type='submit' 
                onClick={handleSubmitCreateWishlist} 
                isLoading={isLoading}
                loadingText='Submitting'>
                  Submit
                </Button> 
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  function WishlistOptions({id}) {
    const {isOpen: isConfirmWishlistDeleteAlertDialogOpen, 
           onOpen: onConfirmWishlistDeleteAlertDialogOpen, 
           onClose: onConfirmWishlistDeleteAlertDialogClose } = useDisclosure()
    const cancelRef = React.useRef()
    
    const toast = useToast()
    const handleWishlistDelete = async event => {
      console.log('[handleWishlistDelete] deleting', id, '...')
      let url = '/api/wishlists/' + id + '/'
      axios.delete(url).then(response => {
        if (response.status >= 200) {
          console.log("[handleWishlistDelete] successful request")
          getAllWishlists()
          selectedWishlist > 1 ? setSelectedWishlist(selectedWishlist-1) : setSelectedWishlist(0)
          toast({
            title: 'Success!',
            description: "Successfully deleted item from database.",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top'
          })
        } else {
          console.error("error encountered")
          toast({
            title: 'Error!',
            description: "Unable to delete item from database.",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top'
          })
        }
      })
    };

    return(
      <>
        <Tooltip label='Delete this wishlist' hasArrow>
          <IconButton icon={<DeleteIcon />} onClick={onConfirmWishlistDeleteAlertDialogOpen} />
        </Tooltip>
        <AlertDialog
          isOpen={isConfirmWishlistDeleteAlertDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={onConfirmWishlistDeleteAlertDialogClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Wishlist
              </AlertDialogHeader>
        
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
        
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onConfirmWishlistDeleteAlertDialogClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleWishlistDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
      
    )
  }

  function createWishlistList(wishlists) {
    function handleWishlistClick(event) {
      setSelectedWishlist(Number(event.target['offsetParent'].id))
    }

    var list = []
    for (let i = 0; i < wishlists.length; i++) {
      var temp = 
          <Card 
            w='full'
            mt={0} 
            as={Link}
            mb={0} 
            id={i}
            backgroundColor={selectedWishlist === i ? 'yellow.100' : 'white'}
            onClick={event => handleWishlistClick(event)}
          >
          <CardHeader pb='0'>
            <Flex justifyContent='space-between'>
              <Heading size='s'>{wishlists[i].name}</Heading>
            </Flex>
          </CardHeader>
          <CardBody pt='1%'>
            <Text fontSize='xs'>Tags</Text>
            {/* TODO: add Tags here */ }
          </CardBody>
        </Card>
       
      list.push(temp)
    }

    return list
  }

  function SmallItemHeader({id, link, image_link, name, website}) {
    const toast = useToast()

    const handleSmallItemDeleteOnClick = event => {
      console.log("[handleSmallItemDeleteOnClick] event.target.id", event.target.id, 
                  "\n[handleSmallItemDeleteOnClick] selectedWishlist", wishlists[selectedWishlist].id)
      var url = '/api/wishlists/' + wishlists[selectedWishlist].id + '/'
      try {
        axios.patch(url, {
          items: [id],
          updated_at: new Date()
        }).then(response => {
          if (response.statusText === 'OK') {
            console.error("[handleSmallItemDeleteOnClick] error encountered")
            getAllWishlists()
            toast({
              title: 'Success!',
              description: "Successfully removed item from wishlist.",
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleSmallItemDeleteOnClick] error encountered")
            toast({
              title: 'Error!',
              description: "An error occured whie trying to remove this item from the wishlist.",
              status: 'error',
              duration: 4000,
                isClosable: true,
                position: 'top'
            })
          }
        })
      } catch(error) {
        console.error("[handleSmallItemDeleteOnClick] error encountered")
        toast({
          title: 'Error!',
          description: "An error occured whie trying to remove this item from the wishlist.",
          status: 'error',
          duration: 4000,
            isClosable: true,
            position: 'top'
        })
      }
    }

    return (
      <>
        <Badge 
          as='a' 
          href={link} 
          target='_blank' 
          mb={2}
          mt={1}
          sx={{
            position:'relative',
            right:'26%'
          }}
        >
          {website}
        </Badge>
        <IconButton 
          icon={<DeleteIcon />} 
          size='xs'
          variant='ghost' 
          sx={{position: 'relative',
            left:'26%'
          }}
          id={id}
          onClick={handleSmallItemDeleteOnClick}
        />
        <Image src={image_link} boxSize='150px' mb={2} objectFit='cover' /> 
        <Heading size='s'>
          <span className='id' style={{display:'none'}}>{id}</span>
          <Tooltip label={name} hasArrow>
            <Text noOfLines={2} pb={1}>
              {name}
            </Text>
          </Tooltip>
        </Heading>
      </>
    )
  }

  function SmallItem({id, name, link, website, price, image_link}) {
    return (
      <Card variant='outline'>
          <CardHeader align='center' pb={0} pt={1}>
            <SmallItemHeader id={id} link={link} image_link={image_link} name={name} website={website} />
          </CardHeader>  
          <CardBody align='center' pb={5} pt={2}>
            <Text fontSize='md'>
              ${price.toFixed(2)}
            </Text>
          </CardBody>
        </Card>
    )
  }
  
  function createItemList(items) {
    var list = []
    for (let i = 0; i < items.length; i++) {
      list.push(
        <SmallItem 
          id={items[i].id} 
          name={items[i].name} 
          link={items[i].link} 
          website={items[i].website} 
          price={items[i].price} 
          image_link={items[i].image_link}
        />
      )
    }

    return (
      <SimpleGrid spacing={2} columns={5} pt={2}>
        {list}
      </SimpleGrid>
    )
  }

  function WishlistDetails({wishlist}) {
    return (
      <Box 
        w='full' 
        textAlign='left'
        p={2}>
        <Flex justifyContent='space-between'>
          <Heading size='lg'>
            {wishlist.name}
          </Heading>
          <WishlistOptions id={wishlist.id} />
        </Flex>

        {wishlist.description !== '' ? 
          <>
            <Heading size='s' pb={1} pt={2}>Description</Heading>
            <Text textAlign='left' fontSize='sm'>{wishlist.description}</Text>
            <Divider p={1} />
          </>
          : <Box><Divider p={1} /></Box>}
        
      </Box>
    )
  }

  return (
    <Grid templateAreas={`"list content"`}
          gridTemplateColumns={'23%'}>
      <GridItem area={'list'}  p={4} minHeight='90vh' borderRight='1px' borderRightColor='gray.300'>
        <Box>
          <Flex justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Wishlists</Heading>
            <CreateWishlistButton />
          </Flex>
          <InputGroup mt={1} mb={2}>
            <Input placeholder='Search' variant='filled' />
            <InputRightElement>
              <IconButton icon={<SearchIcon />} size='sm'/>
            </InputRightElement>
          </InputGroup>
        </Box>
        <VStack>
          {createWishlistList(wishlists)}
        </VStack>
      </GridItem>
      <GridItem area={'content'}>
        <Box p={2}>
          {wishlists.length !== 0 ? 
            <WishlistDetails wishlist={wishlists[selectedWishlist]} /> : <Box></Box>
          }
          {wishlists.length !== 0 ? 
            createItemList(wishlists[selectedWishlist]['items']) : <Box></Box>
          }
        </Box>
      </GridItem>
    </Grid>
  )
}