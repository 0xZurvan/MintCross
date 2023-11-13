// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;
import "../solidity-examples/contracts/token/oft/v1/OFT.sol";

contract MintCross is OFT {
    uint256 public s_maxSupply = 1000000000000 * (10 ** decimals());
    uint16 s_dstChainId;

    constructor(
        address _lzEndpoint,
        uint16 _dstChainId
    ) OFT("MintCross", "MCs", _lzEndpoint) {
        s_dstChainId = _dstChainId;
    }

    function setMaxSupply(uint256 _newMaxSupply) external onlyOwner {
        s_maxSupply = _newMaxSupply;
    }

    function buy(uint256 _amount) external {
        require(totalSupply() <= s_maxSupply, "Not enough supply");
        _mint(msg.sender, _amount);
    }
    

    function bridge(
        bytes calldata _toAddress,
        uint _amount,
        bytes calldata _adapterParams
    ) public payable {
        require(balanceOf(msg.sender) > 0, "Not enough balance");
        sendFrom(
            msg.sender,
            s_dstChainId,
            _toAddress,
            _amount,
            payable(msg.sender), // Refund address
            address(0x0),
            _adapterParams
        );
    }

    function estimateFee(
        bytes calldata _toAddress,
        uint _amount,
        bytes calldata _adapterParams
    ) public view returns (uint nativeFee, uint zroFee) {
        return
            estimateSendFee(
                s_dstChainId,
                _toAddress,
                _amount,
                false,
                _adapterParams
            );
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
