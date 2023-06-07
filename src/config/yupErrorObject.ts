import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'Campo obrigatório!',
  },
  string: {
    min: 'Deve conter no mínimo ${min} caracteres!',
    email: 'Preencha um e-mail válido!',
  },
});
