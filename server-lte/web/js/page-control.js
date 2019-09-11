const formInitMap = {};
const menuStruct = {
	idMap: {},
	root: { parent: null, children: [] },
	current: null
};

export const addFormInit = (path, init) => {
	formInitMap[path] = init;
};

export const openForm = (path, data) => new Promise((done, fail) => $.ajax({
	type: 'GET',
	url: '/forms/' + path + '.html',
	success: html => {
		const init = formInitMap[path];
		const page = $.new('div.form-page').html(html);
		$('#workspace').html('').append(page);
		if (init) {
			ocupy();
			init(page, data, free);
		}
		done();
	},
	error: err => {
		fail(err);
	}
}));

export const closeForm = page => new Promise(done => {
	if (!page.is('.form-page')) {
		page = page.closest('.form-page');
	}
	page.remove();
	done();
});

window.menuStruct = menuStruct;

export const addMenuOption = option => {
	const { root, idMap } = menuStruct;
	const { id, title, parent_id, action } = option;
	let parent = null;
	if (parent_id) {
		parent = idMap[parent_id];
	} else {
		parent = root;
	}
	const obj = { parent, id, title, action, children: [] };
	parent.children.push(obj)
	idMap[id] = obj;
};

const menuOptionToDOM = option => {
	const {id, title} = option;
	return $.new(`div.menu-option[option-id="${id}"]`)
		.append($.txt(title));
};
const gobackOptionToDOM = () => {
	return $.new(`div#goback.menu-option`)
		.append($.txt('Voltar'))
};

const openMenuOption = option => {
	menuStruct.current = option;
	const { children, action } = option;
	if (children.length) {
		const leftbar = $('#leftbar').html('');
		if (option.parent) {
			leftbar.append(gobackOptionToDOM());
		}
		children.forEach(option => {
			leftbar.append(menuOptionToDOM(option));
		});
	}
	if (action) {
		action();
	}
};

const bindMenu = () => {
	const { root, idMap } = menuStruct;
	const leftbar = $('#leftbar');
	menuStruct.root.children.forEach(option => {
		leftbar.append(menuOptionToDOM(option));
	});
	leftbar.on('click', '.menu-option', function(){
		const obj = $(this);
		if (obj.attr('id') === 'goback') {
			openMenuOption(menuStruct.current.parent);
		} else {
			const id = obj.attr('option-id');
			const option = idMap[id];
			openMenuOption(option);
		}
	});
};

export const init = () => {
	bindMenu();
};

let counter = 0;
export const ocupy = () => {
	console.log('Perae', ++counter);
};
export const free = () => {
	console.log('Pronto', counter--);
};

export const userReq = (type, url, data) => new Promise((done, fail) => {
	ocupy();
	$.ajax({
		url, type, data,
		success: res => {
			free();
			done(res);
		},
		error: res => {
			free();
			fail(res);
		}
	})
});

export const userGet = (url, data) => userReq('GET', url, data);
export const userPost = (url, data) => userReq('POST', url, data);

export const say = msg => {
	alert('[Mensagem do sistema]\n' + msg);
};
export const warn = msg => {
	alert('[Erro do sistema]\n' + msg);
};