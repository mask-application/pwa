import {flatten} from 'flat';
import {createIntl as createReactIntl, useIntl as useReactIntl} from 'react-intl';
import faTransitions from './assets/fa.json';

export const intl = createIntl(
    createReactIntl({
        locale: 'fa',
        messages: flatten(faTransitions),
    }),
);

function createIntl(reactIntl) {
    return Object.freeze({
        formatMessage(id, args) {
            return reactIntl.formatMessage({ id }, args);
        },
        formatMessageElement(id, args) {
            return reactIntl.formatMessage({ id }, args);
        },
        formatDateTime(timeStamp) {
            return reactIntl.formatDate(timeStamp) + ' - ' + reactIntl.formatTime(timeStamp);
        },
        reactIntl,
    });
}

export function useIntl() {
    useReactIntl();
    return intl;
}

Object.assign(window, {intl});
