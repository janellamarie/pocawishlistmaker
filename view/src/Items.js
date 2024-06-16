import './App.css';
import './App'

import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { 
  Button, Card, CardHeader, FormLabel, FormHelperText, Heading, IconButton, Image, Input,  Modal, ModalBody, 
  ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, useDisclosure, FormControl, 
  SimpleGrid, useToast, CardBody, Text, Tooltip, Menu, MenuList, MenuItem, MenuButton 
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

  useEffect(() => {
    const asyncCall = async () => {
      const result = await axios.get("/api/items/")
      setItems(result.data);
    }

    asyncCall();
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
          sx={{position:'relative', left:'48%'}}
        />
      <MenuList>
          <MenuItem icon={<DeleteIcon />} onClick={handleItemDelete}>
            Delete
          </MenuItem>
          <MenuItem icon={<AddIcon />}>
            Add to Wishlist
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} as='a' href={link} target='_blank'>
            Go to original page
          </MenuItem>
      </MenuList>
      </Menu>
    )
  }
  
  function createList(items) {
    var list = []
    for (let i = 0; i < items.length; i++) {
      // console.log(items[i])
      list.push(
        <Card variant='outline'>
          <CardHeader align='center' pb={0} pt={1}>
            <ItemOptions 
              id={items[i].id}
              link={items[i].link}
            />
              <Image src={items[i].image_link} boxSize='150px' mb={2}/> 
              <Heading size='s'>
                <span className='id' style={{display:'none'}}>{items[i].id}</span>
                <Tooltip label={items[i].name} hasArrow>
                  <Text noOfLines={2} pb={1}>
                    {items[i].name}
                  </Text>
                </Tooltip>
              </Heading>
          </CardHeader>  
          <CardBody align='center' pb={5} pt={2}>
            <Text fontSize='l'>
              {items[i].website === "mercari us" ? "¥" : "$" }
              {items[i].price.toFixed(2)}
            </Text>
          </CardBody>
        </Card>
      )
    }
    return (
      <SimpleGrid spacing={4} columns={5}>
        {list}
      </SimpleGrid>
    )
  }

  function AddItemButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [url, setURL] = React.useState('')
    const [isLoading , setIsLoading] = React.useState(false)
    const toast = useToast()
  
    const handleSubmit = async event => {
      event.preventDefault()
      setIsLoading(true)
      try {
        axios.post('/api/items/', {
          link: url,
          website: parseWebsite(url)
        }).then(response => {
          if (response.status >= 200) {
            console.log("[handleSubmit] successful request")
            getAllItems()
            toast({
              title: 'Success!',
              description: "Successfully added item into database.",
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleSubmit] error encountered")
            toast({
              title: 'Error!',
              description: "An error occured whie trying to add the item to the database.",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
            setIsLoading(false)
          }
        }).done()
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
        setIsLoading(false)
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
            { isLoading ? <ModalCloseButton isDisabled={true} /> : <ModalCloseButton />}
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>URL</FormLabel>
                <Input placeholder='Enter URL' isDisabled={isLoading} onChange={event => setURL(event.currentTarget.value)}/>
                <FormHelperText>
                  We'll scrape all the needed information from the URL you entered and add it onto our database.
                </FormHelperText>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isLoading}>Close</Button>
              <Button 
                colorScheme='blue' 
                type='submit' 
                onClick={handleSubmit} 
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
  
  function ItemsBody({items}) {
    return(
      <>
        {createList(items)}
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