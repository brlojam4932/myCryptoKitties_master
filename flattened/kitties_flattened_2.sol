// File: node_modules\@openzeppelin\contracts\utils\Context.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin\contracts\access\Ownable.sol

pragma solidity ^0.8.0;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _setOwner(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _setOwner(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: @openzeppelin\contracts\token\ERC721\IERC721Receiver.sol

pragma solidity ^0.8.0;

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

// File: contracts\kittiesContract.sol

pragma solidity ^0.8.0;

//import "./IERC721.sol";




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


  function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) internal {
    _transfer(_from, _to, _tokenId);
    require(_checkERC721Support(_from, _to, _tokenId, _data));
  }


  function transferFrom(address _from, address _to, uint256 _tokenId) external {
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

  //Smart Contract Programmer(youTuber) ...
  //transferFrom - how it is used:
  //trader calls approve(dexAddress, amount)
  //dex calls transferFrom(traderAddress, dexAddress, amount)

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


}
