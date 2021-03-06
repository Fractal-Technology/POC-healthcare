/**
 * This file is in charge of building a controller (or set of controllers made up)
 * of the baseline logic you designed on your chaincode project, but replacing the logic
 * with your own for NodeJS. We inject here the `convector-adapter-fabric` which calls
 * the blockchain based on your own configuration.
 */
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import { SelfGenContext } from './selfGenContext';
import {
  CHANNEL, CHAINCODE
} from '../utils';
import { PatientController, OrganizationController, ClaimController, ParticipantController, FeeExtensionsController } from 'financial-cc';
import { PaymentController } from 'financial-cc';
import { identity } from '../utils/identity';

async function InitFabricAdapter(user?: string) {
  await SelfGenContext.getClient();

  const adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user: identity(user).user,
    // set it later to enable Mutual TLS
    channel: CHANNEL,
    chaincode: CHAINCODE,
    keyStore: identity(user).keyStore,
    networkProfile: identity(user).networkProfile,
    userMspPath: identity(user).keyStore
  });

  await adapter.init();
  return adapter;
}
/**
 * Building this adapter allows you to communicate with the
 * test env created by `hurley`.
 */

export async function Init(user?: string) {
  const adapter = await InitFabricAdapter(user);
  return {
    adapter,
    patient: ClientFactory(PatientController, adapter),
    payment: ClientFactory(PaymentController, adapter),
    claim: ClientFactory(ClaimController, adapter),
    organization: ClientFactory(OrganizationController, adapter),
    participant: ClientFactory(ParticipantController, adapter),
    feeExtensions: ClientFactory(FeeExtensionsController, adapter)
  };
}

export async function InitServerIdentity() {
  // const users = await ModelHelpers.getAllParticipants();
  // if (!users.find(u => u.id === USER && u.msp === `${ORG}MSP`)) {
  console.log('Need to register server identity');
  // (await InitParticipantController()).register(USER);
  console.log('Server identity registered');
  // } else {
  console.log('Server identity found');
  // }
}
