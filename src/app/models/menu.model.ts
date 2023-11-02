export class Menu {
    id_menu: number;
    testo: string;
    genitore: number;
    link: string;
    link_dev: string;
    ruolo:string;
    submenu?:Menu[];
}
