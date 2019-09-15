import * as System from '/js/system.js';

const loadTurmas = page => new Promise((done, fail) => {
	const select = page.find('select[name="idTurma"]');
	page.userGet('/turma/list')
		.then(array => {
			select.html('');
			array.forEach(turma => {
				const option = $.new('option').val(turma.id);
				option.append($.txt(turma.nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});
const loadList = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	page.userGet('/avaliacao/list')
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
				addAttr(item.nomeTurma);
				addButton('Editar', 'update');
				addButton('Remover', 'remove');
				table.append(tr);
			});
			done();
		})
		.catch(fail)
});
const loadPorTurma = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	const idTurma = page.find('[name="idTurma"]').val();
	page.userGet('/avaliacao/list', {idTurma})
		.then(array => {
			array.forEach(item => {
				const tr = $.new('tr');
				tr.append($.new('td').append($.txt(item.nome)));
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});
System.addFormInit('avaliacao/add', page => {
	const button = page.find('[target="submit"]');
	page.find('input[type="text"]').first().focus();
	button.bind('click', () => {
		page.userPost('/avaliacao/add', page.data())
			.then(() => System.say('Cadastro concluído'))
			.catch(() => System.error('Erro ao cadastrar'));
	});
	loadTurmas(page)
		.catch(() => {
			page.close();
			System.error('Erro interno');
		});
});
System.addFormInit('avaliacao/update', page => {
	page.find('[target="submit"]').bind('click', () => {
		page.userPost('/avaliacao/update', page.data())
			.then(() => System.say('Alterações salvas'))
			.catch(() => System.error('Erro ao salvar alterações'));
	});
	let idTurma = null;
	let error = 'Falha ao carregar avaliacao';
	page.userGet('/avaliacao/get', data)
		.then(avaliacao => {
			idTurma = avaliacao.idTurma;
			error = 'Erro ao carregar turmas';
			page.find('[name="id"]').val(avaliacao.id);
			page.find('[name="nome"]').val(avaliacao.nome);
			return loadTurmas(page);
		})
		.then(() => page.find('[name="idTurma"]').val(idTurma))
		.catch(() => {
			page.close();
			System.error(error);
		});
});
System.addFormInit('avaliacao/list', page => {
	page.on('click', '[target="update"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		System.openFormPage('avaliacao/update', {id});
	});
	page.on('click', '[target="remove"]', function(){
		const id = $(this).closest('tr').find('[name="id"]').val();
		let error = 'Falha ao remover avaliação';
		page.userPost('/avaliacao/remove', {id})
			.then(() => {
				System.say('Avaliação removida');
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
System.addFormInit('avaliacao/por_turma', page => {
	loadTurmas(page)
		.catch(() => {
			page.close();
			System.error('Erro ao carregar turmas');
		});
	page.find('[target="submit"]').bind('click', () => {
		loadPorTurma(page);
	});
});