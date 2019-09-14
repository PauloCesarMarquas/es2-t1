import * as System from '/js/system.js';

const loadDisciplinas = page => new Promise((done, fail) => {
	const select = page.find('select[name="idDisciplina"]');
	page.userGet('/disciplina/list')
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
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/turma/list')
		.then(array => {
			array.forEach(item => {
				const {id} = item;
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(id));
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				const addButton = (value, target) => {
					tr.append($.new('td').append($.new('input').attr({
						type: 'button', target
					}).val(value)));
				};
				addAttr(item.nome);
				addAttr(item.nomeDisciplina);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail)
});
System.addFormInit('turma/add', (page, data) => {
	const button = page.find('[target="submit"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		page.userPost('/turma/add', page.data())
			.then(() => System.say('Cadastro concluído'))
			.catch(() => System.error('Erro ao cadastrar'));
	});
	loadDisciplinas(page)
		.catch(() => {
			page.close();
			System.error('Erro interno');
		});
});
System.addFormInit('turma/update', (page, data) => {
	page.find('[target="submit"]').bind('click', () => {
		page.userPost('/turma/update', page.data())
			.then(() => System.say('Alterações salvas'))
			.catch(() => System.error('Erro ao salvar alterações'));
	});
	let idDisciplina = null;
	let error = 'Falha ao carregar turma';
	page.userGet('/turma/get', data)
		.then(turma => {
			idDisciplina = turma.idDisciplina;
			error = 'Erro ao carregar disciplinas';
			page.find('[name="id"]').val(turma.id);
			page.find('[name="nome"]').val(turma.nome);
			return loadDisciplinas(page);
		})
		.then(() => page.find('[name="idDisciplina"]').val(idDisciplina))
		.catch(() => {
			page.close();
			System.error(error);
		});
});
System.addFormInit('turma/list', (page, data) => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		System.openFormPage('turma/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Falha ao remover turma';
		page.userPost('/turma/remove', {id})
			.then(() => {
				System.say('Turma removida');
				error = 'Falha ao atualizar lista';
				return loadList(page);
			})
			.catch(() => System.error(error));
	});
	loadList(page)
		.catch(err => {
			page.close();
			System.error('Erro ao carregar a lista');
		});
});