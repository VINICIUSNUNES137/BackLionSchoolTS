interface CursoGeral {
    nome: string,
    sigla: string,
    icone: string,
    carga: string
}


const cursos: Array<CursoGeral> = [
    {
        "nome": "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla": "DS",
        "icone": "https://raw.githubusercontent.com/VINICIUSNUNES137/lion-school_front/main/img/ds.svg",
        "carga": "1200",
    },
    {
        "nome": "002 - Técnico em Redes de Computadores",
        "sigla": "RDS",
        "icone": "https://raw.githubusercontent.com/VINICIUSNUNES137/lion-school_front/main/img/rds.svg",
        "carga": "1200"
    }
]

module.exports = {
    cursos
}