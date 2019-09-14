import * as System from '/js/system.js';

const loadCursos = page => new Promise((done, fail) => {
	const select = page.find('select[name="idCurso"]');
	page.userGet('/curso/list')
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
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/disciplina/list')
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
				addAttr(item.nomeCurso);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail)
});
System.addFormInit('disciplina/add', (page, data) => {
	const button = page.find('[target="submit"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		page.userPost('/disciplina/add', page.data())
			.then(() => System.say('Cadastro concluído'))
			.catch(() => System.error('Erro ao cadastrar'));
	});
	loadCursos(page)
		.catch(() => {
			page.close();
			System.error('Erro interno');
		});
});
System.addFormInit('disciplina/update', (page, data) => {
	page.find('[target="submit"]').bind('click', () => {
		page.userPost('/disciplina/update', page.data())
			.then(() => System.say('Alterações salvas'))
			.catch(() => System.error('Erro ao salvar alterações'));
	});
	let idCurso = null;
	let error = 'Falha ao carregar disciplina';
	page.userGet('/disciplina/get', data)
		.then(disciplina => {
			idCurso = disciplina.idCurso;
			error = 'Erro ao carregar cursos';
			page.find('[name="id"]').val(disciplina.id);
			page.find('[name="nome"]').val(disciplina.nome);
			return loadCursos(page);
		})
		.then(() => page.find('[name="idCurso"]').val(idCurso))
		.catch(() => {
			page.close();
			System.error(error);
		});
});
System.addFormInit('disciplina/list', (page, data) => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		System.openFormPage('disciplina/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Falha ao remover disciplina';
		page.userPost('/disciplina/remove', {id})
			.then(() => {
				System.say('Disciplina removida');
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