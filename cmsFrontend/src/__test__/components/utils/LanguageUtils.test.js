import React from 'react';
import LanguageUtils from '../../../utils/LanguageUtils';

describe('LanguageUtils', () => {
    it('should be fine', async () => {
        LanguageUtils.getMessageByKey('sidebar', 'vi');
        LanguageUtils.getFlattenedMessages();
    });
});
