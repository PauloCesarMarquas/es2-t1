import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

PageControl.addFormInit('aluno/add', (page, data, loaded) => {
	const button = page.find('[target="add-aluno"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/aluno/add', data)
			.then(id => {
				PageControl.say('Cadastro concluido');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar');
			});
	});
	loaded();
});

PageControl.addFormInit('aluno/list', (page, data, loaded) => {
	PageControl.userGet('/aluno/list')
		.then(array => {
			const table = page.find('table');
			array.forEach(item => {
				const tr = $.new('tr');
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				table.append(tr);
				addAttr(item.nome);
				addAttr(item.matricula);
				addAttr(item.telefone);
				addAttr(item.email);
			});
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		})
});