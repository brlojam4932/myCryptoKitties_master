// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";


contract myKittiesContract is Ownable {

  // Mapping from token ID to owner address
  mapping(uint256 => address) public kittyIndexToOwner; //owners Of TokenId

  // Mapping owner address to token count
  mapping(address => uint256) ownershipTokenCount;

  // Mapping from token ID to approved address
  mapping(uint256 => address) public kittyIndexToApproved;

  // MYADDR => OPERATOR => TRUE/FALSE
  // _operatorApprovals[MYADDR][OPERATORADDR] = true or false;
  // _operatorApprovals[MYADDR][BOBS_ADDR] = true;
  // _operatorApprovals[MYADDR][ALICE_ADDR] = false;
  // _operatorApprovals[MYADDR][LISA_ADDR] = true;

  // Mapping from owner to operator approvals
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  //an address to a number of cats in an array
  mapping(address => uint256[]) ownerToCats;

  bytes4 private constant _INTERFACE_TO_ERC721 = 0x80ac58cd;
  bytes4 private constant _INTERFACE_TO_ERC165 = 0x01ffc9a7;

  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
  event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
  event Birth(address owner, uint256 newKittenId, uint256 mumId, uint256 dadId, uint256 genes);

  string constant _name = "My Crypto Cats";
  string constant _symbol = "MCRC";
  uint256 public constant CREATION_LIMIT_GEN0 = 10;
  uint256 public gen0Counter;
  uint256 newGene; // prev: newDna
  uint256 newRandGene;
  uint256 nextId = 0;

  // 11 22 33 44 | 44 33 22 1 1

  // this cat will just take up space, cannot be transacted in any way
  // prevents buyKitty function require statement resulting to an empty array; being true
  constructor() {
    // We are creating the first kitty at index 0
    _createKitty(0, 0, 0, uint256(0), address(0));
    // (mumId, dadId, gen, genes, owner)
  }

  function breed(uint256 _dadId, uint256 _mumId) public returns (uint256) {
    //Check ownership
    //Use new DNA
    //Figure out the Generation
    //Create new cat with new properties, give it to msg.sender
    require(_owns(msg.sender, _dadId) && _owns(msg.sender, _mumId), "You must be the owner of both of your cats");

    (uint256 dadDna,,,,uint256 DadGeneration) = myGetKitty(_dadId);
    (uint256 mumDna,,,,uint256 MumGeneration) = myGetKitty(_mumId);

    newGene = _mixDnaMoreRand(dadDna, mumDna);

    uint256 kittenGen = 0;
    if (DadGeneration < MumGeneration) {
      kittenGen = MumGeneration + 1;
      kittenGen /= 2;
    } else if (DadGeneration > MumGeneration) {
      kittenGen = DadGeneration + 1;
      kittenGen /= 2;
    } else {
      kittenGen = DadGeneration + 1;
    }

    _createKitty(_mumId, _dadId, kittenGen, newGene, msg.sender);

    return newGene;
   
  }


  function supportsInterface(bytes4 _interfaceId) external pure returns (bool) {
    return(_interfaceId == _INTERFACE_TO_ERC721 || _interfaceId == _INTERFACE_TO_ERC165);
  }


  bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

  struct Kitty{
    uint64 birthTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
    uint256 genes;
  }


  Kitty[] kitties;


  function createKittyGen0(uint256 _genes) public onlyOwner returns (uint256){
    require(gen0Counter <= CREATION_LIMIT_GEN0, "Gen 0 should be less than creation limit gen 0");
    
    gen0Counter ++;

    // mum, dad and generation is 0
    // Gen0 have no owners; they are owned by the contract
    
    return _createKitty(0,0,0, _genes, msg.sender); // msg.sender could also be -- address(this) - we are giving cats to owner
  }


  // create cats by generation and by breeding
  // returns cat id
  function _createKitty(
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation, //1,2,3..etc
    uint256 _genes, // recipient
    address owner
  ) public returns(uint256) {
    Kitty memory newKitties = Kitty ({
      genes: _genes,
      birthTime: uint64(block.timestamp),
      mumId: uint32(_mumId),
      dadId: uint32(_dadId),
      generation: uint16(_generation)
    });

    kitties.push(newKitties); // returns the size of array - 1 for the first cat

    uint256 newKittenId = kitties.length -1; // 0-1

    emit Birth(owner, newKittenId, _mumId, _dadId, _genes);

    _transfer(address(0), owner, newKittenId);

    return newKittenId; //returns 256 bit integer

  }


  function myGetKitty(uint256 tokenId) public view returns (
    uint256 birthTime,
    uint256 mumId,
    uint256 dadId,
    uint256 generation,
    uint256 genes
  ) {

    Kitty storage returnKitty = kitties[tokenId];
    return (uint256(returnKitty.birthTime), uint256(returnKitty.mumId), uint256(returnKitty.dadId), uint256(returnKitty.generation), uint256(returnKitty.genes));
  }


  function getKittyFilip(uint256 _id) public view returns (
    uint256 birthTime,
    uint256 mumId,
    uint256 dadId,
    uint256 generation,
    uint256 genes
  ) {

    Kitty storage kitty = kitties[_id];
    birthTime = uint256(kitty.birthTime);
    mumId = uint256(kitty.mumId);
    dadId = uint256(kitty.dadId);
    generation = uint256(kitty.generation);
    genes = uint256(kitty.genes);
  }

  //-------------------------------

  function getAllCatsFor(address owner) public view returns (uint[] memory) {
    return ownerToCats[owner];
  }
  

  function balanceOf(address owner) public view returns (uint256 balance) {
    return ownershipTokenCount[owner];
  }


  function totalSupply() public view returns (uint256 total) {
    return kitties.length;
  }


  function name() external pure returns (string memory tokenName) {
    return _name;
  }


  function symbol() external pure returns (string memory tokenSymbol) {
    return _symbol;
  }

  // private functions are cheaper but public allows to execute function from within this contract
  function ownerOf(uint256 tokenId) public view returns (address owner) {
    address _owner = kittyIndexToOwner[tokenId]; // local variable 
    require(_owner != address(0), "ERC721: owner query for nonexistent token");

    return _owner;
  }


  // this transfer function is not used -- the mint function might be better suited for minting NFTs
  function transfer(address to, uint256 tokenId) external {
    require(to != address(0), "ERC721: transfer to the zero address");
    require(to != address(this), "transfer to the zero address");
    // `tokenId` token must be owned by `msg.sender`.
    require(_owns(msg.sender, tokenId));

    _transfer(msg.sender, to, tokenId);

  }


  function approve(address _approved, uint256 _tokenId) public {
    ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    require(_owns(msg.sender, _tokenId));

    _approve(_tokenId, _approved);
    emit Approval(msg.sender, _approved, _tokenId);

  }


  function setApprovalForAll(address _operator, bool _approved) public {
    require(_operator != msg.sender, "ERC721: approve to caller, you are not the owner");

    _operatorApprovals[msg.sender][_operator] = _approved; 
    emit ApprovalForAll(msg.sender, _operator, _approved);

  }


  function getApproved(uint256 _tokenId) public view returns (address) {
    require(_tokenId < kitties.length, "Token must exist"); // getter function

    return kittyIndexToApproved[_tokenId];
  }


  function isApprovedForAll(address _owner, address _operator) public view returns (bool) {
    return _operatorApprovals[_owner][_operator];
  }


  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
    safeTransferFrom(_from, _to, _tokenId);
  }


  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external {
    require(_to != address(0), "Must transfer to zero address");
    require(_tokenId < kitties.length, "Token does not exist");
    require(_owns(_from, _tokenId), "Not a valid NFT, not the owner of NFT");

     //spender is _from (DEX) or spender is approved for tokenId or spender is operator for _from
    require(msg.sender == _from || isApprovedForAll(_from, _to) || _approvedFor(msg.sender, _tokenId));

    _safeTransfer(_from, _to, _tokenId, data);

  }


  function getAllTokensForUser(address user) public view returns(uint256[] memory) {
    uint256 tokenCount = balanceOf(user);
    if(tokenCount == 0) {
      return new uint256[](0);
    } else {
      //how many tokens in total?
      uint256[] memory result = new uint256[](tokenCount);
      uint256 totalCats = nextId;
      uint256 resultIndex;
      uint256 i;
      for(i = 0; i < totalCats; i++) {
        //check
        if(ownerOf(i) == user) {
          result[resultIndex] = i;
          resultIndex++;
        }
      }
      return result;
    }  
  }
  

  function tokensOfOwner(address _owner) public view returns(uint256[] memory ownerTokens) {
    uint256 tokenCount = balanceOf(_owner);

    if (tokenCount == 0) {
      return new uint256[](0);
    } else {
      uint256[] memory result = new uint256[](tokenCount);
      uint256 totalCats = totalSupply();
      uint256 resultIndex = 0;

      uint256 catId;

      for (catId = 1; catId <= totalCats; catId++) {
        if (kittyIndexToOwner[catId] == _owner) {
          result[resultIndex] = catId;
          resultIndex++;
        }
      }

      return result;
    }   
  }


  //Smart Contract Programmer(youTuber) ...
  //transferFrom - how it is used:
  //trader calls approve(dexAddress, amount)
  //dex calls transferFrom(traderAddress, dexAddress, amount)

  function transferFrom(address _from, address _to, uint256 _tokenId) public {
    /// Throws if `_to` is the zero address. 
    /// Throws if `_tokenId` is not a valid NFT.

    /// @dev Throws unless `msg.sender` is the current owner, an authorized
    ///  operator, or the approved address for this NFT.
     
    require(_to != address(0), "To address is not a zero address");
    require(_tokenId < kitties.length, "Token must exist");
    require(_owns(_from, _tokenId), "From owns the token");
    require(msg.sender == _from || isApprovedForAll(_from, msg.sender) || _approvedFor(msg.sender, _tokenId));

    _transfer(_from, _to, _tokenId);
  }


  // must transfer from address 0
  function _transfer(address from, address to, uint256 tokenId) internal {
    //_approve(address(0), tokenId);

    ownershipTokenCount[to] += 1; // increase count of recipient

    kittyIndexToOwner[tokenId] = to;

     // SEMD tokenId # => an address to a number of cats in an array
     ownerToCats[to].push(tokenId);

     // decrease token count from person A to person B
     if (from != address(0)) { // if from is not address(0), is okay to remove token
       ownershipTokenCount[from] -= 1;
       _removeTokenIdFromOwner(from, tokenId);
       delete kittyIndexToOwner[tokenId];
     }

     emit Transfer(msg.sender, to, tokenId);

  }


  function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) internal {
    _transfer(_from, _to, _tokenId);
    require(_checkERC721Support(_from, _to, _tokenId, _data));
  }


  function  _removeTokenIdFromOwner(address owner, uint256 tokenId) internal {
    uint256 lastId = ownerToCats[owner][ownerToCats[owner].length -1];
    for (uint256 i = 0; i < ownerToCats[owner].length -1; i++) {
      if (ownerToCats[owner][i] == tokenId) {
        ownerToCats[owner][i] = lastId;
        ownerToCats[owner].pop();
      }
    }
  }


  function _owns(address _claimant, uint256 tokenId ) internal view returns(bool) {
    return kittyIndexToOwner[tokenId] == _claimant;
  }


  function _deleteApproval(uint256 _tokenId) internal {
      require(_owns(msg.sender, _tokenId));
      delete kittyIndexToApproved[_tokenId];
  }


   function _approve(uint256 _tokenId, address _approved) internal {
    kittyIndexToApproved[_tokenId] = _approved;
  }


  function _approvedFor(address _claimant, uint256 tokenId) internal view returns(bool) {
    return kittyIndexToApproved[tokenId] == _claimant;
  }


  function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
    if(!isContract(_to)) { //checks if `_to` is a smart contract (code size > 0)
      return true;
    }
    //example: Contract(_to)....
    //If there is an operator, where _from is not equal to msg.sender, we use msg.sender.
    bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
    return returnData == MAGIC_ERC721_RECEIVED;
    //Call onERC721Received in the _to contract
    //Check return value
  } 


  function isContract(address _to) internal view returns(bool) {
    //It is a smart contract (code size > 0)
    //If it is a wallet, code size = 0
    uint32 size;
    assembly{
      size := extcodesize(_to)
    }
    return size > 0;
  }

