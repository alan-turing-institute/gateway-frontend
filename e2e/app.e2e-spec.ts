import { ScienceGatewayInputsPage } from './app.po';

describe('science-gateway-inputs App', () => {
  let page: ScienceGatewayInputsPage;

  beforeEach(() => {
    page = new ScienceGatewayInputsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
