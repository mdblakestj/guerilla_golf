import React from 'react'
import { shallow } from 'enzyme';
import {CampaignList} from '../../components/campaignList'
import campaigns from '../fixtures/campaigns'

test('should render CampaignList with campaigns', () => {
  const wrapper = shallow(<CampaignList campaigns={campaigns}/>)
  expect(wrapper).toMatchSnapshot();
})
