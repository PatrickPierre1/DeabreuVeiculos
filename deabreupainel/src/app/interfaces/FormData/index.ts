export interface FormData {
    name: string;
    brand_id: string;
    anoModelo: string;
    cor: string;
    portas: string;
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    label: string;
    tipo: string;
    images: File[]; // Agora estamos esperando um array de arquivos
    logo: File | null; // Adicionando logo
}