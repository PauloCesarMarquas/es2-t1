import * as System from '/js/system.js';
import * as Data from '/js/date.js';

const loadTurmas = page => new Promise((done, fail) => {
	const select = page.find('[name="idTurma"]').html('');
	page.userGet('/turma/list')
		.then(array => {
			array.forEach(item => {
				const {id, nome} = item;
				const option = $.new('option').val(id);
				option.append($.txt(nome));
				select.append(option);
			});
			done();
		})
		.catch(fail);
});

let nAlunos = 0;
const loadAlunos = page => new Promise((done, fail) => {
	const table = page.find('table');
	table.find('tr').not(':eq(0)').remove();
	const idTurma = page.data().idTurma;
	if (!idTurma) {
		return done();
	}
	page.userGet('/aluno/list', { idTurma })
		.then(array => {
			nAlunos = array.length;
			array.forEach((item, i) => {
				const tr = $.new('tr');
				const {id, nome} = item;
				const checkbox = $.new('input').attr({
					type: 'checkbox',
					name: 'presente' + i
				});
				const idAluno = $.new('input').attr({
					type: 'hidden',
					name: 'idAluno' + i
				}).val(id);
				tr.append($.new('td').append($.txt(nome)));
				tr.append($.new('td').append(checkbox));
				tr.append(idAluno);
				table.append(tr);
			});
			done();
		})
		.catch(fail);
});

const getListFrequencia = page => {
	const array = [];
	for (let i=0; i<nAlunos; ++i) {
		const idAluno = page.find(`[name="idAluno${i}"]`).val();
		const presente = page.find(`[name="presente${i}"]`).is(':checked')|0;
		array.push({ idAluno, presente });
	}
	return array;
};

System.addFormInit('frequencia/add', page => {
	let error = 'Erro ao carregar turmas';
	loadTurmas(page)
		.then(() => {
			error = 'Erro ao carregar lista de alunos';
			return loadAlunos(page);
		})
		.catch(err => {
			page.close();
			System.error(error);
		});
	page.find('[name="idTurma"]').bind('change', () => {
		loadAlunos(page).catch(err => {
			System.error('Erro ao carregar lista de alunos');
		});
	});
	page.find('[target="submit"]').bind('click', () => {
		const form_data = page.data();
		const data = Data.parse(form_data.data);
		if (!data) {
			System.error('Informe uma data válida');
			return;
		}
		const {idTurma} = form_data;
		const frequencia = getListFrequencia(page);
		page.userPost('/frequencia/add', { data, idTurma, frequencia, nAlunos })
			.then(() => System.say('Frequências registradas com sucesso'))
			.catch(err => System.error('Erro ao registrar frequênciass'));
	});
});