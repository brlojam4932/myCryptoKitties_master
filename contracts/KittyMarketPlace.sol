// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "./kittiesContract.sol";

// Filip has 'is Ownable' instead and Ownable probably inherits myKittiesContract

contract KittyMarketPlace is myKittiesContract {

  myKittiesContract private _kittyContract;

  struct Offer {
    address payable seller;
    uint256 price;
    uint256 index;
    uint256 tokenId;
    bool active;
  }

  mapping(uint256 => Offer) tokenIdToOffer;
  mapping(uint256 => uint256) tokenIdToOfferId;

  event MarketTransaction(string TxType, address owner, uint256 tokenId);


  Offer[] offers;


  function setKittyContract(address _kittyContractAddress) public onlyOwner() { // External functions read from calldata, directly || Public functions copies array arguments to memory)
    _kittyContract = myKittiesContract(_kittyContractAddress);

  }

  constructor(address _kittyContractAddress) {
        setKittyContract(_kittyContractAddress);
    }
  

   function getOffer(uint256 _tokenId) external view returns (address seller, uint256 price, uint256 index, uint256 tokenId, bool active) {
     Offer storage returnOffers = tokenIdToOffer[_tokenId];
     return (returnOffers.seller, returnOffers.price, returnOffers.index, returnOffers.tokenId, returnOffers.active);
     
   }

   function getAllTokenOnSale() public view returns(uint256[] memory listOfOffers) {
     // this array lets us loop through the array and find all of the tokens so we can then display them all on a web page
     uint256 totalOffers = offers.length;

     if (totalOffers == 0) {
       return new uint256[](0); // empty array takes a space in the array such as [0]
     } 
     else {
       uint256[] memory resultOfToken = new uint256[](totalOffers);

       uint256 offerId; 

       // cannot remove inactive orders from arrays so this is the best solution thus far

       for(offerId = 0; offerId < totalOffers; offerId++) {
         if(offers[offerId].active == true) { // if - offers array, [offer id] -> price is true, then result is resultOfToken [offerId] equals; offers array [offerId] of tokenId
         resultOfToken[offerId] = offers[offerId].tokenId;
         }
       }
       return resultOfToken;

     }
   }

  /*
  // my version
   function _ownsKitty(address _address, uint256 _tokenId) internal returns (bool) {
    kittyIndexToOwner[_tokenId] = _address;
    return true;
   }
   */

  // Filip's version
  function _ownsKitty(address _address, uint256 _tokenId) internal view returns (bool) {
    return (_kittyContract.ownerOf(_tokenId) == _address);
  }
    
   /*
    *   We give the contract the ability to transfer kitties
    *   As the kitties will be in the market place we need to be able to transfer them
    *   We are checking if the user is owning the kitty inside the approve function
    */
    
    /*
    function createKittyGen0(uint256 _genes) public override onlyOwner returns(uint256 kitty) {
      kitty = _createKitty(0, 0, 0, _genes, msg.sender);
      //uint256 tokenId = kitty;
      //setOffer(0.2 ether, tokenId);
    }
    */

   function setOffer(uint256 _price, uint256 _tokenId) public {
     require(_price > 0.009 ether, "Cat price should be greater than 0.01" );
     require(tokenIdToOffer[_tokenId].active == false, "You can't sell twice the same offers");
     require (_ownsKitty(msg.sender, _tokenId), "You are not the owner that kitty");
     // kitty contract needs to be approved for all
     require(_kittyContract.isApprovedForAll(msg.sender, address(this)), "Contract needs approval for future transfers"); // Market Place needs to be approved as the operator

     //approve(address(this), _tokenId); // from gitHub contract

     Offer memory _offer = Offer({
       seller: (payable(msg.sender)),
       price: _price,
       index: offers.length,
       tokenId: _tokenId,
       active: true
     });

    // we add new offer, this specific tokenId, to tokenIdToOffer mapping and it's pushed into the offer's array
     tokenIdToOffer[_tokenId] = _offer;
     offers.push(_offer);

     // here, Filip created offers.length with the object's index parameter so we don't neet this function any more
     //uint256 index = offers.length -1; 
     //tokenIdToOfferId[_tokenId] = index;

     emit MarketTransaction("Create offer", msg.sender, _tokenId);

   }


   function removeOffer(uint256 _tokenId) public {
     require(_owns(msg.sender, _tokenId), "User does not own this token");

     Offer memory offer = tokenIdToOffer[_tokenId];

     require(offer.seller == msg.sender, "This asset must be owned by the seller in order to remove offer");

    /* Remove the offer in the mapping*/
     /* we set mapping to false */
     // tutorial functions are different than final contract on github

     //delete offers[tokenIdToOfferId[_tokenId]]; previous function
     delete tokenIdToOffer[_tokenId]; //we delete tokenIdToOffer, then we set the offer in array to false
     //offers[tokenIdToOfferId[_tokenId]].active == false; // mine, not sure if this works
     //offers[tokenIdToOffer[_tokenId].index].active = false; // filip's functions
     offers[offer.index].active = false; // cleaner from Filip

     //_deleteApproval(_tokenId); filip did not use this in tutorial
      emit MarketTransaction("Remove offer", msg.sender, _tokenId);
      
   }


    function buyKitty(uint256 _tokenId) public payable { // we input the offer, we get back the offer
      Offer memory offer = tokenIdToOffer[_tokenId];
      require(msg.value == offer.price, "The price is correct");
      require(tokenIdToOffer[_tokenId].active == true, "No active order present");

      /* Remove the offer in the mapping*/
      
      // Important: delete kitty from mapping BEFORE paying out; to prevent reentry attacks
      delete tokenIdToOffer[_tokenId]; // we can delete from mapping but not from the array since it will alter the index positions

      /* we set mapping to false */
      offers[offer.index].active = false;

      // This was in the video but not in final gitHub contract
      // transfer funds to seller
      // TO DO: make this pull logic instead of push
      if(offer.price > 0) { // we send the funds to seller
        offer.seller.transfer(offer.price);
      }
      
      //* TMP REMOVE THIS*/
      //_approve(_tokenId, msg.sender); 

      // transfer owndership of the kitty
      _kittyContract.transferFrom(offer.seller, msg.sender, _tokenId); // we send tokens to buyer: (seller, buyer, token)

      offer.seller.transfer(msg.value);
      emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

}

// MarketPlace Front End
// add tab: Market Place - display only cats which are currently for sale
// Create a place, window, to create offers - maybe a box, sell kitty, how much

// Approval
// Check if users have given operator approval to the market place contract
// If not, ask user to do that - maybe open a Meta Mask window
// one could use individual approvals per token, alternatively

// Code
// Two seperate contract instances
// One instance for Kitty contract
// One instance for Market Place contract
// We will need two abis', two contract addresses...with Web3

// Conclucion
// Interface to Buy and Sell the cats
// Use contract
// Seller needs to give marke place contract operator approval before creating an offer







