// backendFake.js

const userData = [
    {
        "id": 1,
        "name": "João Silva",
        "age": 30,
        "dataHora": "2023-12-15T08:00:00",
        "prioridade": "alta",
        "ativo": true,
        "status": "pendente",
        "work": [
            {
                "occupation": "Revisar estatísticas",
                "wage": 2400
            }
        ],
        "finance": {
            "wage": 2400,
            "safe": 400,
            "free_money": 300,
            "monthly_expenses": 500,
            "investment_cash": [
                {
                    "id":2,
                    "name": "pc gamer",
                    "amount": 4000,
                    "total": 127
                },
                {
                    "id":3,
                    "name": "casa",
                    "amount": 100000,
                    "total": 20000
                }
            ]
        },
        "checklist": [
            {
                "title": "Revisar estatísticas",
                "description": "ir em tal lugar, fazer tal coisa",
                "local" : "rua tal, loja tal, numero tal",
                "dataHora": "2023-12-15T08:00:00",
                "status": 1
            },
            {
                "title": "Role não sei aonde",
                "description": "ir em tal lugar, fazer tal coisa",
                "local" : "rua tal, loja tal, numero tal",
                "dataHora": "2023-12-15T08:00:00",
                "status": 0
            },
            {
                "title": "Organizar a casa",
                "description": "ir em tal lugar, fazer tal coisa",
                "local" : "rua tal, loja tal, numero tal",
                "dataHora": "2023-12-15T08:00:00",
                "status": 1
            }
        ]
    }
]

export default userData;
