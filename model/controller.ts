let alunosDAO = require('../data/alunos.ts')
let cursosDAO = require('../data/cursos.ts')


interface Curso {
  nome: string,
  sigla: string,
  icone: string,
  carga: string,
  conclusao: string,
  disciplinas: Array<Disciplina>
}

interface Aluno {
  foto: string,
  nome: string,
  matricula: string,
  sexo: string,
  curso: Array<Curso>,
  status: string
}

interface Disciplina {
  nome: string,
  carga: string,
  media: string,
  status: string,
}
function getCursos() {
  return cursosDAO
}

function getCursoID(siglaCurso: string) {
  let json = {}
  let status = false
  cursosDAO.cursos.forEach(function (curso: any) {
    if (curso.sigla === siglaCurso.toUpperCase()) {
      let statusCase = curso.nome.slice(17)
      json = { curso: statusCase }
      status = true
    }
  })
  if (status) {
    return json
  } else {
    return status
  }
}

function getTodosAlunos() {
  return alunosDAO
}

function getAluno(matricula: string) {

  interface Json {
    aluno: Aluno
  }

  let json: {} = {}
  let status = false
  alunosDAO.alunos.forEach(function (aluno: Aluno) {
    if (aluno.matricula == matricula) {
      json = { aluno: aluno }
      status = true
    }
  })
  if (status) {
    return json
  } else {
    return status
  }

}

function getAlunosCurso(curso: string) {

  let json = {}
  let array: Array<Aluno> = []
  let status = false
  alunosDAO.alunos.forEach(function (aluno: Aluno) {
    let alunoCurso: Aluno
    if (aluno.curso[0].sigla == curso.toUpperCase()) {
      array.push(aluno)
      status = true
    }
  })
  json = { alunos: array }

  if (status) {
    return json
  } else {
    return status
  }
}

function getStatusAluno(statusDoAluno: string, jsonAlunos?: JSON) {

  let json = {}
  let array: Array<Aluno> = []
  let status = false

  if (jsonAlunos != undefined) {
    alunosDAO = jsonAlunos
  }

  let statusCase = statusDoAluno[0].toUpperCase() + statusDoAluno.substring(1).toLowerCase()

  alunosDAO.alunos.forEach(function (aluno: Aluno) {
    if (aluno.status == statusCase) {
      array.push(aluno)
      status = true
    }
  })
  json = { status: array }

  if (status) {
    return json
  } else {
    return status
  }
}

function getDataAlunos(dataConclusao: string, jsonAlunos?: JSON) {

  let json = {}
  let array: Array<Aluno> = []
  let status = false

  if (jsonAlunos != undefined) {
    alunosDAO = jsonAlunos
  }

  alunosDAO.alunos.forEach(function (aluno: Aluno) {
    if (dataConclusao == aluno.curso[0].conclusao) {
      array.push(aluno)
      status = true
    }
  })
  json = { alunos: array }
  if (status) {
    return json
  } else {
    status = true
    return json
  }
}

module.exports = {
  getCursos,
  getTodosAlunos,
  getAluno,
  getAlunosCurso,
  getStatusAluno,
  getDataAlunos,
  getCursoID
}