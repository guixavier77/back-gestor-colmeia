export interface ApicultorCreate {
    cpf: string
    name: string
}

export interface ApicultorUpdate extends ApicultorCreate {
    id: number;
}