/*
  function _mixDnaPrev(uint256 _dadDna, uint256 _mumDna) private returns (uint256) {
    //dadDna: 11 22 33 44 55 66 77 88 (in remix: remove spances => 1122334455667788)
    //mumDna: 88 77 66 55 44 33 22 11 (8877665544332211)
    uint256 firstHalf =  _dadDna / 100000000; // 11 22 33 44 (8 zeroes as there are 16 DNA intergers total)
    uint256 secondHalf =  _mumDna % 100000000; // 44 33 22 11 (the remaining 8 zeros')
    //uint256 newDna = firstHalf * 100000000;
    //newDna = newDna + secondHalf;
    // 10 and 20 concat
    // 10 x 100 = 1000
    // 1000 + 20 = 1020
    
    // my verion
    newDna = ((firstHalf * 100000000) + secondHalf);
  
    return newDna;
    // 11 22 33 44 | 44 33 22 1 1

  }
  */

/*
function before more randomness is added
  function _mixDna(uint256 _dadDna, uint256 _mumDna) private returns(uint256) {
    uint256[8] memory geneArray;
    uint8 random = uint8( block.timestamp % 255 ); // 0-255 max random numbers | binary between 00000000-11111111 (example rand num: 11001011)
    uint256 i = 1;
    uint256 index = 7;

    bitwise operator
      ==============================
      00000001 = 1     ==> 1 bit
      00000010 = 2     ==> 1 bit
      00000100 = 4     ==> 1 bit
      00001000 = 8     ==> 1 bit
      00010000 = 16    ==> 1 bit
      00100000 = 32    ==> 1 bit
      01000000 = 64    ==> 1 bit
      10000000 = 128   ==> 1 bit
      -----------------------------
      8 bits
      -----------------------------
      =============================

      We use the && and || or operators to compare the 8 bit random number we got from the timestamp % 255, to the 8 bits of integers which range from 1-128

      if (true && false) = false (1, 0) = 0
      if we compare something to both true and false, is false because it cannot be both true and false
      if (true || false) = true -- we compare something to true or false, is true; it could be either true or false (1, 0) = 1
      if ( true && true) = true (1, 1) = 1
      if ( false || false) = false (0, 0) = 0 .... one needs to be true
      if ( false && false) = false (0, 0) = 0 .... one needs to be true
      if ( true XOR true) = false) exactly only one can be true "Exlusive OR"


      BIT WISE AND OPERATOR & AND COMPARE
      11001011 (random number from block.timestamp is compared to the loop of integers 1 < 128 => [1,2,4,8,16,32,64,128])     
      &&&&&&&&        | resulted number | assignment - after comparison, number sequnce is assigned either mumId or dadId
      00000001        1 true              = mum
      00000010        1 true              = mum
      00000100        0 false             = dad
      00001000        1 true              = mum
      00010010        0 false             = dad
      00100010        0 false             = dad
      01000010        1 true              = mum
      10000010        1 true              = mum  reminder compare 1 && 0 is false: a true and a false cannot be both true, thus is false

      integers < 128 is the 8 bit operator
      if(1) use mum gene
      if(0) use dad gene

      from the resulted sequnce 11010010; 1's were assigned to mumId and 0's to dadId
      mumDNA
      11 22 33 44 55 66 77 88
      dadDNA
      10 20 30 40 50 60 70 80 
      result DNA
      mum mum dad mum dad dad mum dad
      
      DNA from both parents: geneArray [11, 22, 30, 44, 50 60 77 (80)] //we remove the last pair by deviding by 100; the function below will perform this operation
  
    

    for ( i = 1; i <= 128; i=i*2) { 
      if(random & i !=0) {
        geneArray[index] =  uint8( _mumDna % 100); // we set the index pos in array at #7; then / by 100 and move the index back by 1 to get rid of the last two digits
      }
      else {
        geneArray[index] =  uint8( _dadDna % 100);
      }

      // divide by 100 to loop backwards in the array and choose mum or dad gene
      //11 22 33 44 55 66 77
      //11 22 33 44 55 66
      //11 22 33 44 55
      //11 22 33 44
      //11 22 33
      //11 22
      //11 

      _mumDna = _mumDna / 100;
      _mumDna = _mumDna / 100;

      //index = index - 1; // from the 7th pos, we move back in pos of the array[,,,,<==] 
      if (i != 128) {index = index -1;}  

    }

      
    // Combined DNA from both parents as one string of numbers
    // uint256 newGene variable; (already declared at start of contract)

    // imaginary string from both parents geneArray - just an example => will be merged into one string of numbers

    //[12, 23, 34, 45, 56, 67, 78, 98]

    // we take our first pos and add (+) our new gene
    // [12]
    // we then take our new gene and mult by (100)
    // [1200]
    // we then add from our geneArray[i] then next index num
    // [1223]
    // we then mult by 100 again since it is not index 7 yet
    // [122300]
    // add again from our geneArray[i] the next index
    // [122324]
    // mult again
    // [12233400]... and so on unit it reaches index 7
    
    for(i = 0; i < 8; i++) {
      newGene = newGene + geneArray[i]; // we need to stop before the last index [1,2,3,4,5,6,7, stop]
      if(i != 7) { // if i is not index 7, mult; otherwise stop and return new gene
         newGene = newGene * 100;
      } 
  
    }
    return newGene; // 1223344556677898
  }
  */

  function _mixDnaMoreRand(uint256 _dadDna, uint256 _mumDna) private returns(uint256) {
    uint256[8] memory moreRandGeneArray;
    uint8 rand = uint8(block.timestamp % 255);
    uint256 i = 1;
    uint256 index = 7;

    /*
    8 bit wise AND operator (&) and XOR
      00000001 = 1     ==> 1 bit
      00000010 = 2     ==> 1 bit
      00000100 = 4     ==> 1 bit
      00001000 = 8     ==> 1 bit
      00010000 = 16    ==> 1 bit
      00100000 = 32    ==> 1 bit
      01000000 = 64    ==> 1 bit
      10000000 = 128   ==> 1 bit
      &
      11001011 8 bit fictional random number from timestamp modulo 255
      ================================================================
      11001011 result from AND & operator

      if random & != 0: pick mumId = > do more random here - how about compare with XOR operator
      else
      pick dadId

      00110100 result from XOR ^

      Take the random number we calculated in the previous video, and use it to select one of the pairs that will get an extra randomness treatment. Then generate a new, 2 digit, random number and set it as that pair. That DNA pair will now be completely random, independent from any parent.
    */


    for (i = 1; i <= 128; i=i*2) { // remix error fix #1 -- 64 instead of 128

      if (rand & i != 0) {
        moreRandGeneArray[index] = uint8(_mumDna % 100);
      }
      else {
         moreRandGeneArray[index] = uint8(_dadDna % 100);
      }

      _mumDna = _mumDna / 100;
      _dadDna = _dadDna / 100;

      //index = index -1;
      if(i != 128){index = index-1;} // remix fix #2

    }

      //select one of the pairs
      uint8 newPairIndex = rand % 7; // index
      //extra random treatment
      moreRandGeneArray[newPairIndex] = rand % 99;


    // convert dna pairs into one string of numbers
    for (i = 0; i < 8; i++) {
      newRandGene = newRandGene + moreRandGeneArray[i];

      if (i != 7 ) {
        newRandGene = newRandGene * 100;
      }

    }
    return newRandGene;
  }


}