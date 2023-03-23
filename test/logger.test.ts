import { Logger } from '../src/lib/logger';

describe('Logger', () => {
    describe('createInstance', () => {
        test('should create a logger that could be used to write to the console', () => {
            Logger.createInstance('debug');
            Logger.getLogger('LoggerTest1').debug('test');
            Logger.getLogger('LoggerTest2').info('test');
            Logger.getLogger('LoggerTest3').warn('test');
            Logger.getLogger('LoggerTest4').error('test');
        });
        test('check format printer', () => {
            Logger.createInstance('debug');
            Logger.getLogger('LoggerTest').debug('Test Message - no meta');
            Logger.getLogger('LoggerTest').debug('Test Message with object metadata', {
                testMetaObject: 'TestMetadata',
            });
            Logger.getLogger('LoggerTest').debug('Test Message with additional string', 'additional String');
            Logger.getLogger('LoggerTest').debug('Test Message with additional number', 123);
            Logger.getLogger('LoggerTest').debug('Test Message with additional array', [123, '23']);
            Logger.getLogger('LoggerTest').debug(JSON.stringify({ test: 'Test Message should be allways a string' }));
        });
    });
});
