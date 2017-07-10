import { HttpSampleAppPage } from './app.po';

describe('http-sample-app App', () => {
  let page: HttpSampleAppPage;

  beforeEach(() => {
    page = new HttpSampleAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
