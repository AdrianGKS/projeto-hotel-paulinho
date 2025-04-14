
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const msgDiv = document.getElementById("form-msg");
    const btn = document.getElementById("btn-submit");
    const btnText = btn.querySelector(".btn-text");
    const spinner = btn.querySelector(".spinner");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        msgDiv.innerHTML = "";
        msgDiv.className = "";

        const nome = form.querySelector('[name="nome"]');
        const email = form.querySelector('[name="email"]');
        const mensagem = form.querySelector('[name="mensagem"]');
        const tel = form.querySelector('[name="tel"]');
        const errors = [];

        if (!nome.value.trim()) errors.push("Informe seu nome.");
        if (!email.value.trim()) {
            errors.push("Informe seu e-mail.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            errors.push("Informe um e-mail válido.");
        }
        if (!mensagem.value.trim()) errors.push("Escreva sua mensagem.");

        if (errors.length > 0) {
            msgDiv.className = "error-msg";
            msgDiv.innerHTML = errors.map(e => `<p>• ${e}</p>`).join("");
            return;
        }

        // Spinner on
        btn.disabled = true;
        btnText.style.display = "none";
        spinner.style.display = "inline-block";

        // Enviar dados com fetch
        const formData = new FormData(form);
        const actionUrl = form.getAttribute("action");

        fetch(actionUrl, {
            method: "POST",
            body: formData
        })
            .then(res => res.text())
            .then(response => {
                if (response.toLowerCase().includes("sucesso") || response.toLowerCase().includes("enviado")) {
                    msgDiv.className = "success-msg";
                    msgDiv.innerHTML = "<p>Mensagem enviada com sucesso!</p>";
                    form.reset();
                } else {
                    msgDiv.className = "error-msg";
                    msgDiv.innerHTML = `<p>Ocorreu um erro ao enviar. Tente novamente.</p><p>${response}</p>`;
                }
            })
            .catch(err => {
                msgDiv.className = "error-msg";
                msgDiv.innerHTML = `<p>Erro ao conectar com o servidor. Verifique sua conexão ou tente mais tarde.</p>`;
            })
            .finally(() => {
                btn.disabled = false;
                btnText.style.display = "inline";
                spinner.style.display = "none";
            });
    });
});