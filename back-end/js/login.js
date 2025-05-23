document.addEventListener('DOMContentLoaded', () => {
    const alternaCadastro = document.getElementById('alternaCadastro');
    const alternaLogin = document.getElementById('alternaLogin');
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');

    if (alternaCadastro && alternaLogin && form1 && form2) {
        alternaCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            form1.classList.add('hidden');
            form2.classList.remove('hidden');
        });

        alternaLogin.addEventListener('click', (e) => {
            e.preventDefault();
            form2.classList.add('hidden');
            form1.classList.remove('hidden');
        });
    } else {
        console.error('Elementos do formulário não foram encontrados.');
    }
});
