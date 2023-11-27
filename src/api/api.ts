
export interface ApiResponse {
    // Define your API response structure here
}

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${url}`, options);

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
};
