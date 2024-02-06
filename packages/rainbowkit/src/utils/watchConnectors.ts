import { Config, Connector } from "wagmi";

type GetConnectorsReturnType = readonly Connector[];

export type WatchConnectorsParameters = {
  onChange(
    connections: GetConnectorsReturnType,
    prevConnectors: GetConnectorsReturnType
  ): void;
};

type WatchConnectorsReturnType = () => void;

export function watchConnectors(
  config: Config,
  parameters: WatchConnectorsParameters
): WatchConnectorsReturnType {
  const { onChange } = parameters;
  return config._internal.connectors.subscribe((connectors, prevConnectors) => {
    onChange(Object.values(connectors), prevConnectors);
  });
}
