import * as System from '/js/system.js';

// Foca a primeira input text da página de formulário
const focusFirst = page => {
	page.find('input[type="text"]').first().focus();
};

// Atualiza a tabela de listagem de alunos
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');

	// Remove todas as linhas da tabela com exceção da primeira
	// pois contém os títulos dos atributos
	table.find('tr').not(':eq(0)').remove();

	page.userGet('/aluno/list')
		.then(array => {
			array.forEach(item => {
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(item.id));

				// Adiciona um valor de atributo à linha atual
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				};

				// Adiciona um botão à linha atual
				const addButton = (value, target) => {
					const button = $.new('input').attr({
						type: 'button',
						target
					}).val(value);
					tr.append($.new('td').append(button));
				};

				addAttr(item.nome);
				addAttr(item.nomeCurso);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});

const loadCursos = page => new Promise((done, fail) => {
	const select = page.find('select[name="idCurso"]');
	page.userGet('/curso/list')
		.then(array => {
			select.html('');
			array.forEach(curso => {
				const option = $.new('option').val(curso.id);
				select.append(option.append($.txt(curso.nome)));
			});
			done();
		})
		.catch(fail);
});

const loadDisciplinas = page => new Promise((done, fail) => {
	const select = page.find('[name="idDisciplina"]');
	page.userGet('/disciplina/list')
		.then(array => {
			select.html('');
			array.forEach(disciplina => {
				const option = $.new('option').val(disciplina.id);
				select.append(option.append($.txt(disciplina.nome)));
			});
			done();
		})
		.catch(fail);
});

const loadPorDisciplina = page => new Promise((done, fail) => {
	const idDisciplina = page.find('[name="idDisciplina"]').val();
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/aluno/list', {idDisciplina})
		.then(array => {
			array.forEach(item => {
				const {nome, matricula} = item;
				const tr = $.new('tr');
				tr.append($.new('td').append($.txt(nome)))
				tr.append($.new('td').append($.txt(matricula)));
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});

const loadPorCurso = page => new Promise((done, fail) => {
	const idCurso = page.find('[name="idCurso"]').val();
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/aluno/list', {idCurso})
		.then(array => {
			array.forEach(item => {
				const {nome, matricula} = item;
				const tr = $.new('tr');
				tr.append($.new('td').append($.txt(nome)))
				tr.append($.new('td').append($.txt(matricula)));
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});

System.addFormInit('aluno/add', (page, data) => {
	const button = page.find('[target="submit"]');
	focusFirst(page);
	button.bind('click', () => {
		const data = page.data();
		page.userPost('/aluno/add', data)
			.then(id => {
				page.say('Cadastro concluído');
			})
			.catch(err => {
				page.error('Erro ao cadastrar aluno');
			});
	});
});

System.addFormInit('aluno/list', (page, data) => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		page.close();
		System.openFormPage('aluno/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Erro ao remover aluno';
		page.userPost('/aluno/remove', {id})
			.then(res => {
				System.say('Aluno removido');
				error = 'Erro ao atualizar lista';
				return loadList(page);
			})
			.catch(err => {
				System.error(error);
			});
	});
	loadList(page)
		.catch(err => {
			page.close();
			System.error('Erro interno');
		});
});

System.addFormInit('aluno/update', (page, data) => {
	let error = 'Falha ao carregar dados do aluno';
	let idCurso = null;
	page.userGet('/aluno/get', data)
		.then(aluno => {
			idCurso = aluno.idCurso;
			const attrs = 'id,nome,matricula,email,telefone'.split(',');
			attrs.forEach(attr => {
				page.find(`[name="${ attr }"]`).val(aluno[attr]);
			});
			focusFirst(page);
			page.find('[target="submit"]').bind('click', () => {
				const data = page.data();
				page.userPost('/aluno/update', data)
					.then(() => System.say('Alterações salvas'))
					.catch(() => System.error('Erro ao salvar alterações'));
			});
			error = 'Falha ao carregar cursos';
			return loadCursos(page);
		})
		.then(page.find('[name="idCurso"]').val(idCurso))
		.catch(() => {
			page.close();
			System.error(error);
		});
});

System.addFormInit('aluno/por_disciplina', page => {
	loadDisciplinas(page)
		.catch(() => {
			page.close();
			System.error('Erro ao carregar disciplinas');
		});
	page.find('[target="submit"]').bind('click', () => {
		loadPorDisciplina(page)
			.catch(() => System.error('Erro ao gerar relatório'));
	});
});

System.addFormInit('aluno/por_curso', page => {
	loadCursos(page)
		.catch(() => {
			page.close();
			System.error('Erro ao carregar cursos');
		});
	page.find('[target="submit"]').bind('click', () => {
		loadPorCurso(page)
			.catch(() => System.error('Erro ao gerar relatório'));
	});
});