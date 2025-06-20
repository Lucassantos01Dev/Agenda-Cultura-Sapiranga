async function carregarEventosDaPlanilha() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vThJFYlU0KduwGTipk0Wk_CILMrQsziQXsznN6Fuk07cDV2lFpJ9LA1-0q3_OrV0QcjhreXNaXWROWN/pub?output=csv');
  const data = await response.text();

  const linhas = data.split("\n").slice(1);
  const eventosDiv = document.getElementById("eventos");
  eventosDiv.innerHTML = "";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  linhas.forEach(linha => {
    const colunas = linha.split(",");

    if (colunas.length >= 8) {
      const nomeEvento = colunas[1];
      const dataEventoStr = colunas[2];
      const horario = colunas[3];
      const local = colunas[4];
      const descricao = colunas[5];
      const contato = colunas[6];

      const partesData = dataEventoStr.split('/');
      let dataDoEvento = null;
      if (partesData.length === 3) {
        dataDoEvento = new Date(parseInt(partesData[2]), parseInt(partesData[1]) - 1, parseInt(partesData[0]));
      } else {
        dataDoEvento = new Date(dataEventoStr);
      }

      if (dataDoEvento && dataDoEvento.getTime() >= hoje.getTime()) {
        const el = document.createElement("div");
        el.className = "event";
        el.innerHTML = `
          <p><strong>Nome:</strong> ${nomeEvento}</p>
          <p><strong>Data:</strong> ${dataEventoStr}</p>
          <p><strong>Horário:</strong> ${horario}</p>
          <p><strong>Local:</strong> ${local}</p>
          <p><strong>Descrição:</strong> ${descricao}</p>
          <p><strong>Contato:</strong> ${contato}</p>
        `;

        eventosDiv.appendChild(el);
      }
    }
  });
}

carregarEventosDaPlanilha();