/**
 * Validação de CNPJ
 */

/**
 * Remove caracteres não numéricos do CNPJ
 */
export function limparCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, '');
}

/**
 * Formata CNPJ para exibição (00.000.000/0000-00)
 */
export function formatarCNPJ(cnpj: string): string {
  const limpo = limparCNPJ(cnpj);
  if (limpo.length !== 14) return cnpj;
  
  return limpo.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Valida formato e dígitos verificadores do CNPJ
 */
export function validarCNPJ(cnpj: string): boolean {
  const limpo = limparCNPJ(cnpj);

  // Verifica se tem 14 dígitos
  if (limpo.length !== 14) return false;

  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(limpo)) return false;

  // Validação do primeiro dígito verificador
  let tamanho = limpo.length - 2;
  let numeros = limpo.substring(0, tamanho);
  const digitos = limpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  // Validação do segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = limpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

/**
 * Consulta CNPJ na Receita Federal (API pública)
 */
export async function consultarCNPJReceitaFederal(cnpj: string): Promise<{
  valido: boolean;
  razaoSocial?: string;
  nomeFantasia?: string;
  situacao?: string;
  erro?: string;
}> {
  const limpo = limparCNPJ(cnpj);

  if (!validarCNPJ(limpo)) {
    return { valido: false, erro: 'CNPJ inválido' };
  }

  try {
    // API pública da Receita Federal (via BrasilAPI)
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${limpo}`);

    if (!response.ok) {
      if (response.status === 404) {
        return { valido: false, erro: 'CNPJ não encontrado na Receita Federal' };
      }
      throw new Error('Erro ao consultar CNPJ');
    }

    const data = await response.json();

    // Verificar se está ativo
    if (data.descricao_situacao_cadastral !== 'ATIVA') {
      return {
        valido: false,
        erro: `CNPJ com situação: ${data.descricao_situacao_cadastral}`,
      };
    }

    return {
      valido: true,
      razaoSocial: data.razao_social,
      nomeFantasia: data.nome_fantasia || data.razao_social,
      situacao: data.descricao_situacao_cadastral,
    };
  } catch (error) {
    console.error('Erro ao consultar CNPJ:', error);
    return {
      valido: false,
      erro: 'Erro ao consultar CNPJ. Tente novamente.',
    };
  }
}

/**
 * Valida se o usuário tem conta no Mercado Livre
 * (Requer que o usuário forneça seu User ID do ML)
 */
export async function validarContaMercadoLivre(userId: string): Promise<{
  valido: boolean;
  nickname?: string;
  erro?: string;
}> {
  if (!userId || userId.trim() === '') {
    return { valido: false, erro: 'User ID do Mercado Livre não fornecido' };
  }

  try {
    // API pública do Mercado Livre para consultar usuário
    const response = await fetch(`https://api.mercadolibre.com/users/${userId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return { valido: false, erro: 'Usuário não encontrado no Mercado Livre' };
      }
      throw new Error('Erro ao consultar Mercado Livre');
    }

    const data = await response.json();

    // Verificar se é vendedor
    if (!data.seller_reputation) {
      return {
        valido: false,
        erro: 'Esta conta não é de vendedor no Mercado Livre',
      };
    }

    return {
      valido: true,
      nickname: data.nickname,
    };
  } catch (error) {
    console.error('Erro ao validar Mercado Livre:', error);
    return {
      valido: false,
      erro: 'Erro ao validar conta do Mercado Livre. Tente novamente.',
    };
  }
}

/**
 * Valida token de API do Mercado Livre
 */
export async function validarTokenMercadoLivre(accessToken: string): Promise<{
  valido: boolean;
  userId?: string;
  erro?: string;
}> {
  if (!accessToken || accessToken.trim() === '') {
    return { valido: false, erro: 'Token de acesso não fornecido' };
  }

  try {
    // Consultar dados do usuário usando o token
    const response = await fetch('https://api.mercadolibre.com/users/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { valido: false, erro: 'Token de acesso inválido ou expirado' };
      }
      throw new Error('Erro ao validar token');
    }

    const data = await response.json();

    return {
      valido: true,
      userId: data.id.toString(),
    };
  } catch (error) {
    console.error('Erro ao validar token ML:', error);
    return {
      valido: false,
      erro: 'Erro ao validar token. Tente novamente.',
    };
  }
}
