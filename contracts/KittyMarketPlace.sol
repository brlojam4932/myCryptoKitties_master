// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./kittiesContract.sol";

contract KittyMarketPlace is Ownable, myKittiesContract {

  struct Offer {
    address payable seller;
    uint256 price;
    uint256 tokenId;
  }

  mapping(uint256 => Offer) tokenIdToOffer;
  mapping(uint256 => uint256) tokenIdToOfferId;

  event MarketTransaction(string TxType, address owner, uint256 tokenId);


  Offer[] offers;

  function setKittyContract(address _kittyContractAddress) external onlyOwner() {

  }

   function getOffer(uint256 _tokenId) external view returns (address seller, uint256 price, uint256 tokenId) {

     Offer storage returnOffers =  offers[_tokenId];
     return (returnOffers.seller, returnOffers.price, returnOffers.tokenId);




     
   }

   function getAllTokenOnSale() external view returns(uint256[] memory listOfOffers) {
     uint256 totalOffers = offers.length;



   }

   /*
    *   We give the contract the ability to transfer kitties
    *   As the kitties will be in the market place we need to be able to transfert them
    *   We are checking if the user is owning the kitty inside the approve function
    */

   function setOffer(uint256 _price, uint256 _tokenId) public {
     require(_price > 0.009 ether, "Cat price should be greater than 0.01" );
     require(tokenIdToOffer[_tokenId].price == 0, "You can't sell twice the same offers");

     approve(address(this), _tokenId);

     Offer memory _offer = Offer({
       seller: (payable(msg.sender)),
       price: _price,
       tokenId: _tokenId
     });

     tokenIdToOffer[_tokenId] = _offer;

     offers.push(_offer);

     uint256 index = offers.length -1;

     tokenIdToOfferId[_tokenId] = index;

     emit MarketTransaction("Create offer", msg.sender, _tokenId);


   }

}