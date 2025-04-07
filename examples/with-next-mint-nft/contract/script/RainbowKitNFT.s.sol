// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {RainbowKitNFT} from "../src/RainbowKitNFT.sol";

contract RainbowKitNFTScript is Script {
    RainbowKitNFT public nft;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        nft = new RainbowKitNFT();

        vm.stopBroadcast();
    }
}
