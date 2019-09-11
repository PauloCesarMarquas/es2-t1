import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

const loadCursos = page => new Promise((done, fail) => {
	const select = page.find('select[name="idCurso"]');
	PageControl.userGet('/curso/list')
		.then(array => {
			select.html('');
			array.forEach(curso => {
				const option = $.new('option').val(curso.id);
				option.append($.txt(curso.nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
PageControl.addFormInit('disciplina/add', (page, data, loaded) => {
	const button = page.find('[target="add-disciplina"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/disciplina/add', data)
			.then(id => {
				PageControl.say('Cadastro concluído');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar');
			});
	});
	loadCursos(page)
		.then(loaded)
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		});
});
PageControl.addFormInit('disciplina/list', (page, data, loaded) => {
	PageControl.userGet('/disciplina/list')
		.then(array => {
			const table = page.find('table');
			array.forEach(item => {
				const tr = $.new('tr');
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				table.append(tr);
				addAttr(item.nome);
				addAttr(item.nomeCurso);
			});
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		})
});