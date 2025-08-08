window.addEventListener("DOMContentLoaded", () => {
  const tipoSelect = document.getElementById("tipo");
  const perdeu = document.getElementById("form-perdeu");
  const encontrou = document.getElementById("form-encontrou");
  const uploadSection = document.getElementById("upload-section");

  if (tipoSelect && perdeu && encontrou && uploadSection) {
    tipoSelect.addEventListener("change", () => {
      const tipo = tipoSelect.value;

      // Oculta tudo primeiro
      perdeu.style.display = "none";
      encontrou.style.display = "none";
      uploadSection.style.display = "none";

      // Exibe conforme a seleção
      if (tipo === "perdeu") {
        perdeu.style.display = "block";
        uploadSection.style.display = "flex";
      } else if (tipo === "encontrou") {
        encontrou.style.display = "block";
        uploadSection.style.display = "flex";
      }
    });
  }

  // Mostrar nome do arquivo
  const inputFoto = document.getElementById('foto');
  const nomeArquivoSpan = document.getElementById('nome-arquivo');

  if (inputFoto && nomeArquivoSpan) {
    inputFoto.addEventListener('change', () => {
      if (inputFoto.files.length > 0) {
        nomeArquivoSpan.textContent = inputFoto.files[0].name;
      } else {
        nomeArquivoSpan.textContent = 'Nenhum arquivo selecionado';
      }
    });
  }
});
