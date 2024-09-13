import con from "./connection.js";

export async function adicionarTurma(turma) {
  let comando = `
  insert into tb_turmas (nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao)
  values (?, ?, ? , ? , ? , ?)
  `;
  let resposta = await con.query(
    comando,
    turma[
      (turma.turma,
      turma.curso,
      turma.anoLetivo,
      turma.capacidade,
      turma.ativo,
      turma.inclusao)
    ]
  );
  let info = resposta[0];

  let idTurma = info.insertId;
  return idTurma;
}

export async function consultarTurmas() {
  let comando = `
  select 
    nm_turma   turma,			
    ds_curso   curso,			
    nr_ano_letivo   anoLetivo,		
    qtd_capacidade   capacidade,	
    bt_ativo         ativo,			
    dt_inclusao      inclusao
from tb_turmas
  `;

  let resposta = await con.query(comando);
  let registros = resposta[0];

  return registros;
}

export async function consultarTurmasAno (ano){
  let comando = `
  select 
  nm_turma   turma,			
  ds_curso   curso,			
  nr_ano_letivo   anoLetivo,		
  qtd_capacidade   capacidade,	
  bt_ativo         ativo,			
  dt_inclusao      inclusao
from tb_turmas
where nr_ano_letivo = ?
  `

let resposta = await con.query(comando, [ano])
let registro = resposta[0]

return registro
}


export async function consultarTurmasAnoCurso (ano, curso) {
  let comando = `
  select 
    nm_turma   turma,			
    ds_curso   curso,			
    nr_ano_letivo   anoLetivo,		
    qtd_capacidade   capacidade,	
    bt_ativo         ativo,			
    dt_inclusao      inclusao
from tb_turmas
where nr_ano_letivo = ? and ds_curso = ?
  `

  let resposta = await con.query (comando, [ano, curso])
  let registro = resposta[0]

  return registro
}

export async function alterarTurma(id, turma) {
  let comando = `        
    update tb_turmas 
    set   nm_turma	= ?,	
      ds_curso = ?,			
      nr_ano_letivo =?,
      qtd_capacidade = ?	,	
      bt_ativo	= ?,
      dt_inclusao	 = ?
    where id_turma = ?;
  `

  let resposta  = await con.query(comando, [
    turma.turma,
    turma.curso,
    turma.anoLetivo,
    turma.capacidade,
    turma.ativo,
    turma.inclusao,
    id]);

    let info = resposta[0];
    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;
}

export async function deletarTurma(id) {
  let comando = `
    delete from tb_turmas where id_turma = ?;
  `

  let resposta = await con.query(comando, [id]);
  let info = resposta[0]

  let linhasAfetadas = info.affectedRows;
  return linhasAfetadas;
}