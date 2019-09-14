import * as System from '/js/system.js';

const focusFirst = page => {
	page.find('input[type="text"]').first().focus();
};
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	page.userGet('/curso/list')
		.then(array => {
			table.find('tr').not(':eq(0)').remove();
			array.forEach(item => {
				const {id} = item;
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(id));
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				const addButton = (value, target) => {
					const button = $.new(`input[type="button"][target="${ target }"]`).val(value);
					button.attr('ref-id', id);
					tr.append($.new('td').append(button));
				};
				table.append(tr);
				addAttr(item.nome);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
			});
			done();
		})
		.catch(fail);
});
System.addFormInit('curso/add', (page, data) => {
	const button = page.find('[target="submit"]');
	focusFirst(page);
	button.bind('click', () => {
		const data = page.data();
		page.userPost('/curso/add', data)
			.then(id => {
				System.say('Cadastro concluído');
			})
			.catch(err => {
				System.error('Erro ao cadastrar');
			});
	});
});
System.addFormInit('curso/list', (page, data) => {
	loadList(page)
		.catch(err => {
			console.log(err);
			page.close();
			System.error('Erro ao carregar lista');
		});
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		System.openFormPage('curso/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let errorMsg = 'Erro ao remover curso';
		page.userPost('/curso/remove', {id})
			.then(res => {
				System.say('Curso removido');
				errorMsg = 'Falha ao recarregar lista';
				return loadList(page);
			})
			.catch(err => {
				System.error(errorMsg);
			});
	});
});
System.addFormInit('curso/update', (page, data) => {
	page.userGet('/curso/get', data)
		.then(curso => {
			let attrs = 'id,nome'.split(',');
			attrs.forEach(attr => {
				page.find(`[name="${attr}"]`).val(curso[attr]);
			});
			focusFirst(page);
		})
		.catch(err => {
			page.close();
			System.error('Erro interno');
		});
	page.on('click', '[target="submit"]', () => {
		const data = page.data();
		page.userPost('/curso/update', data)
			.then(res => {
				System.say('Alterações salvas');
			})
			.catch(err => {
				System.error('Erro ao salvar alterações');
			});
	});
});