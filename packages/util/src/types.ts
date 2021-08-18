import { useConnector } from './hooks'

export type SharedConnectorOptions = Partial<{
  connectOnMount: boolean
  storageProvider: Storage
}>

export type ConnectorContext = ReturnType<typeof useConnector>
