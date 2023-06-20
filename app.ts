const model = require('./model/controller.ts')
import { NextFunction, Request, Response } from 'express';


const express = require("express")
const cors = require("cors")

const app = express()

const port = process.env.PORT || 8080

app.use((request: Request, response: Response, next: NextFunction) => {

  response.header("Access-Control-Allow-Origin", "*")

  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  app.use(cors())

  next()
})

//endpoints

app.get("/v1/lion-school/cursos", cors(), async function (request: Request, response: Response, next: NextFunction) {

  let cursos = model.getCursos()

  if (cursos) {
    response.json(cursos);
    response.status(200);
  } else {
    response.status(500)
  }
})

//criei a mais

app.get("/v1/lion-school/cursos/:nome", cors(), async function (request: Request, response: Response, next: NextFunction) {


  let sigla = request.params.nome

  let cursos = model.getCursoID(sigla)

  if (cursos) {
    response.json(cursos);
    response.status(200);
  } else {
    response.status(500)
  }
})

//criei a mais

app.get("/v1/lion-school/alunos", cors(), async function (request: Request, response: Response, next: NextFunction) {

  let siglaCurso = request.query.curso
  let statusAluno = request.query.status
  let anoConclusao = request.query.ano
  let dadosAluno: {} = {}
  let statusCode
  let alunos = model.getTodosAlunos()


  if (siglaCurso == undefined && statusAluno == undefined && anoConclusao == undefined) {
    if (alunos) {
      dadosAluno = alunos
      statusCode = 200
    } else {
      statusCode = 200
    }
  }
  else if (siglaCurso != undefined) {
    if (siglaCurso == '' || siglaCurso == undefined) {
      statusCode = 400
      dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
    } else {
      if (anoConclusao != undefined) {
        if (anoConclusao == '' || anoConclusao == undefined) {
          statusCode = 400
          dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
        } else {
          let cursoAluno = model.getAlunosCurso(siglaCurso)
          let aluno = model.getDataAlunos(anoConclusao, cursoAluno)
          if (aluno) {
            statusCode = 200
            dadosAluno = aluno
          } else {
            statusCode = 404
          }
        }
      } else if (statusAluno != undefined) {
        if (statusAluno == '' || statusAluno == undefined) {
          statusCode = 400
          dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
        } else {
          let cursoAluno = model.getAlunosCurso(siglaCurso)
          let aluno = model.getStatusAluno(statusAluno, cursoAluno)
          if (aluno) {
            statusCode = 200
            dadosAluno = aluno
          } else {
            statusCode = 404
          }
        }
      }

      else {

        let aluno = model.getAlunosCurso(siglaCurso)
        if (aluno) {
          statusCode = 200
          dadosAluno = aluno
        } else {
          statusCode = 404
        }

      }
    }

  } else if (statusAluno != undefined) {
    if (statusAluno == '' || statusAluno == undefined) {
      statusCode = 400
      dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
    } else {
      let aluno = model.getStatusAluno(statusAluno)
      if (aluno) {
        statusCode = 200
        dadosAluno = aluno
      } else {
        statusCode = 404
      }
    }

  } else if (siglaCurso == undefined && statusAluno == undefined && anoConclusao != undefined) {
    if (anoConclusao == '' || anoConclusao == undefined) {
      statusCode = 400
      dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
    } else {
      let aluno = model.getDataAlunos(anoConclusao)
      if (aluno) {
        statusCode = 200
        dadosAluno = aluno
      } else {
        statusCode = 404
      }
    }
  }
  else {
    statusCode = 400
    dadosAluno = { message: "Não é possível processar a requisição, verifique a URL da requisição." }

  }
  response.status(statusCode)
  response.json(dadosAluno)
})

app.get("/v1/lion-school/alunos/:matricula", cors(), async function (request: Request, response: Response, next: NextFunction) {

  let matricula = request.params.matricula
  let statusCode
  let dadosAluno = {}

  if (matricula == '' || matricula == undefined) {
    statusCode = 400
    dadosAluno = { message: "Não é possível processar a requisição, pois a matricula do aluno não foi informada ou não é válida." }
  } else {
    let aluno = model.getAluno(matricula)
    if (aluno) {
      statusCode = 200
      dadosAluno = aluno
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosAluno)
})

app.get("/v1/lion-school/alunos", cors(), async function (request: Request, response: Response, next: NextFunction) {

  let siglaCurso = request.query.curso
  let statusCode
  let dadosAluno = {}

  if (siglaCurso == '' || siglaCurso == undefined) {
    statusCode = 400
    dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
  } else {
    let aluno = model.getAlunosCurso(siglaCurso)
    if (aluno) {
      statusCode = 200
      dadosAluno = aluno
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosAluno)
})

app.get("/v1/lion-school/alunos", cors(), async function (request: Request, response: Response, next: NextFunction) {

  let statusAluno = request.query.status
  let statusCode
  let dadosAluno = {}

  if (statusAluno == '' || statusAluno == undefined) {
    statusCode = 400
    dadosAluno = { message: "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida." }
  } else {
    let aluno = model.getStatusAluno(statusAluno)
    if (aluno) {
      statusCode = 200
      dadosAluno = aluno
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosAluno)
})


//indica a porta

app.listen(port, function () {
  console.log("Servidor aguardando requisições");
})
