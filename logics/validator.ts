export function ValidateFormData(
	formData: FormData,
	invalid: (message: string) => void,
	ExcludeName?: boolean,
) {
	const email = (formData.get("email") as string)?.trim();
	const name = (formData.get("name") as string)?.trim();
	const password = (formData.get("password") as string)?.trim();

	const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const NameRegex = /^[a-zA-Z\s'-]{2,50}$/;

	if (!ExcludeName) {
		if (!name) return invalid("Name is required");
		if (!NameRegex.test(name)) return invalid("Invalid name");
	}

	if (!email) return invalid("Email is required");
	if (!EmailRegex.test(email)) return invalid("Invalid email");

	if (!password) return invalid("Password is required");
	if (password.length < 6)
		return invalid("Password must be at least 6 characters");
	if (!/[A-Z]/.test(password))
		return invalid("Password must include an uppercase letter");
	if (!/[0-9]/.test(password)) return invalid("Password must include a number");

	return formData;
}
