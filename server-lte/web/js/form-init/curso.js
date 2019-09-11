import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

PageControl.addFormInit('curso/add', (page, data, loaded) => {
	const button = page.find('[target="add-curso"]');
	page.find('input[type="text"]').first().focus();
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
	PageControl.userGet('/curso/list')
		.then(array => {
			const table = page.find('table');
			array.forEach(item => {
				const tr = $.new('tr');
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				table.append(tr);
				addAttr(item.nome);
			});
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		})
});