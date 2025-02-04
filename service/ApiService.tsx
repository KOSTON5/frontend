import axios from "axios";
import { useState, useEffect } from "react";

const getApiUrl = ({path}: {path: string}) => {
    const url = new URL('http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/');
    url.pathname = path;
    return url.toString();
};

export const getApi = async ({path}: {path: string}) => {
    const [data, setData] = useState<any>(null);  // Adjust type if needed
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  // Accepts error messages

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(getApiUrl({ path }));
                console.log("data : ", response.data);
                setData(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);  // Extracts error message
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path]);

    return { data, loading, error };
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