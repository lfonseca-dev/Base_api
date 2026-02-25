const validateSenha = (senha) => {
  if (!senha || senha.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  if (!/[A-Z]/.test(senha)) {
    return "A senha precisa ter pelo menos uma letra maiúscula.";
  }

  if (!/[a-z]/.test(senha)) {
    return "A senha precisa ter pelo menos uma letra minúscula.";
  }

  if (!/\d/.test(senha)) {
    return "A senha precisa ter pelo menos um número.";
  }

  if (!/[^A-Za-z\d]/.test(senha)) {
    return "A senha precisa ter pelo menos um caractere especial.";
  }
}

export default validateSenha;