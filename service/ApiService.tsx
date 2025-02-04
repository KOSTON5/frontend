import axios from "axios";

const getApiUrl = ({path}: {path: string}) => {
    const url = 'http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com';
    return url + path;
};

export const getApi = async ({path}: {path: string}) => {
    try {
        const url = getApiUrl({path});
        const response = await axios.get(getApiUrl({path}), {
            headers: {
                "X-USER-ID" : 1,
            }
        });

        return response.data;  // Return the response for further use
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;  // Re-throw error to handle it outside
    }
}

export const postApi = async ({ path, body }: { path: string; body: any }) => {
    try {
        const response = await axios.post(getApiUrl({path}), body, {
            headers: {
                "X-USER-ID" : 1,
            }
        });
        return response.data;  // Return the response for further use
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;  // Re-throw error to handle it outside
    }
};

/*export const postApiHeader = async (path: string, formData: any, header: string) => {
    try {
        const response = await axios.post(path, formData, {
            headers: {
                'Content-Type': header,
            },
        });

        const data = await response.data;

        console.log('Response:', data);
        return data;  // Return the response for further use
    } catch (error) {
        console.error('Error posting data postApiHeader:', error);
        throw error;  // Re-throw error to handle it outside
    }
};*/