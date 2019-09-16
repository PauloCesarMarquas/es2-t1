import * as System from '/js/system.js';

const loadTurmas = page => new Promise((done, fail) => {
	const select = page.find('select[name="idTurma"]');
	page.userGet('/turma/list')
		.then(array => {
			select.html('');
			array.forEach(turma => {
				const {id, nome} = turma;
				const option = $.new('option').val(id);
				option.append($.txt(nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
const loadAvaliacoes = page => new Promise((done, fail) => {
	const idTurma = page.find('[name="idTurma"]').val();
	const select = page.find('select[name="idAvaliacao"]');
	page.userGet('/avaliacao/list', { idTurma })
		.then(array => {
			select.html('');
			array.forEach(avaliacao => {
				const {id, nome} = avaliacao;
				const option = $.new('option').val(id);
				option.append($.txt(nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
const loadAlunos = page => new Promise((done, fail) => {
	const idTurma = page.find('[name="idTurma"]').val();
	const select = page.find('select[name="idAluno"]');
	page.userGet('/aluno/list', { idTurma })
		.then(array => {
			select.html('');
			array.forEach(aluno => {
				const {id, nome} = aluno;
				const option = $.new('option').val(id);
				option.append($.txt(nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});

System.addFormInit('nota/add', page => {
	let error = 'Erro ao carregar lista de turmas';
	loadTurmas(page)
		.then(() => {
			error = 'Erro ao carregar lista de avaliações';
			return loadAvaliacoes(page);
		})
		.then(() => {
			error = 'Erro ao carregar lista de alunos';
			return loadAlunos(page);
		})
		.catch(err => {
			page.close();
			System.error(error);
		});
	page.find('[name="idTurma"]').bind('change', () => {
		let error = 'Erro ao carregar lista de avaliações';
		loadAvaliacoes(page)
			.then(() => {
				error = 'Erro ao carregar lista de alunos';
				return loadAlunos(page);
			})
			.catch(err => {
				System.error(error);
			});
	});
	page.find('[target="submit"]').bind('click', () => {
		page.userPost('/nota/add', page.data())
			.then(() => {
				System.say('Nota reigistrada');
			})
			.catch(err => {
				System.error('Erro ao reigistrar nota');
			});
	});
});

const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	const idAvaliacao = page.find('[name="idAvaliacao"]').val();
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/nota/list', { idAvaliacao })
		.then(array => {
			array.forEach(item => {
				const tr = $.new('tr');
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				};
				addAttr(item.nomeAluno);
				addAttr(item.valor);
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});

System.addFormInit('nota/list', page => {
	let error = 'Erro ao carregar lista de turmas';
	loadTurmas(page)
		.then(() => {
			error = 'Erro ao carregar lista de avaliações';
			return loadAvaliacoes(page);
		})
		.catch(err => {
			page.close();
			System.error(error);
		});
	page.find('[name="idTurma"]').bind('change', () => {
		loadAvaliacoes(page)
			.catch(err => {
				System.error('Erro ao carregar lista de avaliações');
			});
	});
	page.find('[target="submit"]').bind('click', () => {
		loadList(page)
			.catch(err => {
				System.error('Erro ao carregar lista de notas');
			});
	});
});