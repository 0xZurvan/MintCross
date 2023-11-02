// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import "../solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintCross is NonblockingLzApp, ERC20 {
    uint256 public s_maxSupply;
    uint16 s_destChainId;
    // packet type
    uint16 public constant PT_SEND = 0;

    constructor(
        address _lzEndpoint,
        uint16 _destChainId,
        uint256 _maxSupply
    ) NonblockingLzApp(_lzEndpoint) ERC20("MintCross", "MCs") {
        s_destChainId = _destChainId;
        s_maxSupply = _maxSupply;
    }

    function buy(uint256 _amount) external {
        require(totalSupply() <= s_maxSupply, "Not enough supply");
        _mint(msg.sender, _amount);
    }

    function bridge(uint _amount, bytes calldata _adapterParams) public payable {
        require(balanceOf(msg.sender) > 0, "Not enough balance");
        _burn(msg.sender, _amount);
        bytes memory payload = abi.encode(msg.sender, _amount);
        _lzSend(
            s_destChainId,
            payload,
            payable(msg.sender), // Refund address
            address(0x0), // zroAddres
            _adapterParams,
            msg.value // native fee
        );
    }

    function estimateSendFee(
        uint16 _dstChainId,
        bytes calldata _toAddress,
        uint _amount,
        bool _useZro,
        bytes calldata _adapterParams
    ) public view returns (uint nativeFee, uint zroFee) {
        bytes memory payload = abi.encode(PT_SEND, _toAddress, _amount);
        return
            lzEndpoint.estimateFees(
                _dstChainId,
                address(this),
                payload,
                _useZro,
                _adapterParams
            );
    }

    function setMaxSupply(uint256 _newMaxSupply) external onlyOwner {
        s_maxSupply = _newMaxSupply;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function _nonblockingLzReceive(
        uint16, // srcChainId
        bytes memory, // srcAddress
        uint64, // nonce
        bytes memory _payload
    ) internal override {
        (address toAddress, uint amount) = abi.decode(
            _payload,
            (address, uint)
        );
        _mint(toAddress, amount);
    }

}
