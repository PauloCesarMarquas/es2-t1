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
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	PageControl.userGet('/disciplina/list')
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
PageControl.addFormInit('disciplina/update', (page, data, loaded) => {
	page.find('[target="submit"]').bind('click', () => {
		PageControl.ocupy();
		PageControl.userPost('/disciplina/update', Util.getFormData(page))
			.then(res => {
				PageControl.free();
				PageControl.say('Alterações salvas');
			})
			.catch(err => {
				PageControl.free();
				PageControl.warn('Erro ao salvar alterações');
			});
	});
	let idCurso = null;
	let errorMsg = 'Falha ao carregar disciplina';
	PageControl.userGet('/disciplina/get', data)
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
			PageControl.closeForm(page);
			PageControl.warn(errorMsg);
			loaded();
		});
});
PageControl.addFormInit('disciplina/list', (page, data, loaded) => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		PageControl.openForm('disciplina/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let errorMsg = 'Falha ao remover disciplina';
		PageControl.ocupy();
		PageControl.userPost('/disciplina/remove', {id})
			.then(() => {
				PageControl.say('Disciplina removida');
				errorMsg = 'Falha ao atualizar lista';
				return loadList(page);
			})
			.then(() => PageControl.free())
			.catch(() => {
				PageControl.warn(errorMsg);
				PageControl.free();
			});
	});
	loadList(page)
		.then(loaded)
		.catch(err => {
			PageControl.closeForm(page);
			PageControl.warn('Erro ao carregar a lista');
			loaded();
		});
});