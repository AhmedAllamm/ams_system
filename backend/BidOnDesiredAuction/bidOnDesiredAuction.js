const express = require("express");
const app = express();
const { v4 } = require('uuid')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World')
  })

  // ARRAY OF OBJECTS CONTAINING AUCTIONS
  const auctions = [
    {
      id: 1,
      name:  'Camera',
      startingPrice: 1100,
      category :"Electronics",
  },
  {
      id: 2,
      name:  'Painting',
      startingPrice: 10000,
      category :"Art",
  },
  {
      id: 3,
      name:  'Gun',
      startingPrice: 2175,
      category :"Weapons",
  },
  
  {
      id: 4,
      name:  'Antique Dagger',
      startingPrice: 60000,
      category :"Weapons",
  },
  {
      id: 5,
      name:  'Signed Football',
      startingPrice: 40000,
      category :"Sports",
  },
  {
      id: 6,
      name:  'Ancient Asian Coin',
      startingPrice: 10000,
      category :"Artifacts",
  },
  ];

   
  
  app.get('/auctions', (req, res) => {
    res.send(auctions)
  })

 
  app.get('/auctions/:id', (req, res) => {
    const {id} = req.params;
    const auctionsIndex = auctions.findIndex((item) => item.id == id)
    if (auctionsIndex == -1){
      res.statusCode = 404;
      res.send({message: "Auction not found"});
    } 
    else {
      res.send(auctions[auctionsIndex]);
    }
    res.send(id)
  })


app.put("/auctions/:id", (req, res) => 
{
  const {id} = req.params;
  const data = req.body;
  const auctionsIndex = auctions.findIndex((item) => item.id == id)
    if (auctionsIndex == -1){
      res.statusCode = 404;
      res.send({message: "Auction not found"});
    } 
    else {
      const startingPrice = parseFloat(data.startingPrice);
      if (startingPrice >= auctions[auctionsIndex].startingPrice) {
        auctions[auctionsIndex].startingPrice = startingPrice;
        res.send({ message: "Price changed successfully." })
        res.json(auctions[auctionsIndex]);
        
      } else {
        res.statusCode = 400;
        res.send({ message: "Price cannot be lower than the current starting price" });
      }
    }

})

  app.listen(4000, "localhost", () =>
  {
    console.log("Server is running");
  })


  