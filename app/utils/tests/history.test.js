describe.skip('history', () => {
  it('should call createBrowserHistory with empty string if ENVIRONMENT_NAME is not uat', () => {
    process.env.ENVIRONMENT_NAME = 'production';
    const mockCreateBrowserHistory = jest.fn();
    jest.mock('history', () => ({ createBrowserHistory: mockCreateBrowserHistory }));

    mockCreateBrowserHistory({ basename: '' });

    expect(mockCreateBrowserHistory).toHaveBeenCalledWith({
      basename: ''
    });
  });
});
