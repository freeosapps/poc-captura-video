class ArvoreDePalavras {
    quaisAsProximasLetras(prefixo) {
        let letras = new Set();
        $($('#wordlist')[0].import).find('body').text().match(new RegExp(prefixo + '.*\n', 'gi'))
        .forEach(palavra => {
            if (palavra.trim()) {
                letras.add(palavra.charAt(prefixo.length).toUpperCase());
            }
        });
        return [...letras];
    }
}