export interface Processo {
  Seq: string;
  Id: string;
}

export interface Table{
  headers: string[]
  data: Processo[]
}