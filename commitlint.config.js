module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Novas funcionalidades
        'fix',      // Correções de bugs
        'docs',     // Documentação
        'style',    // Alterações de estilo (espaços, formatação, etc)
        'refactor', // Refatoração de código
        'perf',     // Melhorias de performance
        'test',     // Adição ou correção de testes
        'build',    // Alterações no build
        'ci',       // Alterações na integração contínua
        'chore',    // Tarefas de manutenção
        'revert'    // Reverter commits
      ]
    ],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower'],
    'subject-case': [2, 'always', 'lower'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
}; 