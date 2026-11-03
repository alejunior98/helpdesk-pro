from pydantic import BaseModel, ConfigDict


class ChamadoCreate(BaseModel):

    titulo: str
    descricao: str
    prioridade: str
    solicitante: str


class ChamadoResponse(BaseModel):

    id: int
    titulo: str
    descricao: str
    prioridade: str
    status: str
    solicitante: str

    model_config = ConfigDict(from_attributes=True)