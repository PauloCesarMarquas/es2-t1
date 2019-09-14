import * as System from '/js/system.js';

const loadCursos = page => new Promise((done, fail) => {
	const select = page.find('select[name="idCurso"]');
	System.userGet('/curso/list')
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
	System.userGet('/disciplina/list')
		.then(array => {
			array.forEach(item => {
				const {id} = item;
				const tr = $.new('tr');
				tr.append($.new('input[type="hidden"][name="id"]').val(id));
				const addAttr = attr => {
					tr.append($.new('td').append($.txt(attr)));
				}
				const addButton = (value, target) => {
					const button = $.new(`input[type="button"][target="${ target }"]`).val(value);
					tr.append($.new('td').append(button));
				};
				table.append(tr);
				addAttr(item.nome);
				addAttr(item.nomeCurso);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
			});
			done();
		})
		.catch(fail)
});
System.addFormInit('disciplina/add', (page, data, loaded) => {
	const button = page.find('[target="add-disciplina"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		const data = Util.getFormData(page);
		System.userPost('/disciplina/add', data)
			.then(id => {
				System.say('Cadastro concluído');
			})
			.catch(err => {
				System.warn('Erro ao cadastrar');
			});
	});
	loadCursos(page)
		.then(loaded)
		.catch(err => {
			System.closeForm(page);
			System.warn('Erro interno');
			loaded();
		});
});
System.addFormInit('disciplina/update', (page, data, loaded) => {
	page.find('[target="submit"]').bind('click', () => {
		System.ocupy();
		System.userPost('/disciplina/update', Util.getFormData(page))
			.then(res => {
				System.free();
				System.say('Alterações salvas');
			})
			.catch(err => {
				System.free();
				System.warn('Erro ao salvar alterações');
			});
	});
	let idCurso = null;
	let errorMsg = 'Falha ao carregar disciplina';
	System.userGet('/disciplina/get', data)
		.then(disciplina => {
			idCurso = disciplina.idCurso;
			errorMsg = 'Erro ao carregar cursos';
			page.find('[name="id"]').val(disciplina.id);
			page.find('[name="nome"]').val(disciplina.nome);
			return loadCursos(page);
		})
		.then(() => {
			page.find('[name="idCurso"]').val(idCurso);
			loaded();
		})
		.catch(err => {
			System.closeForm(page);
			System.warn(errorMsg);
			loaded();
		});
});
System.addFormInit('disciplina/list', (page, data, loaded) => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		System.openForm('disciplina/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let errorMsg = 'Falha ao remover disciplina';
		System.ocupy();
		System.userPost('/disciplina/remove', {id})
			.then(() => {
				System.say('Disciplina removida');
				errorMsg = 'Falha ao atualizar lista';
				return loadList(page);
			})
			.then(() => System.free())
			.catch(() => {
				System.warn(errorMsg);
				System.free();
			});
	});
	loadList(page)
		.then(loaded)
		.catch(err => {
			System.closeForm(page);
			System.warn('Erro ao carregar a lista');
			loaded();
		});
});