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

    it('should open file picker', async () => {
        await waitFor(element(by.text('Cancel'))).toBeVisible().withTimeout(4000);
        await expect(element(by.text('Cancel'))).toBeVisible();
    });

    it('should pick and upload file', async () => {
        //because we can't pick file , just cancel the dialog
        await element(by.text('Cancel')).tap();
        await timeout(2000);

        //click upload button to send file to server, by pass pick file step
        await element(by.id('buttonPostUpload')).tap();
        await waitFor(element(by.id('MyStateText'))).toHaveText('uploadDone').withTimeout(20000);

    });


    /*it('should click on picker', async () => {
        //because I can't procedure click on picker event, let wait for 5sec,
        // in that time we need to manually click on Photo Library option form picker
        await timeout(5000);

    });

    it('should click on album', async () => {
        await expect(element(by.type('UITableViewCellContentView')).atIndex(1)).toBeVisible();
        await element(by.type('UITableViewCellContentView')).atIndex(1).tap();
        await timeout(2000);
    });

    it('should click on photo', async () => {
         // select first image
        await element(by.type('PUPhotoView')).atIndex(0).tap();
        await timeout(2000);
    });

    it('should click submit', async () => {
        //click submit
        await element(by.type('UIWebBrowserView')).tapAtPoint({x:15,y:28});
        //wait for upload done
        await waitFor(element(by.id('MyStateText'))).toHaveText('uploadDone').withTimeout(20000);
    });*/

    it('should render link', async () => {
        //recheck upload and result
        await expect(element(by.id('MyStateText'))).toHaveText('uploadDone');
        await expect(element(by.id('MyResultText'))).toHaveText('success');
    });




})

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

