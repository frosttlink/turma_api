import con from "./connection.js";

// Adiciona uma nova turma na base de dados
export async function adicionarTurma(turma) {
  const comando = `
    insert into tb_turma (nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao)
    values (?, ?, ?, ?, ?, ?)
  `

  try {
    const resposta = await con.query(comando, [turma.turma, turma.curso, turma.anoLetivo, turma.capacidade, turma.ativo, turma.inclusao]);
    
    let info = resposta[0];
    const idTurma = info.insertId;
    return idTurma;
  } catch (error) {
    console.error('Erro ao inserir turma:', error);
    throw error;
  }
}

// Consulta todas as turmas na base de dados
export async function consultarTurmas() {
  const comando = `
  select 
    nm_turma as turma,			
    ds_curso as curso,			
    nr_ano_letivo as anoLetivo,		
    qtd_capacidade as capacidade,	
    bt_ativo as ativo,			
    dt_inclusao as inclusao
  from tb_turma
  `;

  try {
    const resposta = await con.query(comando);
    const registros = resposta[0];
    return registros;
  } catch (error) {
    console.error('Erro ao consultar turmas:', error);
    throw error;
  }
}

// Consulta as turmas de um ano específico
export async function consultarTurmasAno(ano) {
  const comando = `
  select 
    nm_turma as turma,			
    ds_curso as curso,			
    nr_ano_letivo as anoLetivo,		
    qtd_capacidade as capacidade,	
    bt_ativo as ativo,			
    dt_inclusao as inclusao
  from tb_turma
  where nr_ano_letivo = ?
  `;

  try {
    const resposta = await con.query(comando, [ano]);
    const registros = resposta[0];
    return registros;
  } catch (error) {
    console.error('Erro ao consultar turmas do ano:', error);
    throw error;
  }
}

// Consulta as turmas de um ano específico e curso
export async function consultarTurmasAnoCurso(ano, curso) {
  const comando = `
  select 
    nm_turma as turma,			
    ds_curso as curso,			
    nr_ano_letivo as anoLetivo,		
    qtd_capacidade as capacidade,	
    bt_ativo as ativo,			
    dt_inclusao as inclusao
  from tb_turma
  where nr_ano_letivo = ? and ds_curso = ?
  `;

  try {
    const resposta = await con.query(comando, [ano, curso]);
    const registros = resposta[0];
    return registros;
  } catch (error) {
    console.error('Erro ao consultar turmas do ano e curso:', error);
    throw error;
  }
}

// Altera uma turma existente
export async function alterarTurma(id, turma) {
  const comando = `
    update tb_turma
    set   
      nm_turma = ?,	
      ds_curso = ?,			
      nr_ano_letivo = ?,
      qtd_capacidade = ?,	
      bt_ativo = ?,
      dt_inclusao = ?
    where id_turma = ?
  `;

  try {
    const resposta = await con.query(comando, [
      turma.turma,
      turma.curso,
      turma.anoLetivo,
      turma.capacidade,
      turma.ativo,
      turma.inclusao,
      id,
    ]);

    const info = resposta[0];
    const linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
  } catch (error) {
    console.error('Erro ao alterar turma:', error);
    throw error;
  }
}

// Deleta uma turma existente
export async function deletarTurma(id) {
  const comando = `
    delete from tb_turma where id_turma = ?;
  `;

  try {
    const resposta = await con.query(comando, [id]);
    const info = resposta[0];
    const linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    throw error;
  }
}
