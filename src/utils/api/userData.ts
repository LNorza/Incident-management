import API_BASE_URL from "./apiConfig";

export const getUserDepartment = async (): Promise<string | null> => {
	try {
		const response = await fetch(`${API_BASE_URL}/info`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Error fetching user data");
		}
		const user = await response.json();

		if (user && user.department_id) {
			return user.department_id.toString();
		}

		return null;
	} catch (error) {
		console.error("Error fetching department ID:", error);
		return null;
	}
};
