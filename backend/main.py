from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles

from database import engine, Base, get_db
from models import Chamado
from schemas import ChamadoCreate, ChamadoResponse

app = FastAPI(title="HelpDesk Pro")

# Criar tabelas
Base.metadata.create_all(bind=engine)


# Rota para cadastrar chamado
@app.post("/api/chamados", response_model=ChamadoResponse)
def criar_chamado(
    chamado: ChamadoCreate,
    db: Session = Depends(get_db)
):

    novo_chamado = Chamado(**chamado.model_dump())

    db.add(novo_chamado)

    db.commit()

    db.refresh(novo_chamado)

    return novo_chamado


# Rota para listar chamados
@app.get("/api/chamados", response_model=list[ChamadoResponse])
def listar_chamados(db: Session = Depends(get_db)):

    chamados = db.query(Chamado).all()

    return chamados


# Disponibilizar o front-end
app.mount(
    "/",
    StaticFiles(directory="../frontend", html=True),
    name="frontend"
)