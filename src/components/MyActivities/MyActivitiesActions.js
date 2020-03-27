export function showSignUpPage() {
    return {
        type: 'SHOW_SIGN_UP_PAGE',
    };
}

export function showNotSignedUpPage() {
    return {
        type: 'SHOW_NOT_SIGNED_UP_PAGE',
    };
}

export function showActivationPage({ phone, condition, ttl }) {
    return {
        type: 'SHOW_ACTIVATION_PAGE',
        phone,
        condition,
        ttl,
    };
}

export function activateUser({ token, user }) {
    return {
        type: 'ACTIVATE_USER',
        token,
        user,
    };
}
