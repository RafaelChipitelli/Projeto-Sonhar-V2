// Área do Formulário ----------------------------------------------------------------

$(document).ready(function() {
    $('#telefone').mask('(00) 00000-0000');
    $('#CPF').mask('000.000.000-00');
    $('#CEP').mask('00000-000');

    $('form').validate({
        rules: {
            nome: {
                required: true
            },
            CPF: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true
            },
            endereço: {
                required: true
            },
            CEP: {
                required: true
            },
            motivacao: {
                required: true
            },
        },
        messages: {
            nome: 'Por favor, insira o seu Nome.',
            CPF: 'Por favor, insira o seu CPF',
            telefone: 'Por favor, insira o seu Telefone',
            email: 'Por favor, insira o seu E-mail',
            endereço: 'Por favor, insira o seu Endereço',
            CEP: 'Por favor, insira o seu CEP',
            motivacao: 'Queremos saber mais sobre você!',
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if ($('form').valid()) { // Verifica se o formulário é válido
            const nome = document.querySelector('input[name=nome]').value;
            const CPF = document.querySelector('input[name=CPF]').value;
            const telefone = document.querySelector('input[name=telefone]').value;
            const email = document.querySelector('input[name=email]').value;
            const endereço = document.querySelector('input[name=endereço]').value;
            const CEP = document.querySelector('input[name=CEP]').value;
            const motivacao = document.querySelector('textarea[name=motivacao]').value; // Corrigido para pegar o valor da textarea

            const dataHoraEnvio = new Date();
            const dataFormatada = `${dataHoraEnvio.getDate().toString().padStart(2, '0')}/${(dataHoraEnvio.getMonth() + 1).toString().padStart(2, '0')}/${dataHoraEnvio.getFullYear()}`;

            fetch('https://api.sheetmonkey.io/form/qSExyZ8Uk1mPPjNdyJEq3N', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, CPF, telefone, email, endereço, CEP, motivacao, dataEnvio: dataFormatada }),
            }).then(() => {
                document.getElementById('nome').value = '';
                document.getElementById('CPF').value = '';
                document.getElementById('telefone').value = '';
                document.getElementById('email').value = '';
                document.getElementById('endereço').value = '';
                document.getElementById('CEP').value = '';
                document.getElementById('motivacao').value = '';

                window.open('https://www.youtube.com/watch?v=jfKfPfyJRdk', '_blank');
            });
        }
    }

    document.querySelector('form').addEventListener('submit', handleSubmit);
});

// Área de Membros ----------------------------------------------------------------

const members = [
    {
        name: "Fulano da Silva",
        role: "Fundador",
        photo: "https://images.pexels.com/photos/6626882/pexels-photo-6626882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Ciclana Rodrigues",
        role: "Comunicação",
        photo: "https://images.pexels.com/photos/5615665/pexels-photo-5615665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Beltrano Oliveira",
        role: "Financeiro",
        photo: "https://images.pexels.com/photos/7654096/pexels-photo-7654096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    // Adicione mais membros aqui
];

// Função para criar a estrutura HTML de um membro
function createMemberHTML(member) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${member.photo}" class="rounded-circle mx-auto d-block" alt="${member.name}" />
                <div class="card-body">
                    <h5 class="card-title">${member.name}</h5>
                    <p class="card-text">${member.role}</p>
                </div>
            </div>
        </div>
    `;
}

// Função para adicionar membros ao DOM
function renderMembers() {
    const membersContainer = document.getElementById("membros-container");
    members.forEach((member) => {
        const memberHTML = createMemberHTML(member);
        membersContainer.innerHTML += memberHTML;
    });
}

// Chame a função para carregar os membros
renderMembers();
