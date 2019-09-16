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
// const loadList = page => new Promise((done, fail) => {
// 	const table = page.find('table');
// 	table.find('tr').not(':eq(0)').remove();
// 	page.userGet('/turma/list')
// 		.then(array => {
// 			array.forEach(item => {
// 				const {id} = item;
// 				const tr = $.new('tr');
// 				tr.append($.new('input[type="hidden"][name="id"]').val(id));
// 				const addAttr = attr => {
// 					tr.append($.new('td').append($.txt(attr)));
// 				}
// 				const addButton = (value, target) => {
// 					tr.append($.new('td').append($.new('input').attr({
// 						type: 'button', target
// 					}).val(value)));
// 				};
// 				addAttr(item.nome);
// 				addAttr(item.nomeDisciplina);
// 				addButton('Editar', 'update');
// 				addButton('Remover', 'remove');
// 				table.append(tr);
// 			});
// 			done();
// 		})
// 		.catch(fail)
// });
// System.addFormInit('turma/add', (page, data) => {
// 	const button = page.find('[target="submit"]');
// 	page.find('input[type="text"]').first().focus();
// 	button.bind('click', () => {
// 		page.userPost('/turma/add', page.data())
// 			.then(() => System.say('Cadastro concluído'))
// 			.catch(() => System.error('Erro ao cadastrar'));
// 	});
// 	loadDisciplinas(page)
// 		.catch(() => {
// 			page.close();
// 			System.error('Erro interno');
// 		});
// });
// System.addFormInit('turma/update', (page, data) => {
// 	page.find('[target="submit"]').bind('click', () => {
// 		page.userPost('/turma/update', page.data())
// 			.then(() => System.say('Alterações salvas'))
// 			.catch(() => System.error('Erro ao salvar alterações'));
// 	});
// 	let idDisciplina = null;
// 	let error = 'Falha ao carregar turma';
// 	page.userGet('/turma/get', data)
// 		.then(turma => {
// 			idDisciplina = turma.idDisciplina;
// 			error = 'Erro ao carregar disciplinas';
// 			page.find('[name="id"]').val(turma.id);
// 			page.find('[name="nome"]').val(turma.nome);
// 			return loadDisciplinas(page);
// 		})
// 		.then(() => page.find('[name="idDisciplina"]').val(idDisciplina))
// 		.catch(() => {
// 			page.close();
// 			System.error(error);
// 		});
// });
// System.addFormInit('turma/list', (page, data) => {
// 	page.on('click', '[target="update"]', function(){
// 		const id = $(this).closest('tr').find('[name="id"]').val();
// 		System.openFormPage('turma/update', {id});
// 	});
// 	page.on('click', '[target="remove"]', function(){
// 		const id = $(this).closest('tr').find('[name="id"]').val();
// 		let error = 'Falha ao remover turma';
// 		page.userPost('/turma/remove', {id})
// 			.then(() => {
// 				System.say('Turma removida');
// 				error = 'Falha ao atualizar lista';
// 				return loadList(page);
// 			})
// 			.catch(() => System.error(error));
// 	});
// 	loadList(page)
// 		.catch(err => {
// 			page.close();
// 			System.error('Erro ao carregar a lista');
// 		});
// });
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