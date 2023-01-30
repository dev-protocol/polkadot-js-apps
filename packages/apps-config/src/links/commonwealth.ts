// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { ExternalDef } from './types';

import { externalLogos } from '../ui/logos';

const HASH_PATHS = ['proposal/councilmotion'];

export const Commonwealth: ExternalDef = {
  chains: {
    Edgeware: 'edgeware',
    Kulupu: 'kulupu',
    Kusama: 'kusama',
    'Kusama CC3': 'kusama'
  },
  create: (chain: string, path: string, data: BN | number | string, hash?: string): string =>
    `https://commonwealth.im/${chain}/${path}/${HASH_PATHS.includes(path) ? (hash || '') : data.toString()}`,
  isActive: true,
  logo: externalLogos.commonwealth as string,
  paths: {
    council: 'proposal/councilmotion',
    democracyProposal: 'proposal/democracyproposal',
    democracyReferendum: 'proposal/referendum',
    treasury: 'proposal/treasuryproposal'
  },
  url: 'https://commonwealth.im/'
};
