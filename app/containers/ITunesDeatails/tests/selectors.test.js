import { selectITunesDeatails, selectSomePayLoad } from '../selectors';

describe.skip('ITunesDeatails selector tests', () => {
  const mockedState = {
    iTunesDeatails: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the iTunesDeatails state', () => {
    const iTunesDeatailsSelector = selectITunesDeatails();
    expect(iTunesDeatailsSelector(mockedState)).toEqual(mockedState.iTunesDeatails);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.iTunesDeatails.somePayLoad);
  });
});
