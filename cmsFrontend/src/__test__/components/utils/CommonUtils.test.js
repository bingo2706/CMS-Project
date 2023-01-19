import React from 'react';
import CommonUtils from '../../../utils/CommonUtils';

describe('CommonUtils', () => {
    var file = new File([new Blob()], 'image.png', { type: 'image/png' });
    it('should be fine', async () => {
        await CommonUtils.getBase64(file);
    });
});
