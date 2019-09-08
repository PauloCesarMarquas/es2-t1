export const getFormData = root => {
	const data = {};
	root.find("[name]").each((i, e) => {
		const obj = $(e);
		const name = obj.attr('name');
		const value = obj.val();
		data[name] = value;
	});
	return data;
};