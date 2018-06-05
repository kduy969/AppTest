const DetoxConstants = require('detox').DetoxConstants;

describe('Example', () => {
    beforeEach(async () => {
        //await device.reloadReactNative();
    });

    it('should click on upload button', async () => {
        //await element(by.type('UIView')).tap();
        await timeout(3000);
        await expect(element(by.type('UIWebBrowserView'))).toBeVisible();

        //click upload button
        await element(by.type('UIWebBrowserView')).tapAtPoint({x:15,y:15});

        await timeout(2000);

    });

    it('should wait for auto pick file', async () => {
        await timeout(4000);
    });


    it('should click submit', async () => {
        //click submit
        await element(by.type('UIWebBrowserView')).tapAtPoint({x:15,y:28});
        //wait for upload done
        await waitFor(element(by.id('MyStateText'))).toHaveText('uploadDone').withTimeout(20000);
    });

    it('should render link', async () => {
        //recheck upload and result
        await expect(element(by.id('MyStateText'))).toHaveText('uploadDone');
        await expect(element(by.id('MyResultText'))).toHaveText('success');
    });




})

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

