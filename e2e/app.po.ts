import { browser, element, by } from 'protractor';

export class NPuzzleGamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pz-root h1')).getText();
  }
}
