import './App.css';
import './App'

import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { 
  Button, Card, CardHeader, FormLabel, FormHelperText, Heading, IconButton, Image, Input,  Modal, ModalBody, 
  ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, useDisclosure, FormControl, 
  SimpleGrid, useToast, CardBody, Text, Tooltip, Menu, MenuList, MenuItem, MenuButton, 
  CardFooter,
  Select,
  Badge
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Home } from './App';

function parseWebsite(url) {
  const split = url.split('.')
  if (split[1] === 'mercari') {
    if (split[0].includes('j')) {
      return 'mercari jp'
    } else {
      return 'mercari us'
    }
  }
  return split[1]
}

function Items() {
  const [items, setItems] = React.useState([]);
  const [wishlists, setWishlists] = React.useState([]);

  useEffect(() => {
    const asyncGetItems = async () => {
      const result = await axios.get("/api/items/")
      setItems(result.data);
    }

    const asyncGetWishlist = async () => {
      const result = await axios.get("/api/wishlists/")
      setWishlists(result.data);
    }

    asyncGetItems();
    asyncGetWishlist();
  }, []);

  function getAllItems() {
    console.log("fetching items...")
    axios.get("/api/items/").then(response => {
      if (response.status >= 200 ) {
        console.log("[getAllItems] successful request")
        setItems(response.data)
      } else {
        console.error("eror encountered while making request, response code:", response.status)
        return Error
      }
    })
  }

  function ItemOptions({id, link}) {
    const toast = useToast()
    const handleItemDelete = async event => {
      console.log('deleting', id, '...')
      let url = '/api/items/' + id
      axios.delete(url).then(response => {
        if (response.status >= 200) {
          console.log("successful request")
          getAllItems()
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
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<EditIcon />}
          variant='ghost'
          sx={{position:'relative', left:'30%'}}
        />
        <MenuList>
          <MenuItem icon={<DeleteIcon />} onClick={handleItemDelete}>
            Delete
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} as='a' href={link} target='_blank'>
            Go to original page
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }

  function ItemHeader({id, link, image_link, name, website}) {
    return (
      <>
        <Badge 
          as='a' 
          href={link} 
          target='_blank' 
          sx={{
            position:'relative',
            right:'25%'
          }}
        >
          {website}
        </Badge>
        <ItemOptions id={id} link={link} />
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

  function Item({id, name, link, website, price, image_link}) {
    const {isOpen: isAddToWishlistOpen, onOpen: onAddToWishlistOpen, onClose: onAddToWishlistClose} = useDisclosure()
    const toast = useToast()
    const [itemID, setItemID] = React.useState(0)
    const [wishlistID, setWishlistID] = React.useState(0)
    const [isAddToWishlistLoading, setIsAddToWishlistLoading] = React.useState(false)

    function parseWishlistNames(wishlists) {
      var names = {}
      for (const value of wishlists) {
        names[value['id']] = value['name'];
      }
      return names
    }

    function createWishlistNamesOptions(wishlist) {
      var list = []
      for (const [key, value] of Object.entries(wishlist)) {
        list.push(
          <option value={key}>{value}</option>
        )
      }
      return list
    }

    const handleAddToWishlistSelectChange = event => {
      setWishlistID(event.target.selectedOptions[0].value)
      setItemID(event.target.id)
    }

    const handleAddToWishlistSubmit = async event => {
      event.preventDefault()
      var url = '/api/wishlists/' + wishlistID + '/'
      console.log('[handleAddToWishlistSubmit.url]', url, '\n[handleAddToWishlistSubmit.itemID]', itemID)
      setIsAddToWishlistLoading(true)
      try {
        axios.put(url, {
          items: [Number(itemID)]
        }).then(response => {
          if (response.statusText === 'OK') {
            console.log("[handleAddItemSubmit] success")
            setIsAddToWishlistLoading(false)
            toast({
              title: 'Success!',
              description: "Successfully added item to wishlist.",
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleAddItemSubmit] error encountered")
            setIsAddToWishlistLoading(false)
            toast({
              title: 'Error!',
              description: "An error occured whie trying to add the item to the database.",
              status: 'error',
              duration: 4000,
                isClosable: true,
                position: 'top'
            })
          }
        })
      } catch(error) {
        console.error("[handleAddItemSubmit] error encountered")
        setIsAddToWishlistLoading(false)
        toast({
          title: 'Error!',
          description: "An error occured whie trying to add the item to the database.",
          status: 'error',
          duration: 4000,
            isClosable: true,
            position: 'top'
        })
      }      
    }

    return (
      <Card variant='outline'>
        <CardHeader align='center' pb={0} pt={1}>
          <ItemHeader id={id} link={link} image_link={image_link} name={name} website={website}s/>
        </CardHeader>  
        <CardBody align='center' pb={5} pt={2}>
          <Text fontSize='l'>
            ${price.toFixed(2)}
          </Text>
        </CardBody>
        <CardFooter pt={0}>
          <Button 
            leftIcon={<AddIcon />} 
            w='full' 
            size='sm'
            onClick={onAddToWishlistOpen}>
              Add to Wishlist
              <Modal isOpen={isAddToWishlistOpen} onClose={onAddToWishlistClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add to Wishlist</ModalHeader>
                  <ModalCloseButton isDisabled={isAddToWishlistLoading} />
                  <ModalBody>
                    <FormControl isRequired>
                      <FormLabel>Wishlist</FormLabel>
                      <Select 
                        placeholder='Select a wishlist' 
                        id={id} 
                        onChange={handleAddToWishlistSelectChange}
                        isDisabled={isAddToWishlistLoading}
                      >
                        {createWishlistNamesOptions(parseWishlistNames(wishlists.values()))}
                      </Select>
                    </FormControl>
                  </ModalBody>
          
                  <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onAddToWishlistClose} isDisabled={isAddToWishlistLoading}>
                      Close
                    </Button>
                    <Button 
                      colorScheme='blue' 
                      type='submit'
                      onClick={handleAddToWishlistSubmit}
                      isLoading={isAddToWishlistLoading}
                      loadingText='Adding'>
                        Add to Wishlist
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  function createItemList(items) {
    var list = []
    for (let i = 0; i < items.length; i++) {
      list.push(
        <Item 
          id={items[i].id} 
          name={items[i].name} 
          link={items[i].link} 
          website={items[i].website} 
          price={items[i].price} 
          image_link={items[i].image_link}
        />
      )
    }

    return list
  }

  function AddItemButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [url, setURL] = React.useState('')
    const [isAddItemSubmitLoading , setIsAddItemSubmitLoading] = React.useState(false)
    const toast = useToast()
  
    const handleAddItemSubmit = async event => {
      event.preventDefault()
      setIsAddItemSubmitLoading(true)
      try {
        axios.post('/api/items/', {
          link: url,
          website: parseWebsite(url)
        }).then(response => {
          if (response.status >= 200) {
            console.log("[handleAddItemSubmit] successful request")
            getAllItems()
            toast({
              title: 'Success!',
              description: "Successfully added item into database.",
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
            setIsAddItemSubmitLoading(false)
          } else {
            console.error("[handleAddItemSubmit] error encountered")
            toast({
              title: 'Error!',
              description: "An error occured whie trying to add the item to the database.",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
            setIsAddItemSubmitLoading(false)
          }
        })
      } catch(error) {
        console.log(error)
        toast({
          title: 'Error!',
          description: "An error occured whie trying to add the item to the database.",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top'
        })
        setIsAddItemSubmitLoading(false)
      }
    };
  
    return (
      <>
        <Tooltip label="Add item to database" hasArrow placement='top-start'>
          <IconButton
            onClick={onOpen} 
            isRound 
            size='lg' 
            icon={<AddIcon />} 
            colorScheme='blue'
            sx={{
              p:'0',
              position:'fixed',
              right:'1%',
              bottom:'2%',
              zIndex:'2'
            }} 
          />
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Item</ModalHeader>
            { isAddItemSubmitLoading ? <ModalCloseButton isDisabled={true} /> : <ModalCloseButton />}
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>URL</FormLabel>
                <Input placeholder='Enter URL' isDisabled={isAddItemSubmitLoading} onChange={event => setURL(event.currentTarget.value)}/>
                <FormHelperText>
                  We'll scrape all the needed information from the URL you entered and add it onto our database.
                </FormHelperText>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isAddItemSubmitLoading}>Close</Button>
              <Button 
                colorScheme='blue' 
                type='submit' 
                onClick={handleAddItemSubmit} 
                isLoading={isAddItemSubmitLoading}
                loadingText='Submitting'>
                  Submit
              </Button> 
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  function ItemsBody({items}) {
    return(
      <>
        <SimpleGrid spacing={4} columns={5}>
          {createItemList(items)}
        </SimpleGrid>
        
        <AddItemButton />
      </>
    )
  } 

  return(
    <Home body={
        <ItemsBody items={items} />
      } 
    />
  )
}

export default Items;