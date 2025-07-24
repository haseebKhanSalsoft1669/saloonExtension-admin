export const prepareHeaders = (headers: any) => {
    try {
        // const token = getState()?.user?.userToken;
        const { token } = JSON.parse(localStorage.getItem("userDetails") || "{}");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    } catch (error) {
        console.log(error)
    }
};