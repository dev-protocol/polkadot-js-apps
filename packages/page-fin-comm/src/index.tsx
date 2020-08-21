// Copyright 2017-2020 @polkadot/app-tech-comm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Option } from '@polkadot/types';
import { AccountId, Hash } from '@polkadot/types/interfaces';

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useApi, useCall, useMembers } from '@polkadot/react-hooks';
import { Tabs } from '@polkadot/react-components';

import Overview from './Overview';
import Proposals from './Proposals';
import { useTranslation } from './translate';

export { default as useCounter } from './useCounter';

interface Props {
  basePath: string;
  className?: string;
}

const transformPrime = {
  transform: (result: Option<AccountId>): AccountId | null => result.unwrapOr(null)
};

function TechCommApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { isMember, members } = useMembers('financialCommittee');
  const prime = useCall<AccountId | null>(api.query.financialCommittee.prime, undefined, transformPrime) || null;
  const proposals = useCall<Hash[]>(api.query.financialCommittee.proposals);

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Fin. committee')
    },
    {
      name: 'proposals',
      text: t<string>('Proposals ({{count}})', { replace: { count: (proposals && proposals.length) || 0 } })
    }
  ], [proposals, t]);

  return (
    <main className={className}>
      <header>
        <Tabs
          basePath={basePath}
          items={items}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/proposals`}>
          <Proposals
            isMember={isMember}
            members={members}
            prime={prime}
            proposals={proposals}
          />
        </Route>
        <Route path={basePath}>
          <Overview
            isMember={isMember}
            members={members}
            prime={prime}
            proposals={proposals}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(TechCommApp);
