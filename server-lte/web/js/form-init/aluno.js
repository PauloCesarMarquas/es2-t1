import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

const focusFirst = page => {
	page.find('input[type="text"]').first().focus();
};
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	PageControl.userGet('/aluno/list')
		.then(array => {
			array.forEach(item => {
				const {id} = item;
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(id));
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				};
				const addButton = (value, target) => {
					const button = $.new(`input[type="button"][target="${ target }"]`).val(value);
					button.attr('ref-id', id);
					tr.append($.new('td').append(button));
				};
				table.append(tr);
				addAttr(item.nome);
				addAttr(item.matricula);
				addAttr(item.telefone);
				addAttr(item.email);
				addButton('Editar', 'update-aluno');
				addButton('Remover', 'remove-aluno');
			});
			done();
		})
		.catch(fail);
});
PageControl.addFormInit('aluno/add', (page, data, loaded) => {
	const button = page.find('[target="add-aluno"]');
	focusFirst(page);
	button.bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/aluno/add', data)
			.then(id => {
				PageControl.say('Cadastro concluído');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar');
			});
	});
	loaded();
});
PageControl.addFormInit('aluno/list', (page, data, loaded) => {
	page.on('click', '[target="update-aluno"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		PageControl.closeForm(page);
		PageControl.openForm('aluno/update', {id});
	});
	page.on('click', '[target="remove-aluno"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let errorMsg = 'Erro ao remover aluno';
		PageControl.ocupy();
		PageControl.userPost('/aluno/remove', {id})
			.then(res => {
				PageControl.say('Aluno removido');
				errorMsg = 'Erro ao atualizar lista';
				return loadList(page);
			})
			.then(() => {
				PageControl.free();
			})
			.catch(err => {
				PageControl.warn(errorMsg);
				PageControl.free();
			});
	});
	loadList(page)
		.then(loaded)
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			console.log(err);
			loaded();
		});
});
PageControl.addFormInit('aluno/update', (page, data, loaded) => {
	PageControl.userGet('/aluno/get', data)
		.then(aluno => {
			const attrs = 'id,nome,matricula,email,telefone'.split(',');
			attrs.forEach(attr => {
				page.find(`[name="${ attr }"]`).val(aluno[attr]);
			});
			focusFirst(page);
			page.find('[target="submit"]').bind('click', () => {
				const data = Util.getFormData(page);
				PageControl.ocupy();
				PageControl.userPost('/aluno/update', data)
					.then(() => {
						PageControl.free();
						PageControl.say('Alterações salvas');
					})
					.catch(err => {
						PageControl.free();
						PageControl.warn('Erro ao salvar alterações');
					});
			});
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		});
});