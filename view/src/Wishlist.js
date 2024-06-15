import { SearchIcon } from "@chakra-ui/icons"
import { Box, Divider, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react"

export function Wishlists() {
  return (
    <Grid templateAreas={`"list main"`}
      gridTemplateColumns={'30% 1fr'}
    >
      <GridItem area={'list'}>
        <Box backgroundColor='blue.200'>
          <Heading>Wishlists</Heading>
          <InputGroup>
            <Input placeholder='Search' variant='filled' />
            <InputRightElement>
              <IconButton icon={<SearchIcon />} size='sm'/>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Divider/>
        <VStack>
          <Box>
            
          </Box>
        </VStack>
        
      </GridItem>
      <GridItem area={'main'}>

      </GridItem>
    </Grid>
  )
}