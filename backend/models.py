from sqlalchemy import Column, Integer, String, Text
from database import Base


class Chamado(Base):

    __tablename__ = "chamados"

    id = Column(Integer, primary_key=True, index=True)

    titulo = Column(String(150), nullable=False)

    descricao = Column(Text, nullable=False)

    prioridade = Column(String(20), default="Normal")

    status = Column(String(30), default="Aberto")

    solicitante = Column(String(100), nullable=False)