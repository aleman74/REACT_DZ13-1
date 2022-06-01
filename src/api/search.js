export const searchSkills = async(search) => {

    const params = new URLSearchParams({q: search});

    const response = await fetch(`${process.env.REACT_APP_API_URL}?${params}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}