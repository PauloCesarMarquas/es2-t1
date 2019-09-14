import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

const loadAlunos = page => new Promise((done, fail) => {
	const select = page.find('select[name="idAluno"]');
	PageControl.userGet('/aluno/list')
		.then(array => {
			select.html('');
			array.forEach(aluno => {
				const option = $.new('option').val(aluno.id);
				option.append($.txt(aluno.nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});

const loadDisciplinas = page => new Promise((done, fail) => {
	const select = page.find('select[name="idDisciplina"]');
	PageControl.userGet('/disciplina/list')
		.then(array => {
			select.html('');
			array.forEach(disciplina => {
				const option = $.new('option').val(disciplina.id);
				option.append($.txt(disciplina.nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});


PageControl.addFormInit('nota/add', (page, data, loaded) => {
	const button = page.find('[target="add-nota"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/nota/add', data)
			.then(id => {
				PageControl.say('Cadastro concluído');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar');
			});
	});
	loadAlunos(page)
	loadDisciplinas(page)	
		.then(loaded)
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		});
});
PageControl.addFormInit('nota/list', (page, data, loaded) => {
	PageControl.userGet('/nota/list')
		.then(array => {
			const table = page.find('table');
			array.forEach(item => {
				const tr = $.new('tr');
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				const addButton = (value, target) => {
					const button = $.new(`input[type="button"][target="${ target }"]`).val(value);
					tr.append($.new('td').append(button));
				};
				table.append(tr);
				addAttr(item.nome);
				addAttr(item.nomeAluno);
				addAttr(item.nomeDisciplina);
				addButton('Editar', 'edit-nota');
				addButton('Remover', 'remove-nota');
			});
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro interno');
			loaded();
		})
});
