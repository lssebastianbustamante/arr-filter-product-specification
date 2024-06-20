import { IOClients } from '@vtex/api'

import Status from './status'
import CollectionClient from './collectionClient'
import ProductClient from './productClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get collectionClient() {
    return this.getOrSet('collectionClient', CollectionClient)
  }

  public get productClient() {
    return this.getOrSet('productClient', ProductClient)
  }
}
