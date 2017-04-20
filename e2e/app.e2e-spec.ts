import { NPuzzleGamePage } from './app.po';

describe('npuzzle-game App', () => {
  let page: NPuzzleGamePage;

  beforeEach(() => {
    page = new NPuzzleGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pz works!');
  });
});
