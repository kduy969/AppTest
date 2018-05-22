const DetoxConstants = require('detox').DetoxConstants;

describe('Example', () => {
    beforeEach(async () => {
        //await device.reloadReactNative();
    });

    it('should click on upload button', async () => {
        //await element(by.type('UIView')).tap();

        //await expect(element(by.id('MyContainer'))).toBeVisible();
        await expect(element(by.type('UIWebBrowserView'))).toBeVisible();
        //await expect(element(by.type('UIWebBrowserView'))).toHaveText('Upload');
        //await expect(element(by.label("Upload \\n"))).toBeVisible();
        await element(by.type('UIWebBrowserView')).tapAtPoint({x:15,y:15});
        //await element(by.type('UIWebBrowserView')).tapAtPoint({x:15,y:28});
        //await element(by.type('UIWebBrowserView')).tap();
        /*await expect(element(by.type('UIView')).atIndex(0)).toBeVisible();
        await expect(element(by.type('UIView')).atIndex(0)).toBeVisible();
        await expect(element(by.type('UIView')).atIndex(0)).toBeVisible();
        await expect(element(by.type('UIView')).atIndex(0)).toBeVisible();
        await expect(element(by.type('UIView')).atIndex(0)).toBeVisible();*/

        await timeout(2000);
        //await element(by.id('MyContainer')).tapAtPoint({x:70,y:530});

    });


    it('should click on picker', async () => {
        //because I can't procedure click on picker event, let wait for 5sec,
        // in that time we need to manually click on Photo Library option form picker
        await timeout(5000);

        //await expect(element(by.text('Browse'))).toBeVisible();
        //await element(by.traits(['button']).and(by.label('Cancel'))).tap();
        //await element(by.type('_UIDocumentPickerRemoteViewControllerTintColorView')).atIndex(1).tapAtPoint({x:15,y:35});
        /*await element(by.type('_UIAlertControllerShadowedScrollView')).tapAtPoint({x:150,y:20});
        await element(by.type('_UIAlertControllerShadowedScrollView')).tapAtPoint({x:150,y:20});
        await element(by.type('_UIAlertControllerShadowedScrollView')).tapAtPoint({x:150,y:20});
        await element(by.type('_UIAlertControllerShadowedScrollView')).tapAtPoint({x:150,y:20});
        await element(by.type('_UIAlertControllerShadowedScrollView')).tapAtPoint({x:150,y:20});*/
        //await element(by.type('_UIAlertControllerShadowedScrollView')).longPress(5000);
        //await element(by.type('UITransitionView')).tapAtPoint({x:150,y:520});
        //await element(by.type('_UITextEffectsRemoteView')).atIndex(1).tap();
        //await expect(element(by.type('_UIRemoteView')).atIndex(3)).toBeVisible();

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

