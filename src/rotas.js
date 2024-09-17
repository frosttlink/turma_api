import express from "express";

import turmaController from "./controller/turmaController.js"


export default function adicionarRotas(servidor) {
  servidor.use(turmaController);
}