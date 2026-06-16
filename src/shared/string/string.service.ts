export const stringParse = (parse: string): string => {
    const titulo = parse
        .replaceAll("/", "")
        .replace(/[\\:*?"<>|]/g, "");

    const partes = titulo.split("_");

    return partes.length >= 2
        ? `${partes[0]}_${partes[1]}`
        : titulo;
};