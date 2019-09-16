export const parse = str => {
	str = str.split('/');
	if (str.length !== 3) return false;
	str.forEach((s, i) => str[i] = parseInt(s));
	const [a, b, c] = str;
	const date = new Date();
	date.setFullYear(c);
	date.setMonth(b - 1);
	date.setDate(a);
	if (date.getFullYear() != c
			|| date.getMonth() != b - 1
			|| date.getDate() != a) {
		return false;
	}
	return `${c}-${b}-${a}`;
};