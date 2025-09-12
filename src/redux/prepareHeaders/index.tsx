export const prepareHeaders = (headers: any, { getState }: any) => {
    try {
        // Get token from Redux state
        const state = getState() as any;
        const accessToken = state.auth?.accessToken;

        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return headers;
    } catch (error) {
        console.log('Error preparing headers:', error);
        return headers;
    }
};