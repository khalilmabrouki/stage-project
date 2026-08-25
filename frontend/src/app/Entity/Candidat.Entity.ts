// Entity/Candidat.Entity.ts
export class Candidat {

  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public mdp?: string,
    public telephone?: string,
    public cv?: string
  ) {}

}