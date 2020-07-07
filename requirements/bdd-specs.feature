Feature: Integração RPC (Grade de Programação)

    Como cliente quero poder visualizar a grade de programação da RPC

    Scenario: Obter dados da API "EPG"

    Dado que o cliente tem acesso a internet
    Quando o cliente solicita a programação do dia
    Entao o sistema deve exibir a programação do dia

    Scenario: Destacar Programação "NO AR"

    Dada a programação do dia recebida para o sistema
    Quando encontrado a programação que está "NO AR"
    Entao deve colocar uma flag de "no_ar" como true