import * as PageControl from '/js/page-control.js';
import * as Util from '/js/util.js';

const loadAlunoList = page => new Promise((done, fail) => {
	const select = page.find('[name="idAluno"]')
	PageControl.userGet('/aluno/list')
		.then(array => {
			select.html('');
			array.forEach(aluno => {
				const { id, nome } = aluno;
				const option = $.new('option');
				option.append($.txt(nome));
				option.val(id);
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
const loadDisciplinaList = page => new Promise((done, fail) => {
	const select = page.find('[name="idDisciplina"]')
	PageControl.userGet('/disciplina/list')
		.then(array => {
			select.html('');
			array.forEach(disciplina => {
				const { id, nome } = disciplina;
				const option = $.new('option');
				option.append($.txt(nome));
				option.val(id);
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	PageControl.userGet('/matricula/list')
		.then(array => {
			table.find('tr').not(':eq(0)').remove();
			array.forEach(item => {
				const {id} = item;
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(id))
				const addAttr = value => {
					tr.append($.new('td').append($.txt(value)));
				};
				const addButton = (value, target) => {
					const button = $.new(`input[type="button"][target="${target}"]`);
					tr.append($.new('td').append(button.val(value)));
				};
				addAttr(item.nomeAluno);
				addAttr(item.nomeDisciplina);
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});
PageControl.addFormInit('matricula/add', (page, data, loaded) => {
	let error = 'Erro ao carregar alunos';
	loadAlunoList(page)
		.then(res => {
			error = 'Erro ao carregar disciplinas';
			return loadDisciplinaList(page);
		})
		.then(res => {
			loaded();
		})
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn(error);
			loaded();
		});
	page.find('[target="submit"]').bind('click', () => {
		const data = Util.getFormData(page);
		PageControl.userPost('/matricula/add', data)
			.then(res => {
				PageControl.say('Matrícula registrada com sucesso');
			})
			.catch(err => {
				PageControl.warn('Erro ao cadastrar matrícula');
			});
	});
});
PageControl.addFormInit('matricula/list', (page, data, loaded) => {
	loadList(page)
	 	.then(() => {
	 		loaded();
	 	})
	 	.catch(err => {
	 		PageControl.warn('Erro ao carregar lista');
	 		loaded();
	 	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Erro ao remover matrícula';
		PageControl.userPost('/matricula/remove', {id})
			.then(res => {
				error = 'Erro ao recarregar lista de matrículas';
				PageControl.say('Matrícula removida');
				return loadList(page);
			})
			.catch(err => {
				PageControl.warn(error);
			});
	});
});