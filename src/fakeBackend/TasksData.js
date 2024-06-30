// backendFake.js

const tasks = [
    {
      id: 1,
      titulo: "Completar relatório",
      descricao: "Escrever o relatório mensal para a equipe de desenvolvimento.",
      checklist: [
        { item: "Revisar estatísticas", feito: true },
        { item: "Adicionar gráficos", feito: false },
        { item: "Finalizar conclusões", feito: false }
      ],
      dataHora: "2023-12-15T08:00:00",
      prioridade: "alta",
      ativo: true,
      status: "pendente"
    },
    {
      id: 2,
      titulo: "Preparar apresentação",
      descricao: "Preparar slides para a apresentação de vendas.",
      checklist: [
        { item: "Criar slides introdutórios", feito: true },
        { item: "Adicionar estatísticas de vendas", feito: true },
        { item: "Revisar conteúdo", feito: false }
      ],
      dataHora: "2023-12-16T10:30:00",
      prioridade: "média",
      ativo: true,
      status: "em andamento"
    },
    {
      id: 3,
      titulo: "Reunião de equipe",
      descricao: "Organizar reunião para discutir metas do próximo trimestre.",
      checklist: [
        { item: "Enviar convite aos membros", feito: true },
        { item: "Preparar pauta da reunião", feito: true },
        { item: "Definir datas disponíveis", feito: true }
      ],
      dataHora: "2023-12-17T14:00:00",
      prioridade: "baixa",
      ativo: false,
      status: "concluído"
    }
  ];
  
  export default tasks;
  