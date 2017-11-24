import { ShopeChalangePage } from './app.po';

describe('shope-chalange App', () => {
  let page: ShopeChalangePage;

  beforeEach(() => {
    page = new ShopeChalangePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
