import * as db from "../repository/turmaRepository.js";
import { Router } from "express";

const endpoints = Router();

endpoints.post("/turma", async (req, resp) => {
  try {
    let turmaObj = req.body;

    let id = await db.adicionarTurma(turmaObj);

    resp.send({
      Novoid: id,
    });
  } catch (err) {
    logErro(err);
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/turma", async (req, resp) => {
  try {
    let registro = await db.consultarTurmas();
    resp.send(registro);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/turma/busca/ano?ano=:ano", async (req, resp) => {
  try {
    let ano = req.query.ano;

    let registro = await db.consultarTurmasAno(ano);

    resp.send(registro);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/turma/:ano/curso?curso=:curso", async (req, resp) => {
  try {
    let ano = req.params.ano;
    let curso = req.query.curso;

    let registro = await db.consultarTurmasAnoCurso(ano, curso);

    resp.send(registro);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.put("/turma/:id", async (req, resp) => {
  try {
    let turmaObj = req.body;
    let id = req.params.id;

    await db.alterarTurma(turmaObj, id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.delete("/turma/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    await db.deletarTurma(id);

    resp.status(404).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});
