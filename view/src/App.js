import './App.css';
import { Button, Grid, GridItem} from '@chakra-ui/react'

function Navigation() {
  return(
    <Grid templateColumns='repeat(5, 1fr)' data-testid='navigation-bar'>
      <GridItem w='100%'>
        <h1>Poca Wishlist Maker</h1>
      </GridItem>
      <GridItem colStart={4}>
        <Button>
          Items
        </Button>
      </GridItem>
      <GridItem>
        <Button>
          Wishlists
        </Button>
      </GridItem>
    </Grid>
  )
}

function App() {
  return (
    <Grid templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}>
      <GridItem>
        <Navigation />
      </GridItem>
    </Grid>
  );
}

export default App;
