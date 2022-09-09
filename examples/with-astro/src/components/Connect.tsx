import { Web3Wrapper } from "./Web3Wrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Connect = () => <Web3Wrapper children={<ConnectButton />} />;
