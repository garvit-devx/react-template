import { selectITunesProvider, selectSomePayLoad } from '../selectors';

describe.skip('ITunesProvider selector tests', () => {
  const mockedState = {
    iTunesProvider: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the iTunesProvider state', () => {
    const iTunesProviderSelector = selectITunesProvider();
    expect(iTunesProviderSelector(mockedState)).toEqual(mockedState.iTunesProvider);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.iTunesProvider.somePayLoad);
  });
});
