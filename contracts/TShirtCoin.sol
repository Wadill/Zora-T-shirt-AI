import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zoralabs/protocol/contracts/interfaces/ICoin.sol";

contract TShirtCoin is ERC20, Ownable, ICoin {
    // Physical redemption tracking
    struct TShirtDetails {
        string designIPFSHash;
        string size;
        bool isRedeemed;
        uint256 redeemDeadline;
    }

    // Zora Protocol Parameters
    address public immutable zoraCoinFactory;
    address public uniswapPool;
    string public contractURI;
    
    // T-Shirt Properties
    uint256 public constant MAX_SUPPLY = 1000; // Limited edition
    uint256 public mintPrice = 0.01 ether;
    mapping(address => TShirtDetails) public tshirtHolders;

    event PhysicalRedeemed(address indexed holder, string size);
    event DesignUpdated(string newIPFSHash);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _designIPFS,
        address _zoraFactory
    ) ERC20(_name, _symbol) {
        zoraCoinFactory = _zoraFactory;
        contractURI = string(abi.encodePacked("ipfs://", _designIPFS));
    }

    /// @notice Mints both digital coin and queues physical T-shirt
    function mintTShirt(
        string memory _size, 
        string memory _designIPFS
    ) external payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");
        
        _mint(msg.sender, 1 ether); // 1 token = 1 T-shirt
        tshirtHolders[msg.sender] = TShirtDetails({
            designIPFSHash: _designIPFS,
            size: _size,
            isRedeemed: false,
            redeemDeadline: block.timestamp + 365 days
        });
    }

    /// @notice Redeem physical T-shirt (callable by approved manufacturers)
    function redeemPhysical(address _holder) external onlyOwner {
        require(!tshirtHolders[_holder].isRedeemed, "Already redeemed");
        require(balanceOf(_holder) > 0, "No tokens held");
        
        tshirtHolders[_holder].isRedeemed = true;
        emit PhysicalRedeemed(_holder, tshirtHolders[_holder].size);
        
        // Optional: Burn token after redemption
        // _burn(_holder, 1 ether);
    }

    /// @notice Update T-shirt design metadata
    function updateDesign(string memory _newIPFSHash) external onlyOwner {
        contractURI = string(abi.encodePacked("ipfs://", _newIPFSHash));
        emit DesignUpdated(_newIPFSHash);
    }

    // Zora Protocol Compliance Functions
    function buy(
        address recipient,
        uint256 orderSize,
        uint256 minAmountOut,
        uint160 sqrtPriceLimitX96,
        address tradeReferrer
    ) external payable returns (uint256, uint256) {
        // Implement Zora's buy logic with physical item check
        require(!tshirtHolders[recipient].isRedeemed, "Physical already claimed");
        return ICoin(zoraCoinFactory).buy{value: msg.value}(
            recipient,
            orderSize,
            minAmountOut,
            sqrtPriceLimitX96,
            tradeReferrer
        );
    }

    function sell(
        address recipient,
        uint256 orderSize,
        uint256 minAmountOut,
        uint160 sqrtPriceLimitX96,
        address tradeReferrer
    ) external returns (uint256, uint256) {
        // Prevent selling if physical was redeemed
        require(!tshirtHolders[msg.sender].isRedeemed, "Burn token after redemption");
        return ICoin(zoraCoinFactory).sell(
            recipient,
            orderSize,
            minAmountOut,
            sqrtPriceLimitX96,
            tradeReferrer
        );
    }

    // Required by ICoin
    function tokenURI() external view returns (string memory) {
        return contractURI;
    }
}