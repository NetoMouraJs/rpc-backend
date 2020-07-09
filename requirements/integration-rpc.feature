Feature: Integração RPC (Grade de Programação)

    Como cliente quero poder visualizar a grade de programação da RPC

    Scenario: Obter dados da API "EPG"

    Given que o cliente tem acesso a internet
    When o cliente solicita a programação do dia
    Then o sistema deve exibir a programação do dia

    Scenario: Destacar Programação "NO AR"

    Given as programações do dia recebida para o sistemin
    When encontrado a programação que está "NO AR"
    Then deve colocar uma flag de "no_ar" como true