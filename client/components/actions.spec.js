import {expect} from 'chai';

import { getProducts } from '../store';


describe ('Get Product Actions', () => {
  it('returns properly formatted action', () => {

    const items = [{name: 'apple', price: '2'}];

    expect(getProducts(items)).to.be.deep.equal({
        type: 'GET_PRODUCTS',
        products: items
    });
  });
});

