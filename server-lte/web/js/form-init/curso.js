import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

const focusFirst = page => {
	page.find('input[type="text"]').first().focus();
};
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	PageControl.userGet('/curso/list')
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
PageControl.addFormInit('curso/add', (page, data, loaded) => {
	const button = page.find('[target="add-curso"]');
	focusFirst(page);
	button.bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/curso/add', data)
			.then(id => {
				PageControl.say('Cadastro concluído');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar');
			});
	});
	loaded();
});
PageControl.addFormInit('curso/list', (page, data, loaded) => {
	loadList(page)
		.then(loaded)
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro ao carregar lista');
			loaded();
		});
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		PageControl.openForm('curso/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let errorMsg = 'Erro ao remover curso';
		PageControl.userPost('/curso/remove', {id})
			.then(res => {
				PageControl.say('Curso removido');
				errorMsg = 'Falha ao recarregar lista';
				return loadList(page);
			})
			.catch(err => {
				PageControl.warn(errorMsg);
			});
	});
});
PageControl.addFormInit('curso/update', (page, data, loaded) => {
	PageControl.userGet('/curso/get', data)
		.then(curso => {
			let attrs = 'id,nome'.split(',');
			attrs.forEach(attr => {
				page.find(`[name="${attr}"]`).val(curso[attr]);
			});
			focusFirst(page);
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		});
	page.on('click', '[target="submit"]', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/curso/update', data)
			.then(res => {
				PageControl.say('Alterações salvas');
			})
			.catch(err => {
				PageControl.warn('Erro ao salvar alterações');
			});
	});
});