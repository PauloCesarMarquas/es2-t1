import * as System from '/js/system.js';

const loadAlunoList = page => new Promise((done, fail) => {
	const select = page.find('[name="idAluno"]')
	page.userGet('/aluno/list')
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
const loadTurmaList = page => new Promise((done, fail) => {
	const select = page.find('[name="idTurma"]')
	page.userGet('/turma/list')
		.then(array => {
			select.html('');
			array.forEach(turma => {
				const { id, nome } = turma;
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
	page.userGet('/matricula/list')
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
				addAttr(item.nomeTurma);
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});
System.addFormInit('matricula/add', (page, data) => {
	let error = 'Erro ao carregar alunos';
	loadAlunoList(page)
		.then(res => {
			error = 'Erro ao carregar turmas';
			return loadTurmaList(page);
		})
		.catch(err => {
			page.close();
			System.error(error);
		});
	page.find('[target="submit"]').bind('click', () => {
		const data = page.data();
		page.userPost('/matricula/add', data)
			.then(res => {
				System.say('Matrícula registrada com sucesso');
			})
			.catch(err => {
				System.error('Erro ao cadastrar matrícula');
			});
	});
});
System.addFormInit('matricula/list', (page, data) => {
	loadList(page)
	 	.then(() => {
	 	})
	 	.catch(err => {
	 		System.error('Erro ao carregar lista');
	 	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Erro ao remover matrícula';
		page.userPost('/matricula/remove', {id})
			.then(res => {
				error = 'Erro ao recarregar lista de matrículas';
				System.say('Matrícula removida');
				return loadList(page);
			})
			.catch(err => {
				System.error(error);
			});
	});
});